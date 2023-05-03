import {
  absoluteTarget,
  increaseRate,
  proportionalToOtherFootprints,
  shiftFromOtherItems
} from '../../src/action'
import {
  type AlcoholFrequency,
  type DairyFoodFrequency,
  type DishFrequency,
  type Domain,
  type FoodDirectWasteFrequency,
  type FoodIntake,
  type FoodIntakeItem,
  type FoodLeftoverFrequency,
  type SoftDrinkSnackExpenses,
  type Type
} from '../../src/common'
import {
  estimateDairyFoodAnnualAmounts,
  estimateDairyFoodIntensities
} from '../../src/food/dairy-food'
import {
  estimateDishAnnualAmounts,
  estimateDishIntensities
} from '../../src/food/dish'
import { estimateEatOutIntensity } from '../../src/food/eat-out'
import {
  estimateFoodIntakeAnnualAmount,
  estimateFoodIntakeIntensity
} from '../../src/food/food-intake'
import {
  estimateProcessedMeatAnnualAmount,
  estimateProcessedMeatIntensity
} from '../../src/food/processed-meat'
import { estimateReadyMealIntensity } from '../../src/food/ready-meal'
import { Result } from './util'

// test vegan01 case
describe('vegan01', () => {
  const foodIntake: FoodIntake = 'very-much'
  const foodDirectWaste: FoodDirectWasteFrequency = '8-more-per-week'
  const foodLeftover: FoodLeftoverFrequency = '8-more-per-week'
  const beefDishFrequency: DishFrequency = '2-3-per-month'
  const porkDishFrequency: DishFrequency = '2-3-per-month'
  const chickenDishFrequency: DishFrequency = '2-3-per-month'
  const seafoodDishFrequency: DishFrequency = '2-3-per-month'
  const dairyFoodFrequency: DairyFoodFrequency = '1-2-less-per-week'
  const alcoholFrequency: AlcoholFrequency = '2-3-less-per-month'
  const softDrinkSnackExpenses: SoftDrinkSnackExpenses = '15k-more'

  const result = new Result()

  const foodIntakeItems: FoodIntakeItem[] = [
    'rice',
    'bread-flour',
    'noodle',
    'potatoes',
    'vegetables',
    'processed-vegetables',
    'beans',
    'fruits',
    'oil',
    'seasoning'
  ]

  // add items
  for (const item of foodIntakeItems) {
    result.addItem(
      'food',
      item,
      'amount',
      estimateFoodIntakeAnnualAmount(item, {
        foodIntake,
        foodDirectWasteFrequency: foodDirectWaste,
        foodLeftoverFrequency: foodLeftover
      })
    )
    result.addItem('food', item, 'intensity', estimateFoodIntakeIntensity(item))
  }

  // beef, pork, chicken, other-meat, fish, processed-fish
  const dishAmounts = estimateDishAnnualAmounts({
    foodDirectWaste,
    foodLeftover,
    beefDishFrequency,
    porkDishFrequency,
    chickenDishFrequency,
    seafoodDishFrequency
  })
  for (const item in dishAmounts) {
    result.addItem('food', item, 'amount', dishAmounts[item])
  }

  const dishIntensities = estimateDishIntensities()
  for (const item in dishIntensities) {
    result.addItem('food', item, 'intensity', dishIntensities[item])
  }

  // milk, other-dairy, eggs
  const dairyFoodAmounts = estimateDairyFoodAnnualAmounts({
    foodDirectWasteFrequency: foodDirectWaste,
    foodLeftoverFrequency: foodLeftover,
    dairyFoodFrequency
  })
  for (const item in dairyFoodAmounts) {
    result.addItem('food', item, 'amount', dairyFoodAmounts[item])
  }

  const dairyFoodIntensities = estimateDairyFoodIntensities()
  for (const item in dairyFoodIntensities) {
    result.addItem('food', item, 'intensity', dairyFoodIntensities[item])
  }

  // processed-meat
  result.addItem(
    'food',
    'processed-meat',
    'amount',
    estimateProcessedMeatAnnualAmount({
      foodDirectWasteFrequency: foodDirectWaste,
      foodLeftoverFrequency: foodLeftover,
      beefDishFrequency,
      porkDishFrequency,
      chickenDishFrequency
    })
  )
  result.addItem(
    'food',
    'processed-meat',
    'intensity',
    estimateProcessedMeatIntensity()
  )

  // ready-meal
  result.addItem(
    'food',
    'ready-meal',
    'intensity',
    estimateReadyMealIntensity({
      foodDirectWasteFrequency: foodDirectWaste,
      foodLeftoverFrequency: foodLeftover,
      foodIntake,
      beefDishFrequency,
      porkDishFrequency,
      chickenDishFrequency,
      seafoodDishFrequency,
      dairyFoodFrequency,
      softDrinkSnackExpenses
    })
  )

  // restaurant
  result.addItem(
    'food',
    'restaurant',
    'intensity',
    estimateEatOutIntensity('restaurant', {
      foodDirectWasteFrequency: foodDirectWaste,
      foodLeftoverFrequency: foodLeftover,
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

  // bar-cafe
  result.addItem(
    'food',
    'bar-cafe',
    'intensity',
    estimateEatOutIntensity('bar-cafe', {
      foodDirectWasteFrequency: foodDirectWaste,
      foodLeftoverFrequency: foodLeftover,
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

  const addIncreaseRateAction = (
    domain: Domain,
    item: string,
    type: Type,
    rate: number
  ): void => {
    result.addAction(
      'vegan',
      domain,
      item,
      type,
      increaseRate(result.findEstimationOrDefault(domain, item, type), rate)
    )
  }

  const addAbsoluteTargetAction = (
    domain: Domain,
    item: string,
    type: Type,
    target: number
  ): void => {
    result.addAction('vegan', domain, item, type, absoluteTarget(target))
  }

  addIncreaseRateAction('food', 'rice', 'amount', -0.181818182)
  addIncreaseRateAction('food', 'bread-flour', 'amount', -0.181818182)
  addIncreaseRateAction('food', 'noodle', 'amount', -0.181818182)
  addIncreaseRateAction('food', 'potatoes', 'amount', 0.363636364)
  addIncreaseRateAction('food', 'vegetables', 'amount', 0.363636364)
  addIncreaseRateAction('food', 'processed-vegetables', 'amount', 0.363636364)

  addAbsoluteTargetAction('food', 'milk', 'amount', 0)
  addAbsoluteTargetAction('food', 'other-dairy', 'amount', 0)
  addAbsoluteTargetAction('food', 'eggs', 'amount', 0)
  addAbsoluteTargetAction('food', 'beef', 'amount', 0)
  addAbsoluteTargetAction('food', 'pork', 'amount', 0)
  addAbsoluteTargetAction('food', 'chicken', 'amount', 0)
  addAbsoluteTargetAction('food', 'other-meat', 'amount', 0)
  addAbsoluteTargetAction('food', 'processed-meat', 'amount', 0)
  addAbsoluteTargetAction('food', 'fish', 'amount', 0)
  addAbsoluteTargetAction('food', 'processed-fish', 'amount', 0)

  result.addAction(
    'vegan',
    'food',
    'beans',
    'amount',
    shiftFromOtherItems(
      result.findEstimationOrDefault('food', 'beans', 'amount'),
      'vegan',
      [
        'food_milk_amount',
        'food_other-dairy_amount',
        'food_eggs_amount',
        'food_beef_amount',
        'food_pork_amount',
        'food_chicken_amount',
        'food_other-meat_amount',
        'food_processed-meat_amount',
        'food_fish_amount',
        'food_processed-fish_amount'
      ],
      1,
      result.findEstimationOrDefault,
      result.findActionOrDefault
    )
  )

  test('food_beans_amount', () => {
    expect(
      result.findActionOrDefault('vegan', 'food', 'beans', 'amount')
    ).toBeCloseTo(64.9510941476434)
  })

  const domainItems = [
    'food_rice',
    'food_bread-flour',
    'food_noodle',
    'food_potatoes',
    'food_vegetables',
    'food_processed-vegetables',
    'food_beans',
    'food_milk',
    'food_other-dairy',
    'food_eggs',
    'food_beef',
    'food_pork',
    'food_chicken',
    'food_other-meat',
    'food_processed-meat',
    'food_fish',
    'food_processed-fish',
    'food_fruits',
    'food_oil',
    'food_seasoning'
  ]

  // test food_ready-meal_intensity
  test('food_ready-meal_intensity', () => {
    expect(
      proportionalToOtherFootprints(
        result.findEstimationOrDefault('food', 'ready-meal', 'intensity'),
        'vegan',
        domainItems,
        1,
        result.findEstimationOrDefault,
        result.findActionOrDefault
      )
    ).toBeCloseTo(3.58274908840034)
  })

  // test food_restaurant_intensity
  test('food_restaurant_intensity', () => {
    expect(
      proportionalToOtherFootprints(
        result.findEstimationOrDefault('food', 'restaurant', 'intensity'),
        'vegan',
        domainItems,
        0.7157,
        result.findEstimationOrDefault,
        result.findActionOrDefault
      )
    ).toBeCloseTo(2.24004125926062)
  })

  // test food_bar-cafe_intensity
  test('food_bar-cafe_intensity', () => {
    expect(
      proportionalToOtherFootprints(
        result.findEstimationOrDefault('food', 'bar-cafe', 'intensity'),
        'vegan',
        domainItems,
        0.7157,
        result.findEstimationOrDefault,
        result.findActionOrDefault
      )
    ).toBeCloseTo(2.25462895912396)
  })
})
