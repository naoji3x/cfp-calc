import { getBaselineAmount, getBaselineIntensity } from '../data/database'

/**
 * その他のエネルギーの活動量を計算
 * @returns ベースライン値[kWh]
 */
export const estimateOtherEnergyAnnualAmount = (): number =>
  getBaselineAmount('housing', 'other-energy').value

/**
 * その他のエネルギーのGHG原単位を計算
 * @returns ベースライン値[kgCO2e/kWh]
 */
export const estimateOtherEnergyIntensity = (): number =>
  getBaselineIntensity('housing', 'other-energy').value
