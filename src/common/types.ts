export type Domain = 'food' | 'housing' | 'mobility' | 'other'
export type Type = 'amount' | 'intensity'

//
// mobility
//

/** 自動車の種類(v1ではCarIntensityFactorFirstKey) */
export type CarType = 'gasoline' | 'light' | 'hv' | 'phv' | 'ev' | 'unknown'

/** 自宅充電の割合 ※v1ではCarChargingKey */
export type CarCharging =
  | 'charge-almost-at-home'
  | 'use-charging-spots-occasionally'
  | 'use-charging-spots-sometimes'
  | 'use-charging-spots-usually'
  | 'unknown'

/** 平均乗車人数(v1ではCarPassengersFirstKey) */
export type CarPassengers =
  | '1'
  | '1-2'
  | '2'
  | '2-3'
  | '3'
  | '3-4'
  | '4-more'
  | 'unknown'

/** 自宅での電力の種類(v1ではElectricityIntensityKey) */
export type ElectricityType =
  | 'conventional'
  | '30-renewable'
  | '50-renewable'
  | '100-renewable'
  | 'solar-panel'
  | 'unknown'

/** 住んでいる地域の規模(v1ではMileageByAreaFirstKey) */
export type ResidentialAreaSize =
  | 'major-city-or-metropolitan-area'
  | 'city-150k-more'
  | 'city-50k-150k'
  | 'area-less-than-50k'
  | 'unknown'

/** その他の車のアイテム名称 */
export type OtherCarItem = 'taxi' | 'car-sharing-driving' | 'car-sharing-rental'

//
// food
//

/** 摂取カロリー量 */
export type FoodIntake =
  | 'very-little'
  | 'somewhat-little'
  | 'moderate'
  | 'somewhat-much'
  | 'very-much'
  | 'unknown'

/* 食料の破棄の頻度 */
export type FoodDirectWasteFrequency =
  | 'seldom'
  | '1-per-week'
  | '2-3-per-week'
  | '4-7-per-week'
  | '8-more-per-week'
  | 'unknown'

/** 食べ残しの頻度 */
export type FoodLeftoverFrequency =
  | 'seldom'
  | '1-per-week'
  | '2-3-per-week'
  | '4-7-per-week'
  | '8-more-per-week'
  | 'unknown'

/** 料理の頻度 */
export type DishFrequency =
  | 'everyday'
  | '4-5-per-week'
  | '2-3-per-week'
  | '1-per-week'
  | '2-3-per-month'
  | '1-less-per-month'
  | 'never'
  | 'unknown'

/** 乳製品の頻度 */
export type DairyFoodFrequency =
  | '3-more-per-day'
  | '2-per-day'
  | '1-per-day'
  | 'half-of-week'
  | '1-2-less-per-week'
  | 'never'
  | 'unknown'

/** お酒の頻度 */
export type AlcoholFrequency =
  | 'everyday'
  | '4-5-per-week'
  | '2-3-per-week'
  | '1-per-week'
  | '2-3-less-per-month'
  | 'never'
  | 'unknown'

/** お酒以外の飲み物、お菓子類の頻度 */
export type SoftDrinkSnackExpenses =
  | '3k-less'
  | '3k-5k'
  | '5k-10k'
  | '10k-15k'
  | '15k-more'
  | 'unknown'

/** 外食費 */
export type EatOutExpenses =
  | '5k-less'
  | '5k-10k'
  | '10k-20k'
  | '20k-50k'
  | '50k-more'
  | 'unknown'

/** 料理の種類 */
export const DISH_ITEMS = [
  'beef',
  'pork',
  'chicken',
  'other-meat',
  'fish',
  'processed-fish'
] as const
export type DishItem = (typeof DISH_ITEMS)[number]

/** 飲み物、お菓子の種類 */
export const SOFT_DRINK_SNACK_ITEMS = [
  'sweets-snack',
  'coffee-tea',
  'cold-drink'
] as const
export type SoftDrinkSnackItem = (typeof SOFT_DRINK_SNACK_ITEMS)[number]

/** 摂取カロリーの種類 */
export const FOOD_INTAKE_ITEMS = [
  'rice',
  'bread-flour',
  'noodle',
  'potatoes',
  'vegetables',
  'processed-vegetables',
  'beans',
  'fruits',
  'oil',
  'seasoning'
] as const
export type FoodIntakeItem = (typeof FOOD_INTAKE_ITEMS)[number]

/** 乳製品の種類 */
export const DAIRY_FOOD_ITEMS = ['milk', 'other-dairy', 'eggs'] as const
export type DairyFoodItem = (typeof DAIRY_FOOD_ITEMS)[number]

/** 外食の種類 */
export const EAT_OUT_ITEMS = ['restaurant', 'bar-cafe'] as const
export type EatOutItem = (typeof EAT_OUT_ITEMS)[number]

//
// housing
//

/** 家の部屋数 */
export type HousingSize =
  | '1-room'
  | '2-room'
  | '3-room'
  | '4-room'
  | '5-6-room'
  | '7-more-room'
  | 'unknown'

/** 家の断熱 */
export type HousingInsulation =
  | 'no-insulation'
  | '2-level'
  | '3-level'
  | '4-level'
  | 'unknown'

/** 月 */
export type Month =
  | 'january'
  | 'february'
  | 'march'
  | 'april'
  | 'may'
  | 'june'
  | 'july'
  | 'august'
  | 'september'
  | 'october'
  | 'november'
  | 'december'

