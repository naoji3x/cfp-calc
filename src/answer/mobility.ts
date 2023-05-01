import {
  type CarCharging,
  type CarPassengers,
  type CarType,
  type Domain,
  type ElectricityType,
  type OtherCarItem,
  type ResidentialAreaSize,
  type Type
} from 'common'

import { getBaselineAmount } from 'data'
import { type Item } from '../entity/item'
import { estimateAirplaneAnnualAmount } from '../mobility/airplane'
import { estimateBicycleDrivingAnnualAmount } from '../mobility/bicycle-driving'
import { estimateBicycleMaintenanceAnnualAmount } from '../mobility/bicycle-maintenance'
import { estimateBusAnnualAmount } from '../mobility/bus'
import { estimateCarSharingDrivingIntensity } from '../mobility/car-sharing-driving'
import { estimateCarSharingRentalIntensity } from '../mobility/car-sharing-rental'
import { estimateFerryAnnualAmount } from '../mobility/ferry'
import { estimateMotorbikeDrivingAnnualAmount } from '../mobility/motorbike-driving'
import { estimateMotorbikeMaintenanceAnnualAmount } from '../mobility/motorbike-maintenance'
import { estimateMotorbikePurchaseAnnualAmount } from '../mobility/motorbike-purchase'
import { estimateOtherCarAnnualAmount } from '../mobility/other-car'
import {
  estimatePrivateCarDrivingAmount,
  estimatePrivateCarDrivingIntensity
} from '../mobility/private-car-driving'
import { estimatePrivateCarMaintenanceAmount } from '../mobility/private-car-maintenance'
import {
  estimatePrivateCarPurchaseAmount,
  estimatePrivateCarPurchaseIntensity
} from '../mobility/private-car-purchase'
import { estimateTaxiIntensity } from '../mobility/taxi'
import { estimateTrainAnnualAmount } from '../mobility/train'
import { estimateWalkingAnnualAmount } from '../mobility/walking'

/** 移動に関するカーボンフットプリントを計算するための質問への回答 */
export interface MobilityParam {
  /** 自家用車の運転距離[km] */
  readonly privateCarAnnualMileage?: number
  /** 車の種類 */
  readonly carType?: CarType
  /** 平均乗車人数 */
  readonly carPassengers?: CarPassengers
  /** 充電方法 */
  readonly carCharging?: CarCharging
  /** 電力の種類 */
  readonly electricityType?: ElectricityType

  /** 移動時間の指定もしくは住んでいる地域の規模 */
  readonly travelingTimeOrResidentialAreaSize:
    | {
        /** 電車の活動量 */
        readonly trainWeeklyTravelingTime: number
        readonly trainAnnualTravelingTime: number

        /** バスの活動量 */
        readonly busWeeklyTravelingTime: number
        readonly busAnnualTravelingTime: number

        /** バイクの活動量 */
        readonly motorbikeWeeklyTravelingTime: number
        readonly motorbikeAnnualTravelingTime: number

        /** その他の車の活動量 */
        readonly otherCarWeeklyTravelingTime: number
        readonly otherCarAnnualTravelingTime: number

        /** 飛行機の活動量 */
        readonly airplaneAnnualTravelingTime: number
        /** フェリーの活動量 */
        readonly ferryAnnualTravelingTime: number
      }
    | {
        /** 住んでいる地域の規模 */
        readonly residentialAreaSize: ResidentialAreaSize
      }
}

