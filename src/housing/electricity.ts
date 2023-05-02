import {
  type CarCharging,
  type CarType,
  type ElectricityType,
  type LivingRegion,
  type Month
} from '../common/types'
import { getParameter } from '../data/database'

/** 自宅の電力のGHG原単位を計算するための引数 */
export interface ElectricityIntensityParam {
  /** 自宅での電力の種類 */
  readonly electricityType: ElectricityType
}

/** 自宅の電力の活動量を計算するための引数 */
export type ElectricityAmountParam =
  | {
      /** 1ヶ月の電力使用量[kWh] */
      readonly monthlyConsumption: number
      /** 対象月 */
      readonly month: Month
      /** 居住者数 */
      readonly residentCount: number
      /** 自家用車の情報。EV, PHVの場合の補正に使用 */
      readonly privateCar?: {
        /** 車の種類 */
        readonly carType: CarType
        /** 年間走行距離[km/年] */
        readonly annualMileage: number
        /** 自宅充電の頻度 */
        readonly carCharging?: CarCharging
      }
    }
  | {
      /** お住まいの地域（地方） */
      readonly livingRegion: LivingRegion
    }

/**
 * 自宅の電力の年間の活動量を計算
 * @param param 自宅の電力の活動量を計算するための引数
 * @returns 活動量[kWh]
 */
export const estimateElectricityAnnualAmount = (
  param: ElectricityAmountParam
): number => {
  if ('livingRegion' in param) {
    return getParameter(
      'housing-amount-by-region',
      param.livingRegion + '_electricity-amount'
    ).value
  }
  const electricitySeason = getParameter(
    'electricity-season-factor',
    param.month
  ).value

  // PHV, EVの場合は活動量がダブルカウントにならないように補正
  let mobilityElectricityAmount = 0
  if (param.privateCar !== undefined) {
    if (
      param.privateCar.carType === 'phv' ||
      param.privateCar.carType === 'ev'
    ) {
      const carCharging = param.privateCar.carCharging ?? 'unknown'
      const mobilityElectricity = getParameter(
        'car-intensity-factor',
        param.privateCar.carType + '_electricity-intensity'
      ).value
      const mobilityCharging = getParameter('car-charging', carCharging).value
      mobilityElectricityAmount =
        param.privateCar.annualMileage * mobilityElectricity * mobilityCharging
    }
  }

  const rate = electricitySeason / param.residentCount
  return param.monthlyConsumption * rate - mobilityElectricityAmount
}

/**
 * 自宅の電力のGHG原単位を計算
 * @param param 自宅の電力のGHG原単位を計算するための引数
 * @returns GHG原単位[kgCO2e/kWh]
 */
export const estimateElectricityIntensity = ({
  electricityType
}: ElectricityIntensityParam): number =>
  getParameter('electricity-intensity', electricityType).value
