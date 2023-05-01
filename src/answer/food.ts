import {
  DAIRY_FOOD_ITEMS,
  EAT_OUT_ITEMS,
  FOOD_INTAKE_ITEMS,
  SOFT_DRINK_SNACK_ITEMS,
  type AlcoholFrequency,
  type DairyFoodFrequency,
  type DishFrequency,
  type DishItem,
  type Domain,
  type EatOutExpenses,
  type FoodDirectWasteFrequency,
  type FoodIntake,
  type FoodLeftoverFrequency,
  type SoftDrinkSnackExpenses,
  type Type
} from 'common'
import { getBaselineAmount } from 'data'
import { type Item } from 'entity/item'
import { estimateAlcoholAnnualAmount } from '../food/alcohol'
import { estimateDairyFoodAnnualAmount } from '../food/dairy-food'
import { estimateDishAnnualAmount } from '../food/dish'
import {
  estimateEatOutAnnualAmount,
  estimateEatOutIntensity
} from '../food/eat-out'
import { estimateFoodIntakeAnnualAmount } from '../food/food-intake'
import { estimateProcessedMeatAnnualAmount } from '../food/processed-meat'
import {
  estimateReadyMealAnnualAmount,
  estimateReadyMealIntensity
} from '../food/ready-meal'
import { estimateSoftDrinkSnackAnnualAmount } from '../food/soft-drink-snack'

export interface FoodParam {
  /** 食料の廃棄量 */
  readonly foodDirectWasteFrequency: FoodDirectWasteFrequency
  /** 食料の食べ残し量 */
  readonly foodLeftoverFrequency: FoodLeftoverFrequency
  /** 食料摂取量 */
  readonly foodIntake?: FoodIntake
  /** アルコールの摂取頻度 */
  readonly alcoholFrequency?: AlcoholFrequency
  /** 乳製品の摂取頻度 */
  readonly dairyFoodFrequency?: DairyFoodFrequency
  /** 牛肉料理の頻度 */
  readonly beefDishFrequency?: DishFrequency
  /** 豚肉料理の頻度 */
  readonly porkDishFrequency?: DishFrequency
  /** 鶏肉料理の頻度 */
  readonly chickenDishFrequency?: DishFrequency
  /** 魚介料理の頻度 */
  readonly seafoodDishFrequency?: DishFrequency
  /** ソフトドリンクとスナックの支出 */
  readonly softDrinkSnackExpenses?: SoftDrinkSnackExpenses
  /** 外食の支出 */
  readonly eatOutExpenses?: EatOutExpenses
}

