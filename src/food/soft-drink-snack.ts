import {
  SOFT_DRINK_SNACK_ITEMS,
  type FoodDirectWasteFrequency,
  type FoodLeftoverFrequency,
  type SoftDrinkSnackExpenses,
  type SoftDrinkSnackItem
} from '../common/types'
import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'
import { estimateFoodLossRate } from './rate-calculation'

/** ソフトドリンク・スナックの活動量を計算するための引数 */
export interface SoftDrinkSnackAmountParam {
  /** 食料の廃棄量 */
  foodDirectWasteFrequency: FoodDirectWasteFrequency
  /** 食料の食べ残し量 */
  foodLeftoverFrequency: FoodLeftoverFrequency
  /** ソフトドリンク・スナックの支出 */
  softDrinkSnackExpenses: SoftDrinkSnackExpenses
}

/**
 * ソフトドリンク・スナックの活動量を計算する
 * @param item ソフトドリンク・スナックの種類
 * @param param ソフトドリンク・スナックの活動量を計算するための引数
 * @returns ソフトドリンク・スナックの活動量[kg]
 */
export const estimateSoftDrinkSnackAnnualAmount = (
  item: SoftDrinkSnackItem,
  {
    foodDirectWasteFrequency: foodDirectWaste,
    foodLeftoverFrequency: foodLeftover,
    softDrinkSnackExpenses: expenses
  }: SoftDrinkSnackAmountParam
): number => {
  const baseline = getBaselineAmount('food', item).value
  const dishFactor = getParameter('soft-drink-snack-factor', expenses).value
  return (
    baseline * dishFactor * estimateFoodLossRate(foodDirectWaste, foodLeftover)
  )
}

/**
 * ソフトドリンク・スナックの活動量を計算する
 * @param param ソフトドリンク・スナックの活動量を計算するための引数
 * @param items ソフトドリンク・スナックの種類の配列
 * @returns ソフトドリンク・スナックの活動量のMap
 */
export const estimateSoftDrinkSnackAnnualAmounts = (
  {
    foodDirectWasteFrequency: foodDirectWaste,
    foodLeftoverFrequency: foodLeftover,
    softDrinkSnackExpenses: expenses
  }: SoftDrinkSnackAmountParam,
  items?: SoftDrinkSnackItem[]
): Record<string, number> => {
  if (items === undefined) {
    items = SOFT_DRINK_SNACK_ITEMS.map((item) => item)
  }

  return items.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: estimateSoftDrinkSnackAnnualAmount(item, {
        foodDirectWasteFrequency: foodDirectWaste,
        foodLeftoverFrequency: foodLeftover,
        softDrinkSnackExpenses: expenses
      })
    }),
    {}
  )
}

/**
 * ソフトドリンク・スナックのGHG原単位を計算する
 * @param items ソフトドリンク・スナックの種類の配列
 * @returns ソフトドリンク・スナックのGHG原単位のMap
 */
export const estimateSoftDrinkSnackIntensities = (
  items?: SoftDrinkSnackItem[]
): Record<string, number> => {
  if (items === undefined) {
    items = SOFT_DRINK_SNACK_ITEMS.map((item) => item)
  }

  return items.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: estimateSoftDrinkSnackIntensity(item)
    }),
    {}
  )
}

/**
 * ソフトドリンク・スナックの活動量を計算する
 * @returns ソフトドリンク・スナックの活動量のMap
 */
export const getSoftDrinkSnackAnnualBaselineAmounts = (): Record<
  string,
  number
> =>
  SOFT_DRINK_SNACK_ITEMS.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: getBaselineAmount('food', item).value
    }),
    {}
  )

/**
 * ソフトドリンク・スナックのGHG原単位を計算する
 * @param item ソフトドリンク・スナックの種類
 * @returns ベースライン値[kgCO2e/kg]
 */
export const estimateSoftDrinkSnackIntensity = (
  item: SoftDrinkSnackItem
): number => getBaselineIntensity('food', item).value
