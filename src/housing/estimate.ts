import {
  type CarCharging,
  type CarType,
  type Domain,
  type ElectricityType,
  type GasItem,
  type HousingSize,
  type Month,
  type Type
} from 'common'
import { getBaselineAmount } from 'data'
import { type Item } from 'entity/item'
import {
  estimateElectricityAnnualAmount,
  estimateElectricityIntensity
} from './electricity'
import { estimateGasAnnualAmount } from './gas'
import { estimateHousingMaintenanceAnnualAmount } from './housing-maintenance'
import { estimateImputedRentAnnualAmount } from './imputed-rent'
import { estimateKeroseneAnnualAmount } from './kerosene'
import { estimateRentAnnualAmount } from './rent'

/** 居住に関するカーボンフットプリントを計算するための質問への回答 */
export interface HousingAnswer {
  /** 住居の広さ */
  readonly housingSize: HousingSize
  /** 住居者数 */
  readonly residentCount: number
  electricity?: {
    /** 電力の種類 */
    readonly electricityType: ElectricityType
    /** 1ヶ月の電力使用量[kWh] */
    monthlyConsumption: number
    /** 対象月 */
    month: Month
    /** 自家用車の情報。EV, PHVの場合の補正に使用 */
    privateCar?: {
      /** 車の種類 */
      carType: CarType
      /** 年間走行距離[km/年] */
      annualMileage: number
      /** 自宅充電の頻度 */
      carCharging: CarCharging
    }
  }
  /** ガスの使用量 */
  gas?: {
    /** ガスの種類 */
    item: GasItem
    /** 1ヶ月のガス使用量[m3] */
    monthlyConsumption: number
    /** 対象月 */
    month: Month
  }
  /** 灯油の使用量 */
  kerosene?: {
    /** 1ヶ月の灯油使用量[L] */
    monthlyConsumption: number
    /** 対象月数 */
    monthCount: number
  }
}

export const estimateHousing = ({
  housingSize,
  residentCount,
  electricity = undefined,
  gas = undefined,
  kerosene = undefined
}: HousingAnswer): Item[] => {
  const domain: Domain = 'housing'
  const estimations: Item[] = []

  // helper functions
  const addEstimation = (item: string, value: number, type: Type): void => {
    const baseline = getBaselineAmount(domain, item)
    estimations.push({
      domain,
      subdomain: baseline.subdomain,
      item,
      type,
      value,
      unit: baseline.unit
    })
  }

  const addEstimatedAmount = (item: string, value: number): void => {
    addEstimation(item, value, 'amount')
  }
  const addEstimatedIntensity = (item: string, value: number): void => {
    addEstimation(item, value, 'intensity')
  }

  // imputed-rent amount (intensity はベースライン値)
  addEstimatedAmount(
    'imputed-rent',
    estimateImputedRentAnnualAmount({ housingSize, residentCount })
  )

  // rent amount (intensity はベースライン値)
  addEstimatedAmount(
    'rent',
    estimateRentAnnualAmount({ housingSize, residentCount })
  )

  // housing-maintenance amount (intensity はベースライン値)
  addEstimatedAmount(
    'housing-maintenance',
    estimateHousingMaintenanceAnnualAmount({ housingSize, residentCount })
  )

  // gas amount (intensity はベースライン値)
  if (gas !== undefined) {
    addEstimatedAmount(
      'gas',
      estimateGasAnnualAmount(gas.item, {
        monthlyConsumption: gas.monthlyConsumption,
        month: gas.month,
        residentCount
      })
    )
  }

  // kerosene amount (intensity はベースライン値)
  if (kerosene !== undefined) {
    addEstimatedAmount(
      'kerosene',
      estimateKeroseneAnnualAmount({
        monthlyConsumption: kerosene.monthlyConsumption,
        monthCount: kerosene.monthCount,
        residentCount
      })
    )
  }

  // electricity
  if (electricity !== undefined) {
    addEstimatedAmount(
      'electricity',
      estimateElectricityAnnualAmount({
        monthlyConsumption: electricity.monthlyConsumption,
        month: electricity.month,
        residentCount,
        privateCar: electricity.privateCar
      })
    )
    addEstimatedIntensity(
      'electricity',
      estimateElectricityIntensity({
        electricityType: electricity.electricityType
      })
    )
  }

  // land-rent amount + intensity はベースライン値
  // other-energy amount + intensity はベースライン値
  // water amount + intensity はベースライン値

  return estimations
}
