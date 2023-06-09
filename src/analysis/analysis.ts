import { type Diagnosis } from '../answer'
import { type Domain } from '../common'
import { getBaselineIntensity } from '../data'
import { type Item } from '../entity'
import { type ActionItem } from './action-item'
import { type ActionSummary } from './action-summary'
import { type EstimationItem } from './estimation-item'
import { type FootprintItem } from './footprint-item'
import { type FootprintSummary } from './footprint-summary'

/** カーボンフットプリントの診断結果を集計 */
export class Analysis {
  /** ベースラインを横展開したデータ */
  private baselineItems: Record<string, FootprintItem> = {}
  /** フットプリントの診断結果を横展開したデータ */
  private estimationItems: Record<string, EstimationItem> = {}
  /** 改善アクションの結果を横展開したデータ */
  private actionItems: Record<string, ActionItem> = {}

  /** ベースラインを集計したデータ */
  private baselineSummaries: Record<string, FootprintSummary> = {}
  /** フットプリントの診断結果を集計したデータ */
  private estimationSummaries: Record<string, FootprintSummary> = {}
  /** 改善アクションの結果を集計したデータ */
  private actionSummaries: Record<string, ActionSummary> = {}

  /**
   * コンストラクタ
   * @param diagnosis カーボンフットプリントの診断結果
   */
  constructor(diagnosis?: Diagnosis) {
    if (diagnosis !== undefined) {
      this.analyze(diagnosis)
    }
  }

  /**
   * ベースラインの集計を列挙する
   * @returns FootprintSummaryの配列
   */
  public readonly enumerateBaselineSummaries = (): FootprintSummary[] =>
    Object.values(this.baselineSummaries)

  /**
   * ベースラインの集計を取得する
   * @param domain 活動量、GHG原単位を計算する領域
   * @param subdomain 活動量、GHG原単位のサブ領域
   * @returns フットプリントの集計結果
   */
  public readonly findBaselineSummary = (
    domain: Domain,
    subdomain: string
  ): FootprintSummary => this.baselineSummaries[domain + '_' + subdomain]

  /**
   * カーボンフットプリントの診断結果の集計を列挙する
   * @returns FootprintSummaryの配列
   */
  public readonly enumerateEstimationSummaries = (): FootprintSummary[] =>
    Object.values(this.estimationSummaries)

  /**
   * カーボンフットプリントの診断結果の集計を取得する
   * @param domain 活動量、GHG原単位を計算する領域
   * @param subdomain 活動量、GHG原単位のサブ領域
   * @returns フットプリントの集計結果
   */
  public readonly findEstimationSummary = (
    domain: Domain,
    subdomain: string
  ): FootprintSummary => this.estimationSummaries[domain + '_' + subdomain]

  /**
   * 改善アクションの結果の集計を列挙する
   * @returns 改善アクションの配列
   */
  public readonly enumerateActionSummaries = (): ActionSummary[] =>
    Object.values(this.actionSummaries)

  /**
   * 改善アクションの結果の集計を取得する
   * @param option 改善アクションの種類
   * @param domain 活動量、GHG原単位を計算する領域
   * @param subdomain 活動量、GHG原単位のサブ領域
   * @returns 改善アクションの集計結果
   */
  public readonly findActionSummary = (
    option: string,
    domain: Domain,
    subdomain: string
  ): ActionSummary =>
    this.actionSummaries[option + '_' + domain + '_' + subdomain]

  /**
   * ベースラインを列挙する
   * @returns BaselineItemの配列
   */
  public readonly enumerateBaselineItems = (): FootprintItem[] =>
    Object.values(this.baselineItems)

  /**
   * ベースラインを取得する
   * @param domain 活動量、GHG原単位を計算する領域
   * @param item 活動量、GHG原単位を取得する要素
   * @returns ベースラインの一レコード
   */
  public readonly findBaselineItem = (
    domain: Domain,
    item: string
  ): FootprintItem => this.baselineItems[domain + '_' + item]

  /**
   * カーボンフットプリントの診断結果を列挙する
   * @returns EstimationItemの配列
   */
  public readonly enumerateEstimationItems = (): EstimationItem[] =>
    Object.values(this.estimationItems)

  /**
   * カーボンフットプリントの診断結果を取得する
   * @param domain 活動量、GHG原単位を計算する領域
   * @param item 活動量、GHG原単位を取得する要素
   * @returns カーボンフットプリントの診断結果の一レコード
   */
  public readonly findEstimationItem = (
    domain: Domain,
    item: string
  ): EstimationItem => this.estimationItems[domain + '_' + item]

  /**
   * 改善アクションを列挙する
   * @returns 改善アクションの配列
   */
  public readonly enumerateActionItems = (): ActionItem[] =>
    Object.values(this.actionItems)

  /**
   * 改善アクションを取得する
   * @param option 改善アクションの種類
   * @param domain 活動量、GHG原単位を計算する領域
   * @param item 活動量、GHG原単位を取得する要素
   * @returns 改善アクション
   */
  public readonly findActionItem = (
    option: string,
    domain: Domain,
    item: string
  ): EstimationItem => this.actionItems[option + '_' + domain + '_' + item]

