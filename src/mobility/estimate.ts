import { type Domain, type OtherCarItem, type Type } from 'common'
import { getBaselineAmount } from 'data'
import { type MobilityAnswer } from 'entity/answer'
import { type Item } from '../entity/item'
import { estimateAirplaneAnnualAmount } from './airplane'
import { estimateBicycleDrivingAnnualAmount } from './bicycle-driving'
import { estimateBicycleMaintenanceAnnualAmount } from './bicycle-maintenance'
import { estimateBusAnnualAmount } from './bus'
import { estimateCarSharingDrivingIntensity } from './car-sharing-driving'
import { estimateCarSharingRentalIntensity } from './car-sharing-rental'
import { estimateFerryAnnualAmount } from './ferry'
import { estimateMotorbikeDrivingAnnualAmount } from './motorbike-driving'
import { estimateMotorbikeMaintenanceAnnualAmount } from './motorbike-maintenance'
import { estimateMotorbikePurchaseAnnualAmount } from './motorbike-purchase'
import { estimateOtherCarAnnualAmount } from './other-car'
import {
  estimatePrivateCarDrivingAmount,
  estimatePrivateCarDrivingIntensity
} from './private-car-driving'
import { estimatePrivateCarMaintenanceAmount } from './private-car-maintenance'
import {
  estimatePrivateCarPurchaseAmount,
  estimatePrivateCarPurchaseIntensity
} from './private-car-purchase'
import { estimateTaxiIntensity } from './taxi'
import { estimateTrainAnnualAmount } from './train'
import { estimateWalkingAnnualAmount } from './walking'

export const estimateMobility = ({
  privateCarAnnualMileage = undefined,
  carType = undefined,
  carPassengers = undefined,
  carCharging = undefined,
  electricityType = undefined,
  trainAmount,
  busAmount,
  motorbikeDrivingAmount,
  otherCarAmount,
  airplaneAmount,
  ferryAmount,
  bicycleDrivingAmount = undefined,
  walkingAmount = undefined
}: MobilityAnswer): Item[] => {
  const domain: Domain = 'mobility'
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

  // private car amount
  const mileage =
    privateCarAnnualMileage === undefined ? 0 : privateCarAnnualMileage

  addEstimatedAmount(
    'private-car-driving',
    estimatePrivateCarDrivingAmount({ mileage })
  )
  addEstimatedAmount(
    'private-car-purchase',
    estimatePrivateCarPurchaseAmount({
      annualMileage: mileage
    })
  )
  addEstimatedAmount(
    'private-car-maintenance',
    estimatePrivateCarMaintenanceAmount({
      annualMileage: mileage
    })
  )

  // private car intensity
  if (privateCarAnnualMileage !== undefined) {
    addEstimatedIntensity(
      'private-car-driving',
      estimatePrivateCarDrivingIntensity({
        carType: carType ?? 'unknown',
        carPassengers: carPassengers ?? 'unknown',
        carCharging,
        electricityType
      })
    )
    addEstimatedIntensity(
      'private-car-purchase',
      estimatePrivateCarPurchaseIntensity({
        carType: carType ?? 'unknown'
      })
    )
    // 'private-car-maintenance'はベースライン値
  }

  // train amount (intensity はベースライン値)
  addEstimatedAmount('train', estimateTrainAnnualAmount(trainAmount))

  // bus amount (intensity はベースライン値)
  addEstimatedAmount('bus', estimateBusAnnualAmount(busAmount))

  // motorbike amount (intensity はベースライン値)
  addEstimatedAmount(
    'motorbike-driving',
    estimateMotorbikeDrivingAnnualAmount(motorbikeDrivingAmount)
  )
  addEstimatedAmount(
    'motorbike-purchase',
    estimateMotorbikePurchaseAnnualAmount(motorbikeDrivingAmount)
  )
  addEstimatedAmount(
    'motorbike-maintenance',
    estimateMotorbikeMaintenanceAnnualAmount(motorbikeDrivingAmount)
  )

  // airplane amount (intensity はベースライン値)
  addEstimatedAmount('airplane', estimateAirplaneAnnualAmount(airplaneAmount))

  // ferry amount (intensity はベースライン値)
  addEstimatedAmount('ferry', estimateFerryAnnualAmount(ferryAmount))

  // bicycle amount (intensity はベースライン値)
  if (bicycleDrivingAmount !== undefined) {
    addEstimatedAmount(
      'bicycle-driving',
      estimateBicycleDrivingAnnualAmount(bicycleDrivingAmount)
    )
    addEstimatedAmount(
      'bicycle-maintenance',
      estimateBicycleMaintenanceAnnualAmount(bicycleDrivingAmount)
    )
  }

  // walking amount (intensity はベースライン値)
  if (walkingAmount !== undefined) {
    addEstimatedAmount('walking', estimateWalkingAnnualAmount(walkingAmount))
  }

  // other car amount
  const otherCarItems: OtherCarItem[] = [
    'taxi',
    'car-sharing-driving',
    'car-sharing-rental'
  ]
  for (const item of otherCarItems) {
    addEstimatedAmount(item, estimateOtherCarAnnualAmount(item, otherCarAmount))
  }

  // taxi intensity
  if (carPassengers !== undefined) {
    addEstimatedIntensity('taxi', estimateTaxiIntensity({ carPassengers }))
  }

  // car-sharing driving intensity
  if (carPassengers !== undefined && carType !== undefined) {
    addEstimatedIntensity(
      'car-sharing-driving',
      estimateCarSharingDrivingIntensity({
        carType,
        carPassengers,
        carCharging,
        electricityType
      })
    )
  }

  // car-sharing rental intensity
  if (carType !== undefined) {
    addEstimatedIntensity(
      'car-sharing-rental',
      estimateCarSharingRentalIntensity({ carType })
    )
  }

  return estimations
}