/** 使用しているガスの種類 */
export type GasItem = 'urban-gas' | 'lpg'

/** お住まいの地域（地方） */
export type LivingRegion = 'northeast' | 'middle' | 'southwest' | 'unknown'

//
// other
//

/** 日常品の種類 */
export const DAILY_GOODS_ITEMS = [
  'sanitation',
  'kitchen-goods',
  'paper-stationery'
] as const
export type DailyGoodsItem = (typeof DAILY_GOODS_ITEMS)[number]

/** 通信費、放送受信料の種類 */
export const COMMUNICATION_ITEMS = ['communication', 'broadcasting'] as const
export type CommunicationItem = (typeof COMMUNICATION_ITEMS)[number]

/** 家電・家具の種類 */
export const APPLIANCE_FURNITURE_ITEMS = [
  'electrical-appliances-repair-rental',
  'furniture-daily-goods-repair-rental',
  'cooking-appliances',
  'heating-cooling-appliances',
  'other-appliances',
  'electronics',
  'furniture',
  'covering'
] as const

export type ApplianceFurnitureItem = (typeof APPLIANCE_FURNITURE_ITEMS)[number]

/** サービスrの種類 */
export const SERVICE_ITEMS = [
  'medicine',
  'housework',
  'washing',
  'medical-care',
  'nursing',
  'caring',
  'formal-education',
  'informal-education'
] as const
export type ServiceItem = (typeof SERVICE_ITEMS)[number]

/** 趣味の支出の種類 */
export const HOBBY_GOODS_ITEMS = [
  'culture-goods',
  'entertainment-goods',
  'sports-goods',
  'gardening-flower',
  'pet',
  'tobacco',
  'books-magazines',
  'sports-culture-repair-rental',
  'sports-entertainment-repair-rental'
] as const
export type HobbyGoodsItem = (typeof HOBBY_GOODS_ITEMS)[number]

/** 衣類、かばん、宝飾品、美容関連などの支出の種類 */
export const CLOTHES_BEAUTY_ITEMS = [
  'haircare',
  'cosmetics',
  'clothes-goods',
  'bags-jewelries-goods',
  'clothes-repair-rental',
  'bags-jewelries-repair-rental'
] as const
export type ClothesBeautyItem = (typeof CLOTHES_BEAUTY_ITEMS)[number]

/** レジャー、スポーツへの支出の種類 */
export const LEISURE_SPORTS_ITEMS = [
  'culture-leisure',
  'entertainment-leisure',
  'sports-leisure',
  'bath-spa'
] as const
export type LeisureSportsItem = (typeof LEISURE_SPORTS_ITEMS)[number]

/** 旅行の種類 */
export const TRAVEL_ITEMS = ['hotel', 'travel'] as const
export type TravelItem = (typeof TRAVEL_ITEMS)[number]

/** モノとサービスに関するアイテムの種類 */
export type OtherItem =
  | DailyGoodsItem
  | CommunicationItem
  | ApplianceFurnitureItem
  | ServiceItem
  | HobbyGoodsItem
  | ClothesBeautyItem
  | LeisureSportsItem
  | TravelItem
  | 'waste'

/** その他のカテゴリ  */
export type OtherCategory =
  | 'daily-goods-amount'
  | 'communication-amount'
  | 'appliance-furniture-amount'
  | 'service-factor'
  | 'hobby-goods-factor'
  | 'clothes-beauty-factor'
  | 'leisure-sports-factor'
  | 'travel-factor'

/** 日常品の支出 */
export type DailyGoodsExpenses =
  | '5k-less'
  | '5k-10k'
  | '10k-20k'
  | '20k-30k'
  | '30k-more'
  | 'unknown'
  | 'average-per-capita'

/** 通信費、放送受信料の支出 */
export type CommunicationExpenses =
  | '5k-less'
  | '5k-10k'
  | '10k-20k'
  | '20k-30k'
  | '30k-more'
  | 'unknown'
  | 'average-per-capita'

/** 家電・家具の支出 */
export type ApplianceFurnitureExpenses =
  | '50k-less'
  | '50k-100k'
  | '100k-200k'
  | '200k-300k'
  | '300k-400k'
  | '400k-more'
  | 'unknown'
  | 'average-per-capita'

/** サービスの支出 */
export type ServiceExpenses =
  | '5k-less'
  | '5k-10k'
  | '10k-20k'
  | '20k-50k'
  | '50k-more'
  | 'unknown'

/** 趣味の支出 */
export type HobbyGoodsExpenses =
  | '5k-less'
  | '5k-10k'
  | '10k-20k'
  | '20k-50k'
  | '50k-more'
  | 'unknown'

/** 衣類、かばん、宝飾品、美容関連などの支出 */
export type ClothesBeautyExpenses =
  | '5k-less'
  | '5k-10k'
  | '10k-20k'
  | '20k-50k'
  | '50k-more'
  | 'unknown'

/** レジャー、スポーツへの支出 */
export type LeisureSportsExpenses =
  | '5k-less'
  | '5k-10k'
  | '10k-20k'
  | '20k-50k'
  | '50k-more'
  | 'unknown'

/** 旅行の支出 */
export type TravelExpenses =
  | '10k-less'
  | '10k-30k'
  | '30k-50k'
  | '50k-100k'
  | '100k-200k'
  | '200k-more'
  | 'unknown'