  public readonly analyze = (diagnosis: Diagnosis): void => {
    //
    // baselineItemsの初期化
    //

    this.baselineItems = diagnosis
      .enumerateBaselines()
      .filter((amount: Item) => amount.type === 'amount')
      .reduce((acc: Record<string, FootprintItem>, amount: Item) => {
        const intensity = getBaselineIntensity(amount.domain, amount.item)
        const key = amount.domain + '_' + amount.item
        acc[key] = {
          domain: amount.domain,
          item: amount.item,
          subdomain: amount.subdomain,
          intensity: intensity.value,
          intensityUnit: intensity.unit,
          amount: amount.value,
          amountUnit: amount.unit,
          footprint: amount.value * intensity.value
        }
        return acc
      }, {})

    //
    // footprintItemsの初期化
    //

    // ベースラインの値はamount, intensityとも全ての値が設定されていると仮定し、
    // その値を取得し、footprintItemsに追加、estimationの値で上書きする
    this.estimationItems = diagnosis
      .enumerateBaselines()
      .filter((baseline: Item) => baseline.type === 'amount')
      .reduce((acc: Record<string, EstimationItem>, baseline: Item) => {
        const { value: amount, unit: amountUnit } =
          diagnosis.findEstimationOrDefault(
            baseline.domain,
            baseline.item,
            'amount'
          )
        const amountOrigin = diagnosis.getEstimationOrigin(
          baseline.domain,
          baseline.item,
          'amount'
        )

        const { value: intensity, unit: intensityUnit } =
          diagnosis.findEstimationOrDefault(
            baseline.domain,
            baseline.item,
            'intensity'
          )
        const intensityOrigin = diagnosis.getEstimationOrigin(
          baseline.domain,
          baseline.item,
          'intensity'
        )

        const key = baseline.domain + '_' + baseline.item
        acc[key] = {
          domain: baseline.domain,
          item: baseline.item,
          subdomain: baseline.subdomain,
          intensity,
          intensityUnit,
          intensityOrigin,
          amount,
          amountUnit,
          amountOrigin,
          footprint: amount * intensity
        }
        return acc
      }, {})

    //
    // actionItemの初期化
    //

    // optionの列挙
    const options: Set<string> = new Set<string>(
      diagnosis.enumerateActions().map((action) => action.option)
    )

    // option毎にbaselineから、actionItemを作成
    this.actionItems = {}
    options.forEach((option: string) => {
      diagnosis
        .enumerateBaselines()
        .filter((baseline: Item) => baseline.type === 'amount')
        .forEach((baseline: Item) => {
          const { value: amount, unit: amountUnit } =
            diagnosis.findActionOrDefault(
              option,
              baseline.domain,
              baseline.item,
              'amount'
            )
          const amountOrigin = diagnosis.getActionOrigin(
            option,
            baseline.domain,
            baseline.item,
            'amount'
          )

          const { value: intensity, unit: intensityUnit } =
            diagnosis.findActionOrDefault(
              option,
              baseline.domain,
              baseline.item,
              'intensity'
            )
          const intensityOrigin = diagnosis.getActionOrigin(
            option,
            baseline.domain,
            baseline.item,
            'intensity'
          )

          const key = option + '_' + baseline.domain + '_' + baseline.item
          this.actionItems[key] = {
            option,
            domain: baseline.domain,
            item: baseline.item,
            subdomain: baseline.subdomain,
            intensity,
            intensityUnit,
            intensityOrigin,
            amount,
            amountUnit,
            amountOrigin,
            footprint: amount * intensity
          }
        })
    })

    //
    // 集計
    //
    this.baselineSummaries = Object.values(this.baselineItems).reduce(
      (acc: Record<string, FootprintSummary>, item: FootprintItem) => {
        const key = item.domain + '_' + item.subdomain
        if (acc[key] === undefined) {
          acc[key] = {
            domain: item.domain,
            subdomain: item.subdomain,
            footprint: 0
          }
        }
        acc[key].footprint += item.footprint
        return acc
      },
      {}
    )

    this.estimationSummaries = Object.values(this.estimationItems).reduce(
      (acc: Record<string, FootprintSummary>, item: EstimationItem) => {
        const key = item.domain + '_' + item.subdomain
        if (acc[key] === undefined) {
          acc[key] = {
            domain: item.domain,
            subdomain: item.subdomain,
            footprint: 0
          }
        }
        acc[key].footprint += item.footprint
        return acc
      },
      {}
    )

    this.actionSummaries = Object.values(this.actionItems).reduce(
      (acc: Record<string, ActionSummary>, item: ActionItem) => {
        const key = item.option + '_' + item.domain + '_' + item.subdomain
        if (acc[key] === undefined) {
          acc[key] = {
            option: item.option,
            domain: item.domain,
            subdomain: item.subdomain,
            footprint: 0
          }
        }
        acc[key].footprint += item.footprint
        return acc
      },
      {}
    )
  }
}
