import { type FootprintSummary } from './footprint-summary'

/**
 * subdomain毎の改善アクションの集計値
 */

export interface ActionSummary extends FootprintSummary {
  /** 改善アクションの種類 */
  readonly option: string
}