export const estimateMobility = ({
  privateCarAnnualMileage = undefined,
  carType = undefined,
  carPassengers = undefined,
  carCharging = undefined,
  electricityType = undefined,
  travelingTimeOrResidentialAreaSize
}: MobilityParam): Item[] => {
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

  const addAmount = (item: string, value: number): void => {
    addEstimation(item, value, 'amount')
  }
  const addIntensity = (item: string, value: number): void => {
    addEstimation(item, value, 'intensity')
  }

  // private car amount
  const mileage =
    privateCarAnnualMileage === undefined ? 0 : privateCarAnnualMileage

  addAmount('private-car-driving', estimatePrivateCarDrivingAmount({ mileage }))
  addAmount(
    'private-car-purchase',
    estimatePrivateCarPurchaseAmount({
      annualMileage: mileage
    })
  )
  addAmount(
    'private-car-maintenance',
    estimatePrivateCarMaintenanceAmount({
      annualMileage: mileage
    })
  )

  // private car intensity
  if (privateCarAnnualMileage !== undefined) {
    addIntensity(
      'private-car-driving',
      estimatePrivateCarDrivingIntensity({
        carType: carType ?? 'unknown',
        carPassengers: carPassengers ?? 'unknown',
        carCharging,
        electricityType
      })
    )
    addIntensity(
      'private-car-purchase',
      estimatePrivateCarPurchaseIntensity({
        carType: carType ?? 'unknown'
      })
    )
    // 'private-car-maintenance'はベースライン値
  }

  // amountを住んでいる地域の規模で回答 (intensity はベースライン値)
  if ('residentialAreaSize' in travelingTimeOrResidentialAreaSize) {
    const area = travelingTimeOrResidentialAreaSize
    addAmount('train', estimateTrainAnnualAmount(area))
    addAmount('bus', estimateBusAnnualAmount(area))
    addAmount('motorbike-driving', estimateMotorbikeDrivingAnnualAmount(area))
    addAmount('motorbike-purchase', estimateMotorbikePurchaseAnnualAmount(area))
    addAmount(
      'motorbike-maintenance',
      estimateMotorbikeMaintenanceAnnualAmount(area)
    )
    addAmount('airplane', estimateAirplaneAnnualAmount(area))
    addAmount('ferry', estimateFerryAnnualAmount(area))

    // other car amount
    const otherCarItems: OtherCarItem[] = [
      'taxi',
      'car-sharing-driving',
      'car-sharing-rental'
    ]
    for (const item of otherCarItems) {
      addAmount(item, estimateOtherCarAnnualAmount(item, area))
    }

    // bicycle と walking は住んでいる地域が設定されている時のみ回答その他はべースライン値
    addAmount('bicycle-driving', estimateBicycleDrivingAnnualAmount(area))
    addAmount(
      'bicycle-maintenance',
      estimateBicycleMaintenanceAnnualAmount(area)
    )
    addAmount('walking', estimateWalkingAnnualAmount(area))
  }
  // amountを数値で回答 (intensity はベースライン値)
  else {
    const travel = travelingTimeOrResidentialAreaSize
    // amount (intensity はベースライン値)
    addAmount(
      'train',
      estimateTrainAnnualAmount({
        weeklyTravelingTime: travel.trainWeeklyTravelingTime,
        annualTravelingTime: travel.trainAnnualTravelingTime
      })
    )
    addAmount(
      'bus',
      estimateBusAnnualAmount({
        weeklyTravelingTime: travel.busWeeklyTravelingTime,
        annualTravelingTime: travel.busAnnualTravelingTime
      })
    )
    const motorbikeTravelingTime = {
      weeklyTravelingTime: travel.motorbikeWeeklyTravelingTime,
      annualTravelingTime: travel.motorbikeAnnualTravelingTime
    }
    addAmount(
      'motorbike-driving',
      estimateMotorbikeDrivingAnnualAmount(motorbikeTravelingTime)
    )
    addAmount(
      'motorbike-purchase',
      estimateMotorbikePurchaseAnnualAmount(motorbikeTravelingTime)
    )
    addAmount(
      'motorbike-maintenance',
      estimateMotorbikeMaintenanceAnnualAmount(motorbikeTravelingTime)
    )
    addAmount(
      'airplane',
      estimateAirplaneAnnualAmount({
        annualTravelingTime: travel.airplaneAnnualTravelingTime
      })
    )
    addAmount(
      'ferry',
      estimateFerryAnnualAmount({
        annualTravelingTime: travel.ferryAnnualTravelingTime
      })
    )

    // other car amount
    const otherCarItems: OtherCarItem[] = [
      'taxi',
      'car-sharing-driving',
      'car-sharing-rental'
    ]
    for (const item of otherCarItems) {
      addAmount(
        item,
        estimateOtherCarAnnualAmount(item, {
          weeklyTravelingTime: travel.otherCarWeeklyTravelingTime,
          annualTravelingTime: travel.otherCarAnnualTravelingTime
        })
      )
    }
  }

  // taxi intensity
  if (carPassengers !== undefined) {
    addIntensity('taxi', estimateTaxiIntensity({ carPassengers }))
  }

  // car-sharing driving intensity
  if (carPassengers !== undefined && carType !== undefined) {
    addIntensity(
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
    addIntensity(
      'car-sharing-rental',
      estimateCarSharingRentalIntensity({ carType })
    )
  }

  return estimations
}
