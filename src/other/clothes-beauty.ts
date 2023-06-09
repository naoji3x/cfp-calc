import {
  type ClothesBeautyExpenses,
  type ClothesBeautyItem
} from '../common/types'
import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmount } from './amount-calculation'

/** 衣服・美容の活動量を計算するための引数 */
export interface ClothesBeautyAmountParam {
  clothesBeautyExpenses: ClothesBeautyExpenses
}

/**
 * 衣服・美容の年間の活動量を計算
 * @param item 衣服・美容のカーボンフットプリントアイテム名
 * @param param 衣服・美容の活動量を計算するための引数
 * @returns 活動量[000JPY]
 */
export const estimateClothesBeautyAnnualAmount = (
  item: ClothesBeautyItem,
  { clothesBeautyExpenses }: ClothesBeautyAmountParam
): number =>
  estimateAnnualAmount(item, 'clothes-beauty-factor', clothesBeautyExpenses)

/**
 * 衣服・美容のGHG原単位を計算
 * @param item 衣服・美容のカーボンフットプリントアイテム名
 * @returns ベースライン値[kgCO2e/000JPY]
 */
export const estimateClothesBeautyIntensity = (
  item: ClothesBeautyItem
): number => getBaselineIntensity('other', item).value
