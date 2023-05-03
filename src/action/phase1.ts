//
// Phase 1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
//

import {
  type CarCharging,
  type CarPassengers,
  type CarType,
  type ElectricityType,
  type FoodDirectWasteFrequency,
  type FoodLeftoverFrequency,
  type HousingInsulation
} from '../common'
import { getParameter } from '../data'
import { estimateFoodLossRate } from '../food/rate-calculation'
import { estimateCarDrivingIntensityFactor } from '../mobility'

/**
 * [削減後] = [target] 選択肢を最大限採用した場合に理論的に到達できる絶対値を指定
 * 例）テレワークを最大限実施した場合、通勤分のみ削減される
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * @param target 削減後の絶対値を指定
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const absoluteTarget = (target: number): number => target

/**
 * [削減後] = [削減前(base)] x (1+[rate])
 * 例）テレワークを最大限実施した場合、通勤分のみ削減される
 * その選択肢を最大限採用した場合に削減が可能な割合を指定（rate < 0で削減、rate > 0で増加）
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * @param base 削減前の値
 * @param rate 削減比率
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const increaseRate = (base: number, rate: number): number =>
  base * (1 + rate)

/**
 * [削減後] = [削減前(base)] x ([推定値を算出した質問票回答の値]/[passengersAfterActionで指定した絶対値])
 * 例）ライドシェアリングにより自家用車の乗車人数が質問票で把握した人数から4人に増加した場合、
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * option: rideshare, operation: question-answer-to-target-inverse,
 * args: mobility_taxi-car-passengers に特化した実装
 * @privateRemarks JibungotoPlanet-Backendの初期バージョンではquestionAnswerToTargetInverse
 * 原単位の変化としてはこれらの比率の逆数として計算される
 * @param base 削減前の値
 * @param passengersAfterAction 削減後の乗車人数
 * @param baseCarPassengers 削減前平均乗車人数
 * @returns GHG原単位
 */
export const drivingIntensityToTaxiRideshare = (
  base: number,
  passengersAfterAction: number,
  baseCarPassengers: CarPassengers
): number => {
  const passengersBeforeAction = getParameter(
    'car-passengers',
    baseCarPassengers + '_taxi-passengers'
  ).value
  return (base * passengersBeforeAction) / passengersAfterAction
}

/**
 * [削減後] = [削減前(base)] x ([推定値を算出した質問票回答の値]/[passengersAfterActionで指定した絶対値])
 * 例）ライドシェアリングにより自家用車の乗車人数が質問票で把握した人数から4人に増加した場合、
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * option: rideshare, operation: question-answer-to-target-inverse,
 * args: mobility_private-car-passengers に特化した実装
 * 原単位の変化としてはこれらの比率の逆数として計算される
 * @privateRemarks JibungotoPlanet-Backendの初期バージョンではquestionAnswerToTargetInverse
 * @param base 削減前の値
 * @param passengersAfterAction 削減後の乗車人数
 * @param baseCarPassengers 削減前平均乗車人数
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const drivingIntensityToPrivateCarRideshare = (
  base: number,
  passengersAfterAction: number,
  baseCarPassengers: CarPassengers
): number => {
  const passengersBeforeAction = getParameter(
    'car-passengers',
    baseCarPassengers + '_private-car-passengers'
  ).value
  return (base * passengersBeforeAction) / passengersAfterAction
}

/**
 * [削減後] = [削減前(base)] x ([valueAfterActionで指定した絶対値]/[推定値を算出した質問票回答の値])
 * フットプリント推計に用いた質問票回答のパラメーターがある絶対値へ変化する
 * 例）EV・PHVの導入により自家用車の排出原単位が質問票で把握した値から約0.084に増加
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * option: loss, operation: question-answer-to-target,
 * args: food_food-amount-to-average に特化した実装
 * @privateRemarks JibungotoPlanet-Backendの初期バージョンではquestionAnswerToTarget
 * @param base 削減前の値
 * @param valueAfterAction 削減後の削減後の質問票の回答の値の絶対値
 * @param foodDirectWaste
 * @param foodLeftover
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const foodAmountToAverageWithoutFoodLoss = (
  base: number,
  valueAfterAction: number,
  foodDirectWaste: FoodDirectWasteFrequency,
  foodLeftover: FoodLeftoverFrequency
): number => {
  const valueBeforeAction = estimateFoodLossRate(foodDirectWaste, foodLeftover)
  return (base * valueAfterAction) / valueBeforeAction
}

/**
 * [削減後] = [削減前(base)] x ([valueAfterActionで指定した絶対値]/[推定値を算出した質問票回答の値])
 * フットプリント推計に用いた質問票回答のパラメーターがある絶対値へ変化する
 * 例）EV・PHVの導入により自家用車の排出原単位が質問票で把握した値から約0.084に増加
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * option: car-ev-phv, car-ev-phv-re, operation: question-answer-to-target,
 * args: mobility_driving-intensity に特化した実装
 * @privateRemarks JibungotoPlanet-Backendの初期バージョンではquestionAnswerToTarget
 * @param base 削減前の値
 * @param valueAfterAction 削減後の削減後の質問票の回答の値の絶対値
 * @param carType
 * @param carCharging
 * @param electricityType
 * @returns 削減後のGHG原単位
 */
