import { type Action, type Footprint, type Item } from 'entity'
import { type Domain, type Type } from '../common'
import { enumerateBaselines } from '../data'
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

  private mobilityAnswer: MobilityAnswer = {}
  private housingAnswer: HousingAnswer = {}
  private foodAnswer: FoodAnswer = {}
  private otherAnswer: OtherAnswer = {}

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
    let mobilityAnswer = this.mobilityAnswer
    let housingAnswer = this.housingAnswer
    const foodAnswer = this.foodAnswer
    let otherAnswer = this.otherAnswer

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
        ...this.otherAnswer,
        residentCount: this.housingAnswer.residentCount
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
    this.addActions(calculateActions(param, this.findEstimation))
  }

  /**
   * 活動量、GHG原単位の推定値を取得する（推定値がない場合はベースライン値を返す）
   * @param domain 活動量、GHG原単位を計算する領域
   * @param item 活動量、GHG原単位を取得する要素
   * @param type amount or intensity
   * @returns 活動量もしくはGHG原単位（推定値、ベースライン値ともない場合はNaNを返す）
   */
  public readonly findEstimation = (
    domain: Domain,
    item: string,
    type: Type,
    fallback = true
  ): Item => {
    const key = domain + '_' + item + '_' + type
    const estimation = this.estimations[key]
    if (fallback && estimation === undefined) {
      return this.baselines[key]
    }
    return estimation
  }

  public readonly enumerateEstimations = (): Item[] =>
    Object.values(this.estimations)

  public readonly enumerateActions = (option: string): Action[] =>
    Object.values(this.actions).filter((a) => a.option === option)

  public readonly enumerateBaselines = (): Item[] =>
    Object.values(this.baselines)

  public readonly answerMobility = (
    answer: MobilityAnswer,
    reset: boolean = false
  ): void => {
    this.mobilityAnswer = reset
      ? { ...answer }
      : { ...this.mobilityAnswer, ...answer }
    this.validate()
  }

  public readonly answerHousing = (
    answer: HousingAnswer,
    reset: boolean = false
  ): void => {
    this.housingAnswer = reset
      ? { ...answer }
      : { ...this.housingAnswer, ...answer }
    this.validate()
  }

  public readonly answerFood = (
    answer: FoodAnswer,
    reset: boolean = false
  ): void => {
    this.foodAnswer = reset ? { ...answer } : { ...this.foodAnswer, ...answer }
    this.validate()
  }

  public readonly answerOther = (
    answer: OtherAnswer,
    reset: boolean = false
  ): void => {
    this.otherAnswer = reset
      ? { ...answer }
      : { ...this.otherAnswer, ...answer }
    this.validate()
  }
}
