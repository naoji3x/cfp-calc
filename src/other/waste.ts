import {
  type ApplianceFurnitureExpenses,
  type ApplianceFurnitureItem,
  type ClothesBeautyExpenses,
  type ClothesBeautyItem,
  type DailyGoodsExpenses,
  type DailyGoodsItem,
  type HobbyGoodsExpenses,
  type HobbyGoodsItem,
  type ServiceExpenses,
  type ServiceItem
} from '../common/types'
import { getBaselineAmount, getBaselineIntensity } from '../data/database'
import { estimateApplianceFurnitureAnnualAmount } from './appliance-furniture'
import { estimateClothesBeautyAnnualAmount } from './clothes-beauty'
import { estimateDailyGoodsAnnualAmount } from './daily-goods'
import { estimateHobbyGoodsAnnualAmount } from './hobby-goods'
import { estimateServiceAnnualAmount } from './service'

/** 廃棄の活動量を計算するための引数 */
export interface WasteAmountParam {
  /** 家電・家具の支出 */
  applianceFurnitureExpenses?: ApplianceFurnitureExpenses
  /** 衣服・美容の支出 */
  clothesBeautyExpenses?: ClothesBeautyExpenses
  /** 趣味・日用品の支出 */
  hobbyGoodsExpenses?: HobbyGoodsExpenses
  /** サービスの支出 */
  serviceExpenses?: ServiceExpenses
  /** 日用品の支出 */
  dailyGoodsExpenses?: DailyGoodsExpenses
  /** 居住者数 */
  residentCount?: number
}

/**
 * 廃棄の活動量を計算する
 * @remarks
 * wasteは以下のitemのestimation合計/baseline合計とwasteのbaseline値を掛け合わせて求める。
 * - appliance-furniture-amount
 *   - cooking-appliances
 *   - heating-cooling-appliances
 *   - other-appliances
 *   - electronics
 *   - furniture
 *   - covering
 * - clothes-beauty-factor
 *   - clothes-goods
 * - bags-jewelries-goods
 *   - cosmetics
 * - hobby-goods-factor
 *   - culture-goods
 *   - entertainment-goods
 *   - sports-goods
 *   - gardening-flower
 *   - pet
 *   - tobacco
  'books-magazines'
'service-factor'  
  'medicine'
'daily-goods-amount'  
  'sanitation'
  'kitchen-goods'
  'paper-stationery'
 * @param param 廃棄の活動量を計算するための引数
 * @returns 廃棄の活動量[000JPY]
 */
export const estimateWasteAnnualAmount = ({
  applianceFurnitureExpenses,
  clothesBeautyExpenses,
  hobbyGoodsExpenses,
  serviceExpenses,
  dailyGoodsExpenses,
  residentCount
}: WasteAmountParam): number => {
  const applianceFurnitureItems: ApplianceFurnitureItem[] = [
    'cooking-appliances',
    'heating-cooling-appliances',
    'other-appliances',
    'electronics',
    'furniture',
    'covering'
  ]

  const clothesBeautyItems: ClothesBeautyItem[] = [
    'clothes-goods',
    'bags-jewelries-goods',
    'cosmetics'
  ]

  const hobbyGoodsItems: HobbyGoodsItem[] = [
    'culture-goods',
    'entertainment-goods',
    'sports-goods',
    'gardening-flower',
    'pet',
    'tobacco',
    'books-magazines'
  ]

  const serviceItems: ServiceItem[] = ['medicine']
  const dailyGoodsItems: DailyGoodsItem[] = [
    'sanitation',
    'kitchen-goods',
    'paper-stationery'
  ]

  let numerator = 0
  let denominator = 0

  for (const item of applianceFurnitureItems) {
    const baseline = getBaselineAmount('other', item).value
    if (
      applianceFurnitureExpenses !== undefined &&
      residentCount !== undefined
    ) {
      numerator += estimateApplianceFurnitureAnnualAmount(item, {
        applianceFurnitureExpenses,
        residentCount
      })
    } else {
      numerator += baseline
    }
    denominator += baseline
  }

  for (const item of clothesBeautyItems) {
    const baseline = getBaselineAmount('other', item).value
    if (clothesBeautyExpenses !== undefined) {
      numerator += estimateClothesBeautyAnnualAmount(item, {
        clothesBeautyExpenses
      })
    } else {
      numerator += baseline
    }
    denominator += baseline
  }

  for (const item of hobbyGoodsItems) {
    const baseline = getBaselineAmount('other', item).value
    if (hobbyGoodsExpenses !== undefined) {
      numerator += estimateHobbyGoodsAnnualAmount(item, {
        hobbyGoodsExpenses
      })
    } else {
      numerator += baseline
    }
    denominator += baseline
  }

  for (const item of serviceItems) {
    const baseline = getBaselineAmount('other', item).value
    if (serviceExpenses !== undefined) {
      numerator += estimateServiceAnnualAmount(item, {
        serviceExpenses
      })
    } else {
      numerator += baseline
    }
    denominator += baseline
  }

  for (const item of dailyGoodsItems) {
    const baseline = getBaselineAmount('other', item).value
    if (dailyGoodsExpenses !== undefined && residentCount !== undefined) {
      numerator += estimateDailyGoodsAnnualAmount(item, {
        dailyGoodsExpenses,
        residentCount
      })
    } else {
      numerator += baseline
    }
    denominator += baseline
  }

  return (getBaselineAmount('other', 'waste').value * numerator) / denominator
}

/**
 * 廃棄のGHG原単位を計算する
 * @returns ベースライン値[kgCO2e/000JPY]
 */
export const estimateWasteIntensity = (): number =>
  getBaselineIntensity('other', 'waste').value
