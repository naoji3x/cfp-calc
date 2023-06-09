import { type CarType } from '../common/types'
import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'

/** 自家用車の購入時のGHG原単位を計算するための引数 */
export interface PrivateCarPurchaseIntensityParam {
  /** 車の種類 */
  carType: CarType
}

/** 自家用車の購入時の活動量を計算するための引数 */
export interface PrivateCarPurchaseAmountParam {
  /** 自家用車の運転距離[km] */
  mileage: number
}

/**
 * 自家用車の購入時の活動量を計算
 * @param 自家用車の購入時の活動量を計算するための引数
 * @returns 自家用車の購入時の活動量[台]
 */
export const estimatePrivateCarPurchaseAmount = ({
  mileage
}: PrivateCarPurchaseAmountParam): number => {
  const purchaseBaseline = getBaselineAmount(
    'mobility',
    'private-car-purchase'
  ).value
  const drivingBaseline = getBaselineAmount(
    'mobility',
    'private-car-driving'
  ).value
  return (purchaseBaseline * mileage) / drivingBaseline
}

/**
 * 自家用車の購入時のGHG原単位を計算
 * @param param 自家用車の購入時のGHG原単位を計算するための引数
 * @returns 自家用車の購入時のGHG原単位[kgCO2e/000JPY]
 */
export const estimatePrivateCarPurchaseIntensity = ({
  carType
}: PrivateCarPurchaseIntensityParam): number => {
  // ベースラインの運転時のGHG原単位を取得
  const baselineIntensity = getBaselineIntensity(
    'mobility',
    'private-car-purchase'
  ).value

  // 自動車種類に応じて運転時GHG原単位の補正係数を取得
  const ghgIntensityRatio = getParameter(
    'car-intensity-factor',
    carType + '_manufacturing-factor'
  ).value

  return baselineIntensity * ghgIntensityRatio
}
