import { getBaselineAmount, getBaselineIntensity } from '../data/database'

/** 自家用車の維持の活動量を計算するための引数 */
export interface PrivateCarMaintenanceAmountParam {
  /** 自家用車の運転距離[km] */
  mileage: number
}

/**
 * 自家用車の維持の活動量を計算
 * @param param 自家用車の維持の活動量を計算するための引数
 * @returns 自家用車の維持の活動量[000JPY]
 */
export const estimatePrivateCarMaintenanceAmount = ({
  mileage
}: PrivateCarMaintenanceAmountParam): number => {
  const maintenanceBaseline = getBaselineAmount(
    'mobility',
    'private-car-maintenance'
  ).value
  const drivingBaseline = getBaselineAmount(
    'mobility',
    'private-car-driving'
  ).value
  return (maintenanceBaseline * mileage) / drivingBaseline
}

/**
 * 自家用車の維持のGHG原単位を計算
 * @returns ベースライン値を返す[kgCO2e/000JPY]
 */
export const estimatePrivateCarMaintenanceIntensity = (): number =>
  getBaselineIntensity('mobility', 'private-car-maintenance').value