export const estimateFood = ({
  foodDirectWasteFrequency,
  foodLeftoverFrequency,
  foodIntake = undefined,
  alcoholFrequency = undefined,
  dairyFoodFrequency = undefined,
  beefDishFrequency = undefined,
  porkDishFrequency = undefined,
  chickenDishFrequency = undefined,
  seafoodDishFrequency = undefined,
  softDrinkSnackExpenses = undefined,
  eatOutExpenses = undefined
}: FoodParam): Item[] => {
  const domain: Domain = 'food'
  const estimations: Item[] = []

  // helper functions
  const addEstimation = (item: string, value: number, type: Type): void => {
    const baseline = getBaselineAmount(domain, item)
    estimations.push({
      domain,
      subdomain: baseline.subdomain,
      item,
      type,
      value,
      unit: baseline.unit
    })
  }

  const addEstimatedAmount = (item: string, value: number): void => {
    addEstimation(item, value, 'amount')
  }
  const addEstimatedIntensity = (item: string, value: number): void => {
    addEstimation(item, value, 'intensity')
  }

  // food-intake amount (intensity はベースライン値)
  if (foodIntake !== undefined) {
    for (const item of FOOD_INTAKE_ITEMS) {
      addEstimatedAmount(
        item,
        estimateFoodIntakeAnnualAmount(item, {
          foodDirectWasteFrequency,
          foodLeftoverFrequency,
          foodIntake
        })
      )
    }
  }

  // dairy-food-intake amount (intensity はベースライン値)
  if (dairyFoodFrequency !== undefined) {
    for (const item of DAIRY_FOOD_ITEMS) {
      addEstimatedAmount(
        item,
        estimateDairyFoodAnnualAmount(item, {
          foodDirectWasteFrequency,
          foodLeftoverFrequency,
          dairyFoodFrequency
        })
      )
    }
  }

  // dish amount (intensity はベースライン値)
  const dishes: Array<{ item: DishItem; frequency: DishFrequency }> = []

  if (beefDishFrequency !== undefined) {
    dishes.push({ item: 'beef', frequency: beefDishFrequency })
  }
  if (porkDishFrequency !== undefined) {
    dishes.push({ item: 'pork', frequency: porkDishFrequency })
    dishes.push({ item: 'other-meat', frequency: porkDishFrequency })
  }
  if (chickenDishFrequency !== undefined) {
    dishes.push({ item: 'chicken', frequency: chickenDishFrequency })
  }
  if (seafoodDishFrequency !== undefined) {
    dishes.push({ item: 'fish', frequency: seafoodDishFrequency })
    dishes.push({ item: 'processed-fish', frequency: seafoodDishFrequency })
  }

  for (const dish of dishes) {
    addEstimatedAmount(
      dish.item,
      estimateDishAnnualAmount('beef', {
        foodDirectWasteFrequency,
        foodLeftoverFrequency,
        dishFrequency: dish.frequency
      })
    )
  }

  // alcohol amount (intensity はベースライン値)
  if (alcoholFrequency !== undefined) {
    addEstimatedAmount(
      'alcohol',
      estimateAlcoholAnnualAmount({
        foodDirectWasteFrequency,
        foodLeftoverFrequency,
        alcoholFrequency
      })
    )
  }

  // soft-drink-snack amount (intensity はベースライン値)
  if (softDrinkSnackExpenses !== undefined) {
    for (const item of SOFT_DRINK_SNACK_ITEMS) {
      addEstimatedAmount(
        item,
        estimateSoftDrinkSnackAnnualAmount(item, {
          foodDirectWasteFrequency,
          foodLeftoverFrequency,
          softDrinkSnackExpenses
        })
      )
    }
  }

  // eat-out amount
  if (eatOutExpenses !== undefined) {
    for (const item of EAT_OUT_ITEMS) {
      addEstimatedAmount(
        item,
        estimateEatOutAnnualAmount(item, {
          eatOutExpenses
        })
      )
    }
  }
  // eat-out intensity
  if (
    foodIntake !== undefined &&
    beefDishFrequency !== undefined &&
    porkDishFrequency !== undefined &&
    chickenDishFrequency !== undefined &&
    seafoodDishFrequency !== undefined &&
    dairyFoodFrequency !== undefined &&
    alcoholFrequency !== undefined &&
    softDrinkSnackExpenses !== undefined
  ) {
    for (const item of EAT_OUT_ITEMS) {
      addEstimatedIntensity(
        item,
        estimateEatOutIntensity(item, {
          foodDirectWasteFrequency,
          foodLeftoverFrequency,
          foodIntake,
          beefDishFrequency,
          porkDishFrequency,
          chickenDishFrequency,
          seafoodDishFrequency,
          dairyFoodFrequency,
          alcoholFrequency,
          softDrinkSnackExpenses
        })
      )
    }
  }

  // processed-meat amount (intensity はベースライン値)
  if (
    beefDishFrequency !== undefined &&
    porkDishFrequency !== undefined &&
    chickenDishFrequency !== undefined
  ) {
    addEstimatedAmount(
      'processed-meat',
      estimateProcessedMeatAnnualAmount({
        foodDirectWasteFrequency,
        foodLeftoverFrequency,
        beefDishFrequency,
        porkDishFrequency,
        chickenDishFrequency
      })
    )
  }

  // ready-meal amount
  if (foodIntake !== undefined) {
    addEstimatedAmount(
      'ready-meal',
      estimateReadyMealAnnualAmount({
        foodDirectWasteFrequency,
        foodLeftoverFrequency,
        foodIntake
      })
    )
  }

  // ready-meal intensity
  if (
    foodIntake !== undefined &&
    beefDishFrequency !== undefined &&
    porkDishFrequency !== undefined &&
    chickenDishFrequency !== undefined &&
    seafoodDishFrequency !== undefined &&
    dairyFoodFrequency !== undefined &&
    softDrinkSnackExpenses !== undefined
  ) {
    addEstimatedIntensity(
      'ready-meal',
      estimateReadyMealIntensity({
        foodDirectWasteFrequency,
        foodLeftoverFrequency,
        foodIntake,
        beefDishFrequency,
        porkDishFrequency,
        chickenDishFrequency,
        seafoodDishFrequency,
        dairyFoodFrequency,
        softDrinkSnackExpenses
      })
    )
  }

  return estimations
}
