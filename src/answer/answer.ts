import {
  type AlcoholFrequency,
  type ApplianceFurnitureExpenses,
  type CarCharging,
  type CarPassengers,
  type CarType,
  type ClothesBeautyExpenses,
  type CommunicationExpenses,
  type DailyGoodsExpenses,
  type DairyFoodFrequency,
  type DishFrequency,
  type EatOutExpenses,
  type ElectricityType,
  type FoodDirectWasteFrequency,
  type FoodIntake,
  type FoodLeftoverFrequency,
  type GasItem,
  type HobbyGoodsExpenses,
  type HousingInsulation,
  type HousingSize,
  type LeisureSportsExpenses,
  type Month,
  type ResidentialAreaSize,
  type ServiceExpenses,
  type SoftDrinkSnackExpenses,
  type TravelExpenses
} from 'common'

/** 移動に関するカーボンフットプリントを計算するための質問への回答 */
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

  /** 移動時間の指定もしくは住んでいる地域の規模 */
  readonly travelingTimeOrResidentialAreaSize?:
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

/** 居住に関するカーボンフットプリントを計算するための質問への回答 */
export interface HousingAnswer {
  /** 住居の広さ */
  readonly housingSize?: HousingSize
  /** 住居者数 */
  readonly residentCount?: number
  /** 家の断熱 */
  readonly housingInsulation?: HousingInsulation
  readonly electricity?: {
    /** 電力の種類 */
    readonly electricityType: ElectricityType
    /** 1ヶ月の電力使用量[kWh] */
    readonly monthlyConsumption: number
    /** 対象月 */
    readonly month: Month
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
  /** ガスの使用量 */
  readonly gas?: {
    /** ガスの種類 */
    readonly item: GasItem
    /** 1ヶ月のガス使用量[m3] */
    readonly monthlyConsumption: number
    /** 対象月 */
    readonly month: Month
  }
  /** 灯油の使用量 */
  readonly kerosene?: {
    /** 1ヶ月の灯油使用量[L] */
    readonly monthlyConsumption: number
    /** 対象月数 */
    readonly monthCount: number
  }
}

/** 食に関するカーボンフットプリントを計算するための質問への回答 */
export interface FoodAnswer {
  /** 食料の廃棄量 */
  readonly foodDirectWasteFrequency?: FoodDirectWasteFrequency
  /** 食料の食べ残し量 */
  readonly foodLeftoverFrequency?: FoodLeftoverFrequency
  /** 食料摂取量 */
  readonly foodIntake?: FoodIntake
  /** アルコールの摂取頻度 */
  readonly alcoholFrequency?: AlcoholFrequency
  /** 乳製品の摂取頻度 */
  readonly dairyFoodFrequency?: DairyFoodFrequency
  /** 牛肉料理の頻度 */
  readonly beefDishFrequency?: DishFrequency
  /** 豚肉料理の頻度 */
  readonly porkDishFrequency?: DishFrequency
  /** 鶏肉料理の頻度 */
  readonly chickenDishFrequency?: DishFrequency
  /** 魚介料理の頻度 */
  readonly seafoodDishFrequency?: DishFrequency
  /** ソフトドリンクとスナックの支出 */
  readonly softDrinkSnackExpenses?: SoftDrinkSnackExpenses
  /** 外食の支出 */
  readonly eatOutExpenses?: EatOutExpenses
}

/** その他に関するカーボンフットプリントを計算するための質問への回答 */

export interface OtherAnswer {
  /** 居住者数 */
  readonly residentCount?: number
  /** 旅行の支出 */
  readonly travelExpenses?: TravelExpenses
  /** 家電・家具の支出 */
  readonly applianceFurnitureExpenses?: ApplianceFurnitureExpenses
  /** 衣服・美容の支出 */
  readonly clothesBeautyExpenses?: ClothesBeautyExpenses
  /** 趣味・日用品の支出 */
  readonly hobbyGoodsExpenses?: HobbyGoodsExpenses
  /** サービスの支出 */
  readonly serviceExpenses?: ServiceExpenses
  /** 日用品の支出 */
  readonly dailyGoodsExpenses?: DailyGoodsExpenses

  /** レジャー・スポーツに関わる支出 */
  readonly leisureSportsExpenses?: LeisureSportsExpenses
  /** 通信に関わる支出 */
  readonly communicationExpenses?: CommunicationExpenses
}
