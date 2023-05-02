import { GAS_ITEMS, type Domain, type Type } from '../common'
import { getBaselineAmount } from '../data'
import { type Item } from '../entity/item'
import {
  estimateElectricityAnnualAmount,
  estimateElectricityIntensity
} from '../housing/electricity'
import { estimateGasAnnualAmount } from '../housing/gas'
import { estimateHousingMaintenanceAnnualAmount } from '../housing/housing-maintenance'
import { estimateImputedRentAnnualAmount } from '../housing/imputed-rent'
import { estimateKeroseneAnnualAmount } from '../housing/kerosene'
import { estimateRentAnnualAmount } from '../housing/rent'
import { type HousingAnswer } from './answer'

export const estimateHousing = ({
  housingSize = undefined,
  residentCount = undefined,
  electricity = undefined,
  gas = undefined,
  kerosene = undefined
}: HousingAnswer): Item[] => {
  const domain: Domain = 'housing'
  const estimations: Item[] = []

  if (housingSize === undefined || residentCount === undefined) {
    return estimations
  }

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
    GAS_ITEMS.forEach((item) => {
      addEstimatedAmount(
        item,
        gas.item === item
          ? estimateGasAnnualAmount(gas.item, {
              ...gas.consumptionOrLivingRegion,
              residentCount
            })
          : 0
      )
    })
  } else {
    GAS_ITEMS.forEach((item) => {
      addEstimatedAmount(item, 0)
    })
  }

  // kerosene amount (intensity はベースライン値)
  if (kerosene !== undefined) {
    addEstimatedAmount(
      'kerosene',
      estimateKeroseneAnnualAmount({ ...kerosene, residentCount })
    )
  } else {
    addEstimatedAmount('kerosene', 0)
  }

  // electricity
  if (electricity !== undefined) {
    addEstimatedAmount(
      'electricity',
      estimateElectricityAnnualAmount({
        ...electricity.consumptionOrLivingRegion,
        privateCar: electricity.privateCar,
        residentCount
      })
    )
    addEstimatedIntensity(
      'electricity',
      estimateElectricityIntensity({
        electricityType: electricity.electricityType
      })
    )
  } else {
    addEstimatedAmount('electricity', 0)
  }

  // land-rent amount + intensity はベースライン値
  // other-energy amount + intensity はベースライン値
  // water amount + intensity はベースライン値

  return estimations
}
