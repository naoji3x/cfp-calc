import {
  absoluteTarget,
  addAmount,
  drivingIntensityToEvPhv,
  drivingIntensityToPrivateCarRideshare,
  drivingIntensityToTaxiRideshare,
  foodAmountToAverageWithoutFoodLoss,
  furtherReductionFromOtherFootprints,
  housingInsulationClothing,
  housingInsulationRenovation,
  increaseRate,
  manufacturingIntensityToEvPhv,
  proportionalToOtherFootprints,
  proportionalToOtherItems,
  reboundFromOtherFootprints,
  shiftFromOtherItems,
  shiftFromOtherItemsThenReductionRate,
  type Search
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
  'add-amount',
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
  findEstimation: (domain: Domain, item: string, type: Type) => Item
): Action[] => {
  const actions: Action[] = []
  const options = enumerateOptions().filter(
    (o) => findEstimation(o.domain, o.item, o.type) !== undefined
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
    const base = findEstimation(option.domain, option.item, option.type)
    switch (option.operation) {
      case 'absolute-target':
        addAction(base, option, absoluteTarget(option.values[0]))
        break
      case 'add-amount':
        addAction(base, option, addAmount(base.value, option.values[0]))
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
  class SearchImpl implements Search {
    findAction = (
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
      return findEstimation(domain, item, type).value
    }

    findEstimation = (domain: Domain, item: string, type: Type): number => {
      return findEstimation(domain, item, type).value
    }
  }
  const searchImpl = new SearchImpl()

  // Phase 2
  for (const option of phase2Options) {
    const base = findEstimation(option.domain, option.item, option.type)
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
            searchImpl
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
            searchImpl
          )
        )
        break
    }
  }

  // Phase 3
  for (const option of phase3Options) {
    const base = findEstimation(option.domain, option.item, option.type)
    if (option.operation === 'proportional-to-other-items') {
      addAction(
        base,
        option,
        proportionalToOtherItems(
          base.value,
          option.option,
          option.args,
          option.values[0],
          searchImpl
        )
      )
    }
  }

  // Phase 4
  for (const option of phase4Options) {
    const baseAmount = findEstimation(option.domain, option.item, 'amount')
    const baseIntensity = findEstimation(
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
            searchImpl
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
            searchImpl
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
            searchImpl
          )
        )
        break
    }
  }

  return actions
}
const questionReductionRate = ({
  base,
  target,
  reductionRate,
  housingInsulation
}: {
  base: number
  target: string
  reductionRate: number
  housingInsulation?: HousingInsulation
}): number => {
  housingInsulation ??= 'unknown'
  if (target === 'housing_housing-insulation-renovation') {
    return housingInsulationRenovation(base, reductionRate, housingInsulation)
  } else if (target === 'housing_housing-insulation-clothing') {
    return housingInsulationClothing(base, reductionRate, housingInsulation)
  }
  return NaN
}

const questionAnswerToTarget = ({
  base,
  target,
  valueAfterAction,
  foodDirectWaste = undefined,
  foodLeftover = undefined,
  carType = undefined,
  carCharging = undefined,
  electricityType = undefined
}: {
  base: number
  target: string
  valueAfterAction: number
  foodDirectWaste?: FoodDirectWasteFrequency
  foodLeftover?: FoodLeftoverFrequency
  carType?: CarType
  carCharging?: CarCharging
  electricityType?: ElectricityType
}): number => {
  if (target === 'food_food-amount-to-average') {
    if (foodDirectWaste !== undefined && foodLeftover !== undefined) {
      return foodAmountToAverageWithoutFoodLoss(
        base,
        valueAfterAction,
        foodDirectWaste,
        foodLeftover
      )
    }
  } else if (target === 'mobility_driving-intensity') {
    if (carType !== undefined) {
      carCharging ??= 'unknown'
      electricityType ??= 'unknown'
      return drivingIntensityToEvPhv(
        base,
        valueAfterAction,
        carType,
        carCharging,
        electricityType
      )
    }
  } else if (target === 'mobility_manufacturing-intensity') {
    if (carType !== undefined) {
      return manufacturingIntensityToEvPhv(base, valueAfterAction, carType)
    }
  }
  return NaN
}

const questionAnswerToTargetInverse = ({
  base,
  target,
  valueAfterAction,
  carPassengers = undefined
}: {
  base: number
  target: string
  valueAfterAction: number
  carPassengers?: CarPassengers
}): number => {
  if (carPassengers !== undefined) {
    if (target === 'mobility_taxi-car-passengers') {
      return drivingIntensityToTaxiRideshare(
        base,
        valueAfterAction,
        carPassengers
      )
    } else if (target === 'mobility_private-car-passengers') {
      return drivingIntensityToPrivateCarRideshare(
        base,
        valueAfterAction,
        carPassengers
      )
    }
  }
  return NaN
}
