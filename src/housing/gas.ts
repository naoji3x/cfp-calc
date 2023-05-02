import { type GasItem, type LivingRegion, type Month } from '../common/types'
import { getBaselineIntensity, getParameter } from '../data/database'

/** 自宅のガスの活動量を計算するための引数 */
export type GasAmountPram =
  | {
      /** 1ヶ月のガス使用量[m3] */
      monthlyConsumption: number
      /** 対象月 */
      month: Month

      /** 居住者数 */
      residentCount: number
    }
  | {
      /** お住まいの地域（地方） */
      livingRegion: LivingRegion
    }

/**
 * 自宅のガスの年間の活動量を計算
 * @param item 自宅のガスの種類
 * @param param 自宅のガスの活動量を計算するための引数
 * @returns 活動量[kWh]
 */
export const estimateGasAnnualAmount = (
  item: GasItem,
  param: GasAmountPram
): number => {
  if ('livingRegion' in param) {
    return getParameter(
      'housing-amount-by-region',
      param.livingRegion + '_' + item + '-amount'
    ).value
  } else {
    const gasSeason = getParameter('gas-season-factor', param.month).value
    const gasFactor = getParameter('energy-heat-intensity', item).value
    const rate = (gasSeason * gasFactor) / param.residentCount
    return param.monthlyConsumption * rate
  }
}

/**
 * 自宅のガスのGHG原単位を計算
 * @param item 自宅のガスの種類
 * @returns ベースライン値[kgCO2e/kWh]
 */
export const estimateGasIntensity = (item: GasItem): number =>
  getBaselineIntensity('housing', item).value
