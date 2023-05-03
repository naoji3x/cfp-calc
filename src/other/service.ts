import { type ServiceExpenses, type ServiceItem } from '../common/types'
import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmount } from './amount-calculation'

/** サービスの活動量を計算するための引数 */
export interface ServiceAmountParam {
  /** サービスに関わる支出 */
  serviceExpenses: ServiceExpenses
}

/**
 * サービスの年間の活動量を計算
 * @param item サービスのカーボンフットプリントアイテム名
 * @param param サービスの活動量を計算するための引数
 * @returns 活動量[000JPY]
 */
export const estimateServiceAnnualAmount = (
  item: ServiceItem,
  { serviceExpenses }: ServiceAmountParam
): number => estimateAnnualAmount(item, 'service-factor', serviceExpenses)

/**
 * サービスのGHG原単位を計算
 * @param item サービスのカーボンフットプリントアイテム名
 * @returns ベースライン値[kgCO2e/000JPY]
 */
export const estimateServiceIntensity = (item: ServiceItem): number =>
  getBaselineIntensity('other', item).value
