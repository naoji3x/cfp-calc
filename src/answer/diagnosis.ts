import { type Domain, type Origin, type Type } from '../common'
import { enumerateBaselines } from '../data'
import { type Action, type Footprint, type Item } from '../entity'
import { calculateActions, type ActionAnswer } from './action'
import {
  type FoodAnswer,
  type HousingAnswer,
  type MobilityAnswer,
  type OtherAnswer
} from './answer'
import { estimateFood } from './food'
import { estimateHousing } from './housing'
import { estimateMobility } from './mobility'
import { estimateOther } from './other'

/** カーボンフットプリントの診断結果 */
export class Diagnosis {
  private baselines: Record<string, Item> = {}
  private estimations: Record<string, Item> = {}
  private actions: Record<string, Action> = {}

  private mobilityAnswer_: MobilityAnswer = {}
  private housingAnswer_: HousingAnswer = {}
  private foodAnswer_: FoodAnswer = {}
  private otherAnswer_: OtherAnswer = {}

  public get housingAnswer(): HousingAnswer {
    return this.housingAnswer_
  }

  public get mobilityAnswer(): MobilityAnswer {
    return this.mobilityAnswer_
  }

  public get foodAnswer(): FoodAnswer {
    return this.foodAnswer_
  }

  public get otherAnswer(): OtherAnswer {
    return this.otherAnswer_
  }

  private readonly toItem = (footprint: Footprint): Item => ({
    domain: footprint.domain,
    subdomain: footprint.subdomain,
    item: footprint.item,
    type: footprint.type,
    value: footprint.value,
    unit: footprint.unit
  })

  private readonly addBaselines = (domain: Domain): void => {
    enumerateBaselines()
      .filter((baseline) => baseline.domain === domain)
      .map((baseline) => this.toItem(baseline))
      .forEach((item) => {
        this.baselines[item.domain + '_' + item.item + '_' + item.type] = item
      })
  }

  private readonly addEstimations = (estimations: Item[]): void => {
    estimations.forEach((e) => {
      this.estimations[e.domain + '_' + e.item + '_' + e.type] = e
    })
  }

  private readonly addActions = (actions: Action[]): void => {
    actions.forEach((a) => {
      this.actions[a.option + '_' + a.domain + '_' + a.item + '_' + a.type] = a
    })
  }

  /** 相互依存の回答を展開する */
  private readonly exchange = (): {
    housingAnswer: HousingAnswer
    mobilityAnswer: MobilityAnswer
    foodAnswer: FoodAnswer
    otherAnswer: OtherAnswer
  } => {
    let mobilityAnswer = this.mobilityAnswer_
    let housingAnswer = this.housingAnswer_
    const foodAnswer = this.foodAnswer_
    let otherAnswer = this.otherAnswer_

    // housing -> mobility
    if (
      housingAnswer.electricity?.electricityType !== undefined &&
      Object.keys(mobilityAnswer).length > 0
    ) {
      mobilityAnswer = {
        ...mobilityAnswer,
        electricityType: housingAnswer.electricity.electricityType
      }
    }

    // mobility -> housing
    if (
      mobilityAnswer.carType !== undefined &&
      mobilityAnswer.privateCarAnnualMileage !== undefined &&
      housingAnswer.electricity !== undefined
    ) {
      housingAnswer = {
        ...housingAnswer,
        electricity: {
          ...housingAnswer.electricity,
          privateCar: {
            carType: mobilityAnswer.carType,
            annualMileage: mobilityAnswer.privateCarAnnualMileage,
            carCharging: mobilityAnswer.carCharging
          }
        }
      }
    }

    // housing -> other
    if (
      housingAnswer.residentCount !== undefined &&
      Object.keys(otherAnswer).length > 0
    ) {
      otherAnswer = {
        ...this.otherAnswer_,
        residentCount: this.housingAnswer_.residentCount
      }
    }
    return { mobilityAnswer, housingAnswer, foodAnswer, otherAnswer }
  }

  /** 改善アクション計算用のパラメータを作成する */
  private readonly createActionParam = (
    housingAnswer: HousingAnswer,
    mobilityAnswer: MobilityAnswer,
    foodAnswer: FoodAnswer,
    otherAnswer: OtherAnswer
  ): ActionAnswer => {
    return {
      housingInsulation: housingAnswer.housingInsulation,
      foodDirectWaste: foodAnswer.foodDirectWasteFrequency,
      foodLeftover: foodAnswer.foodLeftoverFrequency,
      carType: mobilityAnswer.carType,
      carPassengers: mobilityAnswer.carPassengers,
      carCharging: mobilityAnswer.carCharging,
      electricityType: housingAnswer.electricity?.electricityType
    }
  }

  /** 計算の実行 */
  private readonly validate = (): void => {
    this.baselines = {}
    this.estimations = {}

    const { housingAnswer, mobilityAnswer, foodAnswer, otherAnswer } =
      this.exchange()
    if (Object.keys(housingAnswer).length !== 0) {
      this.addEstimations(estimateHousing(housingAnswer))
      this.addBaselines('housing')
    }
    if (Object.keys(mobilityAnswer).length !== 0) {
      this.addEstimations(estimateMobility(mobilityAnswer))
      this.addBaselines('mobility')
    }
    if (Object.keys(foodAnswer).length !== 0) {
      this.addEstimations(estimateFood(foodAnswer))
      this.addBaselines('food')
    }
    if (Object.keys(otherAnswer).length !== 0) {
      this.addEstimations(estimateOther(otherAnswer))
      this.addBaselines('other')
    }

    this.actions = {}
    const param = this.createActionParam(
      housingAnswer,
      mobilityAnswer,
      foodAnswer,
      otherAnswer
    )
    this.addActions(calculateActions(param, this.findEstimationOrDefault))
  }

