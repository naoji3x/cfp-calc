import { type EstimationItem } from './estimation-item'

/**
 * Diagnosisでは、改善アクションを計算してベースラインから変更のあった
 * 項目（活動量、GHG原単位）のみを縦展開で保持しており、
 * 分析には使いにくいため、ActionItemで横展開する。
 */
export interface ActionItem extends EstimationItem {
  /** 改善アクションの種類 */
  readonly option: string
}
