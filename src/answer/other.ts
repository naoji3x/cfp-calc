import {
  APPLIANCE_FURNITURE_ITEMS,
  CLOTHES_BEAUTY_ITEMS,
  COMMUNICATION_ITEMS,
  DAILY_GOODS_ITEMS,
  HOBBY_GOODS_ITEMS,
  LEISURE_SPORTS_ITEMS,
  SERVICE_ITEMS,
  TRAVEL_ITEMS,
  type ApplianceFurnitureExpenses,
  type ClothesBeautyExpenses,
  type CommunicationExpenses,
  type DailyGoodsExpenses,
  type Domain,
  type HobbyGoodsExpenses,
  type LeisureSportsExpenses,
  type ServiceExpenses,
  type TravelExpenses,
  type Type
} from 'common'
import { getBaselineAmount, getParameter } from 'data'
import { type Item } from 'entity/item'
import { estimateApplianceFurnitureAnnualAmount } from '../other/appliance-furniture'
import { estimateClothesBeautyAnnualAmount } from '../other/clothes-beauty'
import { estimateCommunicationAnnualAmount } from '../other/communication'
import { estimateDailyGoodsAnnualAmount } from '../other/daily-goods'
import { estimateHobbyGoodsAnnualAmount } from '../other/hobby-goods'
import { estimateLeisureSportsAnnualAmount } from '../other/leisure-sports'
import { estimateServiceAnnualAmount } from '../other/service'
import { estimateTravelAnnualAmount } from '../other/travel'
import { estimateWasteAnnualAmount } from '../other/waste'

/** その他に関するカーボンフットプリントを計算するための質問への回答 */

export interface OtherParam {
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

export const estimateOther = ({
  residentCount = undefined,
  travelExpenses = undefined,
  applianceFurnitureExpenses = undefined,
  clothesBeautyExpenses = undefined,
  hobbyGoodsExpenses = undefined,
  serviceExpenses = undefined,
  dailyGoodsExpenses = undefined,
  leisureSportsExpenses = undefined,
  communicationExpenses = undefined
}: OtherParam): Item[] => {
  const domain: Domain = 'other'
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

  // 居住者数の補正
  if (residentCount === undefined) {
    residentCount = getParameter('family-size', 'unknown').value
  }

  // daily-goods amount (intensity はベースライン値)
  if (dailyGoodsExpenses !== undefined) {
    for (const item of DAILY_GOODS_ITEMS) {
      addEstimatedAmount(
        item,
        estimateDailyGoodsAnnualAmount(item, {
          expenses: dailyGoodsExpenses,
          residentCount
        })
      )
    }
  }

  // travel amount (intensity はベースライン値)
  if (travelExpenses !== undefined) {
    for (const item of TRAVEL_ITEMS) {
      addEstimatedAmount(
        item,
        estimateTravelAnnualAmount(item, {
          expenses: travelExpenses
        })
      )
    }
  }

  // appliance-furniture amount (intensity はベースライン値)
  if (applianceFurnitureExpenses !== undefined) {
    for (const item of APPLIANCE_FURNITURE_ITEMS) {
      addEstimatedAmount(
        item,
        estimateApplianceFurnitureAnnualAmount(item, {
          expenses: applianceFurnitureExpenses,
          residentCount
        })
      )
    }
  }

  // hobby-goods amount (intensity はベースライン値)
  if (hobbyGoodsExpenses !== undefined) {
    for (const item of HOBBY_GOODS_ITEMS) {
      addEstimatedAmount(
        item,
        estimateHobbyGoodsAnnualAmount(item, {
          expenses: hobbyGoodsExpenses
        })
      )
    }
  }

  // clothes-beauty amount (intensity はベースライン値)
  if (clothesBeautyExpenses !== undefined) {
    for (const item of CLOTHES_BEAUTY_ITEMS) {
      addEstimatedAmount(
        item,
        estimateClothesBeautyAnnualAmount(item, {
          expenses: clothesBeautyExpenses
        })
      )
    }
  }

  // leisure-sports amount (intensity はベースライン値)
  if (leisureSportsExpenses !== undefined) {
    for (const item of LEISURE_SPORTS_ITEMS) {
      addEstimatedAmount(
        item,
        estimateLeisureSportsAnnualAmount(item, {
          expenses: leisureSportsExpenses
        })
      )
    }
  }

  // communication amount (intensity はベースライン値)
  if (communicationExpenses !== undefined) {
    for (const item of COMMUNICATION_ITEMS) {
      addEstimatedAmount(
        item,
        estimateCommunicationAnnualAmount(item, {
          expenses: communicationExpenses,
          residentCount
        })
      )
    }
  }

  // service amount (intensity はベースライン値)
  if (serviceExpenses !== undefined) {
    for (const item of SERVICE_ITEMS) {
      addEstimatedAmount(
        item,
        estimateServiceAnnualAmount(item, {
          expenses: serviceExpenses
        })
      )
    }
  }

  // waste amount (intensity はベースライン値)
  if (
    applianceFurnitureExpenses !== undefined &&
    clothesBeautyExpenses !== undefined &&
    hobbyGoodsExpenses !== undefined &&
    serviceExpenses !== undefined &&
    dailyGoodsExpenses !== undefined
  ) {
    addEstimatedAmount(
      'waste',
      estimateWasteAnnualAmount({
        applianceFurnitureExpenses,
        clothesBeautyExpenses,
        hobbyGoodsExpenses,
        serviceExpenses,
        dailyGoodsExpenses,
        residentCount
      })
    )
  }

  return estimations
}