import { type TravelExpenses, type TravelItem } from '../common/types'
import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmount } from './amount-calculation'

/** 旅行の活動量を計算するための引数 */
export interface TravelAmountParam {
  travelExpenses: TravelExpenses
}

/**
 * 旅行の年間の活動量を計算
 * @param item 旅行のカーボンフットプリントアイテム名
 * @param param 旅行の活動量を計算するための引数
 * @returns 活動量[000JPY]
 */
export const estimateTravelAnnualAmount = (
  item: TravelItem,
  { travelExpenses }: TravelAmountParam
): number => estimateAnnualAmount(item, 'travel-factor', travelExpenses)

/**
 * 旅行のGHG原単位を計算
 * @param item 旅行のカーボンフットプリントアイテム名
 * @returns ベースライン値[kgCO2e/000JPY]
 */
export const estimateTravelIntensity = (item: TravelItem): number =>
  getBaselineIntensity('other', item).value