export const drivingIntensityToEvPhv = (
  base: number,
  valueAfterAction: number,
  carType: CarType,
  carCharging: CarCharging,
  electricityType: ElectricityType
): number => {
  const valueBeforeAction = estimateCarDrivingIntensityFactor(
    carType,
    carCharging,
    electricityType,
    'intensity'
  )
  return (base * valueAfterAction) / valueBeforeAction
}

/**
 * [削減後] = [削減前(base)] x ([valueAfterActionで指定した絶対値]/[推定値を算出した質問票回答の値])
 * フットプリント推計に用いた質問票回答のパラメーターがある絶対値へ変化する
 * 例）EV・PHVの導入により自家用車の排出原単位が質問票で把握した値から約0.084に増加
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * option: car-ev-phv, car-ev-phv-re, operation: question-answer-to-target,
 * args: mobility_manufacturing-intensity に特化した実装
 * @privateRemarks JibungotoPlanet-Backendの初期バージョンではquestionAnswerToTarget
 * @param base 削減前の値
 * @param valueAfterAction 削減後の削減後の質問票の回答の値の絶対値
 * @param carType
 * @returns 削減後のGHG原単位
 */
export const manufacturingIntensityToEvPhv = (
  base: number,
  valueAfterAction: number,
  carType: CarType
): number => {
  const valueBeforeAction = getParameter(
    'car-intensity-factor',
    carType + '_manufacturing-intensity'
  ).value
  return (base * valueAfterAction) / valueBeforeAction
}

/**
 * [削減後] = [削減前] x (1+[推定値を算出した質問票回答からの削減率] x [reductionRateで指定した影響割合])
 * 削減効果推定用の追加質問回答から求めた削減率の分だけ、一部(reductionRate)が削減される
 * 例）現在の住居の断熱基準に依存する削減率の分だけ、電力のうち冷暖房分が削減される
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * insrenovのhousing_housing-insulation-renovationで適用
 * @privateRemarks JibungotoPlanet-Backendの初期バージョンではquestionReductionRate
 * @param base 削減前の値
 * @param reductionRate 削減の影響割合
 * @param housingInsulation リノベーションによる家の断熱
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const housingInsulationRenovation = (
  base: number,
  reductionRate: number,
  housingInsulation: HousingInsulation
): number => {
  const renovationHousingInsulation = getParameter(
    'housing-insulation',
    housingInsulation + '_renovation'
  ).value
  return base * (1 + reductionRate * renovationHousingInsulation)
}

/**
 * [削減後] = [削減前] x (1+[推定値を算出した質問票回答からの削減率] x [reductionRateで指定した影響割合])。
 * 削減効果推定用の追加質問回答から求めた削減率の分だけ、一部(reductionRate)が削減される。
 * 例）現在の住居の断熱基準に依存する削減率の分だけ、電力のうち冷暖房分が削減される。
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * clothes-homeのhousing_housing-insulation-clothingで適用
 * @privateRemarks JibungotoPlanet-Backendの初期バージョンではquestionReductionRate
 * @param base 削減前の値
 * @param reductionRate 削減の影響割合
 * @param housingInsulation 厚着による家の断熱
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const housingInsulationClothing = (
  base: number,
  reductionRate: number,
  housingInsulation: HousingInsulation
): number => {
  const clothingHousingInsulation = getParameter(
    'housing-insulation',
    housingInsulation + '_clothing'
  ).value
  return base * (1 + reductionRate * clothingHousingInsulation)
}

/**
 * [削減後] = [削減前] x (1+[推定値を算出した質問票回答からの削減率] x [reductionRateで指定した影響割合])。
 * 削減効果推定用の追加質問回答から求めた削減率の分だけ、一部(reductionRate)が削減される。
 * 例）現在の住居の断熱基準に依存する削減率の分だけ、電力のうち冷暖房分が削減される。
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * @see housingInsulationClothing
 * @see housingInsulationRenovation
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const questionReductionRate = ({
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

/**
 * [削減後] = [削減前(base)] x ([valueAfterActionで指定した絶対値]/[推定値を算出した質問票回答の値])
 * フットプリント推計に用いた質問票回答のパラメーターがある絶対値へ変化する
 * 例）EV・PHVの導入により自家用車の排出原単位が質問票で把握した値から約0.084に増加
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * @see foodAmountToAverageWithoutFoodLoss
 * @see drivingIntensityToEvPhv
 * @see manufacturingIntensityToEvPhv
 * @returns 削減後のGHG原単位
 */
export const questionAnswerToTarget = ({
  base,
  target,
  valueAfterAction,
  foodDirectWaste,
  foodLeftover,
  carType,
  carCharging,
  electricityType
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

/**
 * [削減後] = [削減前(base)] x ([推定値を算出した質問票回答の値]/[passengersAfterActionで指定した絶対値])
 * 例）ライドシェアリングにより自家用車の乗車人数が質問票で把握した人数から4人に増加した場合、
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * @see drivingIntensityToTaxiRideshare
 * @see drivingIntensityToPrivateCarRideshare
 * @returns GHG原単位
 */
export const questionAnswerToTargetInverse = ({
  base,
  target,
  valueAfterAction,
  carPassengers
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
