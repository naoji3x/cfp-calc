import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountByArea } from './amount-calculation'
import { type ResidentialAreaSizeParam } from './param'

/** 維持の活動量を計算するための引数 */
export type BicycleMaintenanceAmountParam = ResidentialAreaSizeParam

/**
 * 自転車の維持の活動量を計算
 * @param param 維持の活動量を計算するための引数
 * @returns 維持費[000JPY]
 */
export const estimateBicycleMaintenanceAnnualAmount = ({
  residentialAreaSize
}: BicycleMaintenanceAmountParam): number =>
  estimateAnnualAmountByArea('bicycle-maintenance', residentialAreaSize)

/**
 * 自転車の維持のGHG原単位を計算
 * @returns ベースライン値[kgCO2e/000JPY]
 */
export const estimateBicycleMaintenanceIntensity = (): number =>
  getBaselineIntensity('mobility', 'bicycle-maintenance').value
