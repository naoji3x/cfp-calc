import {
  absoluteTarget,
  furtherReductionFromOtherFootprints,
  increaseRate,
  proportionalToOtherFootprints,
  proportionalToOtherItems,
  questionAnswerToTarget,
  questionAnswerToTargetInverse,
  questionReductionRate,
  reboundFromOtherFootprints,
  shiftFromOtherItems,
  shiftFromOtherItemsThenReductionRate
} from '../action'
import {
  type CarCharging,
  type CarPassengers,
  type CarType,
  type Domain,
  type ElectricityType,
  type FoodDirectWasteFrequency,
  type FoodLeftoverFrequency,
  type HousingInsulation,
  type Type
} from '../common'
import { enumerateOptions } from '../data'
import { type Action, type Item, type Option } from '../entity'

export interface ActionAnswer {
  readonly housingInsulation?: HousingInsulation
  readonly foodDirectWaste?: FoodDirectWasteFrequency
  readonly foodLeftover?: FoodLeftoverFrequency
  readonly carType?: CarType
  readonly carPassengers?: CarPassengers
  readonly carCharging?: CarCharging
  readonly electricityType?: ElectricityType
}

const phase1Operations = new Set([
  'absolute-target',
  'increase-rate',
  'reduction-rate',
  'question-reduction-rate',
  'question-answer-to-target',
  'question-answer-to-target-inverse'
])

const phase2Operations = new Set([
  'shift-from-other-items',
  'shift-from-other-items-then-reduction-rate'
])

const phase3Operations = new Set(['proportional-to-other-items'])

const phase4Operations = new Set([
  'further-reduction-from-other-footprints',
  'proportional-to-other-footprints',
  'rebound-from-other-footprints'
])

export const calculateActions = (
  {
    housingInsulation,
    foodDirectWaste,
    foodLeftover,
    carType,
    carCharging,
    electricityType,
    carPassengers
  }: ActionAnswer,
  /**
   * 活動量、GHG原単位の推定値を取得する（推定値がない場合はベースライン値を返す）
   * @param domain 活動量、GHG原単位を計算する領域
   * @param item 活動量、GHG原単位を取得する要素
   * @param type amount or intensity
   * @returns 推定値もしくはベースライン
   */
  findEstimationOrDefault: (domain: Domain, item: string, type: Type) => Item
): Action[] => {
  const actions: Action[] = []
  const options = enumerateOptions().filter(
    (o) => findEstimationOrDefault(o.domain, o.item, o.type) !== undefined
  )

  const addAction = (base: Item, option: Option, value: number): void => {
    if (isNaN(value)) {
      return
    }
    actions.push({
      option: option.option,
      domain: base.domain,
      subdomain: base.subdomain,
      item: base.item,
      type: base.type,
      unit: base.unit,
      value
    })
  }

  const phase1Options = options.filter((o) => phase1Operations.has(o.operation))
  const phase2Options = options.filter((o) => phase2Operations.has(o.operation))
  const phase3Options = options.filter((o) => phase3Operations.has(o.operation))
  const phase4Options = options.filter((o) => phase4Operations.has(o.operation))

  // Phase 1
  for (const option of phase1Options) {
    const base = findEstimationOrDefault(
      option.domain,
      option.item,
      option.type
    )
    switch (option.operation) {
      case 'absolute-target':
        addAction(base, option, absoluteTarget(option.values[0]))
        break
      case 'increase-rate':
      case 'reduction-rate':
        addAction(base, option, increaseRate(base.value, option.values[0]))
        break
      case 'question-reduction-rate':
        addAction(
          base,
          option,
          questionReductionRate({
            base: base.value,
            target: option.args[0],
            reductionRate: option.values[0],
            housingInsulation
          })
        )
        break
      case 'question-answer-to-target':
        addAction(
          base,
          option,
          questionAnswerToTarget({
            base: base.value,
            target: option.args[0],
            valueAfterAction: option.values[0],
            foodDirectWaste,
            foodLeftover,
            carType,
            carCharging,
            electricityType
          })
        )
        break

      case 'question-answer-to-target-inverse':
        addAction(
          base,
          option,
          questionAnswerToTargetInverse({
            base: base.value,
            target: option.args[0],
            valueAfterAction: option.values[0],
            carPassengers
          })
        )
        break
    }
  }

  const estimationValueOrDefault = (
    domain: Domain,
    item: string,
    type: Type
  ): number => findEstimationOrDefault(domain, item, type).value

  const actionValueOrDefault = (
    option: string,
    domain: Domain,
    item: string,
    type: Type
  ): number => {
    const action = actions.find(
      (a) =>
        a.domain === domain &&
        a.item === item &&
        a.type === type &&
        a.option === option
    )
    if (action !== undefined) {
      return action.value
    }
    return estimationValueOrDefault(domain, item, type)
  }

  // Phase 2
  for (const option of phase2Options) {
    const base = findEstimationOrDefault(
      option.domain,
      option.item,
      option.type
    )
    switch (option.operation) {
      case 'shift-from-other-items':
        addAction(
          base,
          option,
          shiftFromOtherItems(
            base.value,
            option.option,
            option.args,
            option.values[0],
            estimationValueOrDefault,
            actionValueOrDefault
          )
        )
        break

      case 'shift-from-other-items-then-reduction-rate':
        addAction(
          base,
          option,
          shiftFromOtherItemsThenReductionRate(
            base.value,
            option.option,
            option.args,
            option.values[0],
            option.values[1],
            estimationValueOrDefault,
            actionValueOrDefault
          )
        )
        break
    }
  }

  // Phase 3
  for (const option of phase3Options) {
    const base = findEstimationOrDefault(
      option.domain,
      option.item,
      option.type
    )
    if (option.operation === 'proportional-to-other-items') {
      addAction(
        base,
        option,
        proportionalToOtherItems(
          base.value,
          option.option,
          option.args,
          option.values[0],
          estimationValueOrDefault,
          actionValueOrDefault
        )
      )
    }
  }

  // Phase 4
  for (const option of phase4Options) {
    const baseAmount = findEstimationOrDefault(
      option.domain,
      option.item,
      'amount'
    )
    const baseIntensity = findEstimationOrDefault(
      option.domain,
      option.item,
      'intensity'
    )
    const base = option.type === 'amount' ? baseAmount : baseIntensity

    switch (option.operation) {
      case 'further-reduction-from-other-footprints':
        addAction(
          base,
          option,
          furtherReductionFromOtherFootprints(
            baseAmount.value,
            baseIntensity.value,
            option.type,
            option.option,
            option.args,
            option.values[0],
            estimationValueOrDefault,
            actionValueOrDefault
          )
        )
        break

      case 'proportional-to-other-footprints':
        addAction(
          base,
          option,
          proportionalToOtherFootprints(
            base.value,
            option.option,
            option.args,
            option.values[0],
            estimationValueOrDefault,
            actionValueOrDefault
          )
        )
        break

      case 'rebound-from-other-footprints':
        addAction(
          base,
          option,
          reboundFromOtherFootprints(
            baseAmount.value,
            baseIntensity.value,
            option.type,
            option.option,
            option.args,
            option.values[0],
            estimationValueOrDefault,
            actionValueOrDefault
          )
        )
        break
    }
  }

  return actions
}