  /**
   * 活動量、GHG原単位の推定値を取得する（推定値がない場合はベースライン値を返す）
   * @param domain 活動量、GHG原単位を計算する領域
   * @param item 活動量、GHG原単位を取得する要素
   * @param type amount or intensity
   * @returns 活動量もしくはGHG原単位の要素
   */
  public readonly findEstimationOrDefault = (
    domain: Domain,
    item: string,
    type: Type
  ): Item => {
    const key = domain + '_' + item + '_' + type
    const estimation = this.estimations[key]
    if (estimation === undefined) {
      return this.baselines[key]
    }
    return estimation
  }

  /**
   * 活動量、GHG原単位の推定値がどのデータに基づいているかを取得する
   * @param domain 活動量、GHG原単位を計算する領域
   * @param item 活動量、GHG原単位を取得する要素
   * @param type amount or intensity
   * @returns baseline or estimation
   */
  public readonly getEstimationOrigin = (
    domain: Domain,
    item: string,
    type: Type
  ): Origin => {
    const key = domain + '_' + item + '_' + type
    return this.estimations[key] === undefined ? 'baseline' : 'estimation'
  }

  /**
   * 改善アクションを取得する（改善アクションがない場合は推定値->ベースライン値を返す）
   * @param option 改善アクションの種類
   * @param domain 改善アクションを計算する領域
   * @param item 活動量、GHG原単位を取得する要素
   * @param type amount or intensity
   * @returns 改善アクション
   */
  public readonly findActionOrDefault = (
    option: string,
    domain: Domain,
    item: string,
    type: Type
  ): Action => {
    const key = option + '_' + domain + '_' + item + '_' + type
    const action = this.actions[key]
    if (action === undefined) {
      return {
        ...this.findEstimationOrDefault(domain, item, type),
        option
      }
    }
    return action
  }

  /**
   * 改善アクションがどのデータに基づいているかを取得する
   * @param domain 活動量、GHG原単位を計算する領域
   * @param item 活動量、GHG原単位を取得する要素
   * @param type amount or intensity
   * @returns baseline, estimation or action
   * */
  public readonly getActionOrigin = (
    option: string,
    domain: Domain,
    item: string,
    type: Type
  ): Origin => {
    const key = option + '_' + domain + '_' + item + '_' + type
    return this.actions[key] === undefined
      ? this.getEstimationOrigin(domain, item, type)
      : 'action'
  }

  /**
   * 活動量、GHG原単位の推定値を列挙する
   * @returns 推定値の一覧
   */
  public readonly enumerateEstimations = (): Item[] =>
    Object.values(this.estimations)

  /**
   * 改善アクションを列挙する
   * @param option 改善アクションの種類
   * @returns 改善アクションの一覧
   */
  public readonly enumerateActions = (option?: string): Action[] =>
    option === undefined
      ? Object.values(this.actions)
      : Object.values(this.actions).filter((a) => a.option === option)

  /**
   * ベースライン値を列挙する
   * @returns ベースライン値の一覧
   */
  public readonly enumerateBaselines = (): Item[] =>
    Object.values(this.baselines)

  /**
   * 移動に関する回答に対する推定値を更新する
   * @param answer 移動に関する回答
   * @param reset trueの場合は回答を上書きする
   */
  public readonly answerMobility = (
    answer: MobilityAnswer,
    reset: boolean = false
  ): void => {
    this.mobilityAnswer_ = reset
      ? { ...answer }
      : { ...this.mobilityAnswer_, ...answer }
    this.validate()
  }

  /**
   * 住居に関する回答に対する推定値を更新する
   * @param answer 住居に関する回答
   * @param reset trueの場合は回答を上書きする
   */
  public readonly answerHousing = (
    answer: HousingAnswer,
    reset: boolean = false
  ): void => {
    this.housingAnswer_ = reset
      ? { ...answer }
      : { ...this.housingAnswer_, ...answer }
    this.validate()
  }

  /**
   * 食に関する回答に対する推定値を更新する
   * @param answer 食に関する回答
   * @param reset trueの場合は回答を上書きする
   */
  public readonly answerFood = (
    answer: FoodAnswer,
    reset: boolean = false
  ): void => {
    this.foodAnswer_ = reset
      ? { ...answer }
      : { ...this.foodAnswer_, ...answer }
    this.validate()
  }

  /**
   * モノとサービスに関する回答に対する推定値を更新する
   * @param answer モノとサービスに関する回答
   * @param reset trueの場合は回答を上書きする
   */
  public readonly answerOther = (
    answer: OtherAnswer,
    reset: boolean = false
  ): void => {
    this.otherAnswer_ = reset
      ? { ...answer }
      : { ...this.otherAnswer_, ...answer }
    this.validate()
  }
}
