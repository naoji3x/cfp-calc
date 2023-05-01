import {
  type CarCharging,
  type CarPassengers,
  type CarType,
  type ElectricityType
} from 'common'
import {
  type AnnualTravelingTimeParam,
  type ResidentialAreaSizeParam,
  type TravelingTimeParam
} from 'mobility'

export interface MobilityAnswer {
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

  readonly trainAmount: TravelingTimeParam | ResidentialAreaSizeParam
  readonly busAmount: TravelingTimeParam | ResidentialAreaSizeParam
  readonly motorbikeDrivingAmount: TravelingTimeParam | ResidentialAreaSizeParam
  readonly otherCarAmount: TravelingTimeParam | ResidentialAreaSizeParam
  readonly airplaneAmount: AnnualTravelingTimeParam | ResidentialAreaSizeParam
  readonly ferryAmount: AnnualTravelingTimeParam | ResidentialAreaSizeParam
  readonly bicycleDrivingAmount?: ResidentialAreaSizeParam
  readonly walkingAmount?: ResidentialAreaSizeParam
}
