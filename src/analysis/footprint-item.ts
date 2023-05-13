import { type Domain } from '../common'

/**
 * Diagnosisでは、活動量、GHG原単位が縦展開されており、
 * 分析には使いにくいため、FootprintItemで横展開する。
 */
export interface FootprintItem {
  /** 活動量、GHG原単位を計算する領域 */
  readonly domain: Domain
  /** 活動量、GHG原単位を計算するサブ領域 */
  readonly subdomain: string
  /** 活動量、GHG原単位を計算する項目 */
  readonly item: string
  /** GHG原単位 */
  readonly intensity: number
  /** GHG原単位の単位 */
  readonly intensityUnit: string
  /** 活動量 */
  readonly amount: number
  /** 活動量の単位 */
  readonly amountUnit: string
  /** カーボンフットプリント[kCO2e] */
  readonly footprint: number
}
