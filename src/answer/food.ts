import {
  DAIRY_FOOD_ITEMS,
  EAT_OUT_ITEMS,
  FOOD_INTAKE_ITEMS,
  SOFT_DRINK_SNACK_ITEMS,
  type DishFrequency,
  type DishItem,
  type Domain,
  type Type
} from '../common'
import { getBaselineAmount } from '../data'
import { type Item } from '../entity/item'
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
import { type FoodAnswer } from './answer'

export const estimateFood = ({
  foodDirectWasteFrequency,
  foodLeftoverFrequency,
  foodIntake,
  alcoholFrequency,
  dairyFoodFrequency,
  beefDishFrequency,
  porkDishFrequency,
  chickenDishFrequency,
  seafoodDishFrequency,
  softDrinkSnackExpenses,
  eatOutExpenses = undefined
}: FoodAnswer): Item[] => {
  const domain: Domain = 'food'
  const estimations: Item[] = []

  if (
    foodDirectWasteFrequency === undefined ||
    foodLeftoverFrequency === undefined
  ) {
    return estimations
  }

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
      estimateDishAnnualAmount(dish.item, {
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

  // ready-meal amount and intensity
  if (foodIntake !== undefined) {
    addEstimatedAmount(
      'ready-meal',
      estimateReadyMealAnnualAmount({
        foodDirectWasteFrequency,
        foodLeftoverFrequency,
        foodIntake
      })
    )
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
