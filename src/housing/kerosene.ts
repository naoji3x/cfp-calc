import { type LivingRegion } from 'common'
import { getBaselineIntensity, getParameter } from '../data/database'

/** 灯油の活動量を計算するための引数 */
export type KeroseneAmountPram =
  | {
      /** 1ヶ月の灯油使用量[L] */
      monthlyConsumption: number
      /** 対象月数 */
      monthCount: number
      /** 居住者数 */
      residentCount: number
    }
  | {
      /** お住まいの地域（地方） */
      livingRegion: LivingRegion
    }

/**
 * 灯油の年間の活動量を計算
 * @param param 灯油の活動量を計算するための引数
 * @returns 活動量[kWh]
 */
export const estimateKeroseneAnnualAmount = (
  param: KeroseneAmountPram
): number => {
  if ('livingRegion' in param) {
    return getParameter(
      'housing-amount-by-region',
      param.livingRegion + '_kerosene-amount'
    ).value
  } else {
    const keroseneFactor = getParameter(
      'energy-heat-intensity',
      'kerosene'
    ).value
    return (
      (param.monthlyConsumption * param.monthCount * keroseneFactor) /
      param.residentCount
    )
  }
}

/**
 * 灯油のGHG原単位を計算
 * @returns ベースライン値[kgCO2e/kWh]
 */
export const estimateKeroseneIntensity = (): number =>
  getBaselineIntensity('housing', 'kerosene').value
