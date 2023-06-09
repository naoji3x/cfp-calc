import {
  DISH_ITEMS,
  type DishFrequency,
  type DishItem,
  type FoodDirectWasteFrequency,
  type FoodLeftoverFrequency
} from '../common/types'
import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'
import { estimateFoodLossRate } from './rate-calculation'

const getFactor = (item: DishItem): string => {
  switch (item) {
    case 'other-meat':
      return 'dish-pork-factor'
    case 'fish':
      return 'dish-seafood-factor'
    case 'processed-fish':
      return 'dish-seafood-factor'
    default:
      return 'dish-' + item + '-factor'
  }
}

/** 料理の活動量を計算するための引数 */
export interface DishAmountParam {
  /** 食料の廃棄量 */
  foodDirectWasteFrequency: FoodDirectWasteFrequency
  /** 食料の食べ残し量 */
  foodLeftoverFrequency: FoodLeftoverFrequency
  /** 料理の摂取頻度 */
  dishFrequency: DishFrequency
}

/** 料理の活動量を計算するための引数 */
export interface AllDishAmountParam {
  /** 食料の廃棄量 */
  foodDirectWaste: FoodDirectWasteFrequency
  /** 食料の食べ残し量 */
  foodLeftover: FoodLeftoverFrequency
  /** 牛肉料理の摂取頻度 */
  beefDishFrequency?: DishFrequency
  /** 豚肉料理の摂取頻度 */
  porkDishFrequency?: DishFrequency
  /** 鶏肉料理の摂取頻度 */
  chickenDishFrequency?: DishFrequency
  /** 魚介類料理の摂取頻度 */
  seafoodDishFrequency?: DishFrequency
}

/**
 * 料理の活動量を計算する
 * @param item 料理の種類
 * @param param 料理の活動量を計算するための引数
 * @returns 料理の活動量[kg]
 */
export const estimateDishAnnualAmount = (
  item: DishItem,
  {
    foodDirectWasteFrequency: foodDirectWaste,
    foodLeftoverFrequency: foodLeftover,
    dishFrequency: frequency
  }: DishAmountParam
): number => {
  const baseline = getBaselineAmount('food', item).value
  const dishFactor = getParameter(getFactor(item), frequency).value
  return (
    baseline * dishFactor * estimateFoodLossRate(foodDirectWaste, foodLeftover)
  )
}

const getDishItems = (
  items: DishItem[],
  beefDishFrequency?: DishFrequency,
  porkDishFrequency?: DishFrequency,
  chickenDishFrequency?: DishFrequency,
  seafoodDishFrequency?: DishFrequency
): Array<{ item: DishItem; frequency: DishFrequency }> => {
  const dishItems: Array<{ item: DishItem; frequency: DishFrequency }> = []

  if (
    items.find((item) => item === 'beef') !== undefined &&
    beefDishFrequency !== undefined
  ) {
    dishItems.push({ item: 'beef', frequency: beefDishFrequency })
  }
  if (
    items.find((item) => item === 'pork') !== undefined &&
    porkDishFrequency !== undefined
  ) {
    dishItems.push({ item: 'pork', frequency: porkDishFrequency })
  }
  if (
    items.find((item) => item === 'chicken') !== undefined &&
    chickenDishFrequency !== undefined
  ) {
    dishItems.push({ item: 'chicken', frequency: chickenDishFrequency })
  }
  if (
    items.find((item) => item === 'other-meat') !== undefined &&
    porkDishFrequency !== undefined
  ) {
    dishItems.push({ item: 'other-meat', frequency: porkDishFrequency })
  }
  if (
    items.find((item) => item === 'fish') !== undefined &&
    seafoodDishFrequency !== undefined
  ) {
    dishItems.push({ item: 'fish', frequency: seafoodDishFrequency })
  }
  if (
    items.find((item) => item === 'processed-fish') !== undefined &&
    seafoodDishFrequency !== undefined
  ) {
    dishItems.push({ item: 'processed-fish', frequency: seafoodDishFrequency })
  }
  return dishItems
}

/**
 * 料理の活動量を計算する
 * @param param 料理の活動量を計算するための引数
 * @param items 料理の種類
 * @returns 料理の活動量のMap
 */
export const estimateDishAnnualAmounts = (
  {
    foodDirectWaste,
    foodLeftover,
    beefDishFrequency,
    porkDishFrequency,
    chickenDishFrequency,
    seafoodDishFrequency
  }: AllDishAmountParam,
  items: DishItem[] = DISH_ITEMS.map((item) => item)
): Record<string, number> => {
  const dishItems = getDishItems(
    items,
    beefDishFrequency,
    porkDishFrequency,
    chickenDishFrequency,
    seafoodDishFrequency
  )

  return dishItems.reduce(
    (acc, pair): Record<string, number> => ({
      ...acc,
      [pair.item]: estimateDishAnnualAmount(pair.item, {
        foodDirectWasteFrequency: foodDirectWaste,
        foodLeftoverFrequency: foodLeftover,
        dishFrequency: pair.frequency
      })
    }),
    {}
  )
}

/**
 * 料理のGHG原単位を計算する
 * @param items 料理の種類
 * @returns  料理のGHG原単位のMap
 */
export const estimateDishIntensities = (
  items?: DishItem[]
): Record<string, number> => {
  if (items === undefined) {
    items = DISH_ITEMS.map((item) => item)
  }

  return items.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: estimateDishIntensity(item)
    }),
    {}
  )
}

/**
 * 料理の活動量のベースライン値を取得する
 * @returns 料理の活動量のベースライン値のMap
 */
export const getDishAnnualBaselineAmounts = (): Record<string, number> =>
  DISH_ITEMS.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: getBaselineAmount('food', item).value
    }),
    {}
  )

/**
 * 料理のGHG原単位を計算する
 * @param item 料理の種類
 * @returns ベースライン値[kgCO2e/kg]
 */
export const estimateDishIntensity = (item: DishItem): number =>
  getBaselineIntensity('food', item).value
