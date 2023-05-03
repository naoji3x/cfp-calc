import { type HobbyGoodsExpenses, type HobbyGoodsItem } from '../common/types'
import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmount } from './amount-calculation'

/** 趣味・娯楽の活動量を計算するための引数 */
export interface HobbyGoodsAmountParam {
  /** 趣味・娯楽に関わる支出 */
  hobbyGoodsExpenses: HobbyGoodsExpenses
}

/**
 * 趣味・娯楽の年間の活動量を計算
 * @param item 趣味・娯楽のカーボンフットプリントアイテム名
 * @param param 趣味・娯楽の活動量を計算するための引数
 * @returns 活動量[000JPY]
 */
export const estimateHobbyGoodsAnnualAmount = (
  item: HobbyGoodsItem,
  { hobbyGoodsExpenses }: HobbyGoodsAmountParam
): number =>
  estimateAnnualAmount(item, 'hobby-goods-factor', hobbyGoodsExpenses)

/**
 * 趣味・娯楽のGHG原単位を計算
 * @param item 趣味・娯楽のカーボンフットプリントアイテム名
 * @returns ベースライン値[kgCO2e/000JPY]
 */
export const estimateHobbyGoodsIntensity = (item: HobbyGoodsItem): number =>
  getBaselineIntensity('other', item).value
