import {
  type LeisureSportsExpenses,
  type LeisureSportsItem
} from '../common/types'
import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmount } from './amount-calculation'

/** レジャー・スポーツの活動量を計算するための引数 */
export interface LeisureSportsAmountParam {
  /** レジャー・スポーツに関わる支出 */
  leisureSportsExpenses: LeisureSportsExpenses
}

/**
 * レジャー・スポーツの年間の活動量を計算
 * @param item レジャー・スポーツのカーボンフットプリントアイテム名
 * @param param レジャー・スポーツの活動量を計算するための引数
 * @returns 活動量[000JPY]
 */
export const estimateLeisureSportsAnnualAmount = (
  item: LeisureSportsItem,
  { leisureSportsExpenses }: LeisureSportsAmountParam
): number =>
  estimateAnnualAmount(item, 'leisure-sports-factor', leisureSportsExpenses)

/**
 * レジャー・スポーツのGHG原単位を計算
 * @param item レジャー・スポーツのカーボンフットプリントアイテム名
 * @returns ベースライン値[kgCO2e/000JPY]
 */
export const estimateLeisureSportsIntensity = (
  item: LeisureSportsItem
): number => getBaselineIntensity('other', item).value
