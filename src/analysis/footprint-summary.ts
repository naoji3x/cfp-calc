import { type Domain } from '../common'

/**
 * subdomain毎のカーボンフットプリントの集計値
 */
export interface FootprintSummary {
  /** 活動量、GHG原単位を計算する領域 */
  readonly domain: Domain
  /** 活動量、GHG原単位を計算するサブ領域 */
  readonly subdomain: string
  /** カーボンフットプリント[kCO2e] */
  footprint: number
}
