import { type Origin } from '../common'
import { type FootprintItem } from './footprint-item'

/**
 * Diagnosisでは、フットプリントを推定してベースラインから変更のあった
 * 項目（活動量、GHG原単位）のみを縦展開で保持しており、
 * 分析には使いにくいため、EstimationItemで横展開する。
 */
export interface EstimationItem extends FootprintItem {
  /** GHG原単位の取得元 */
  readonly intensityOrigin: Origin
  /** 活動量の取得元 */
  readonly amountOrigin: Origin
}
