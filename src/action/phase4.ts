import { type Domain, type Type } from '../common'

//
// Phase 4 他の項目のフットプリント（amount x intensity）の削減量を参照して削減量を計算する施策
//

/**
 * [削減後] = [削減前(base)] x (1-[rateで指定した影響割合])
 *  + [削減前(base)] x [value2で指定した影響割合] x ([valueで指定したフットプリントの削減後] / [valueで指定したフットプリントの削減前])
 * 他の複数項目のフットプリントの合計の前後比に従い削減比率(rateの割合)が増減
 * 例）菜食により自炊の食材構成が変化すると、自炊食材のフットプリントと同じ比率で惣菜・外食も削減
 * @remarks Phase4: 他の項目のフットプリント（amount x intensity）の削減量を参照して削減量を計算する施策
 * @param base 削減前の値
 * @param option 他の削減施策
 * @param domainItems 他のフットプリント項目
 * @param rate 削減割合
 * @param findEstimationOrDefault 活動量、GHG原単位の推定値を取得する（推定値がない場合はベースライン値を返す）
 * @param findActionOrDefault 削減施策後の活動量、GHG原単位を取得する（削減後の値がない場合は、推定値、ベースライン値を返す）
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const proportionalToOtherFootprints = (
  base: number,
  option: string,
  domainItems: readonly string[],
  rate: number,
  /**
   * 活動量、GHG原単位の推定値を取得する（推定値がない場合はベースライン値を返す）
   * @param domain 活動量、GHG原単位を計算する領域
   * @param item 活動量、GHG原単位を取得する要素
   * @param type amount or intensity
   * @returns 活動量もしくはGHG原単位（推定値、ベースライン値ともない場合はNaNを返す）
   */
  findEstimationOrDefault: (domain: Domain, item: string, type: Type) => number,
  /**
   * 削減施策後の活動量、GHG原単位を取得する（削減後の値がない場合は、推定値、ベースライン値を返す）
   * @param option 削減施策
   * @param domain 活動量、GHG原単位を計算する領域
   * @param item 活動量、GHG原単位を取得する要素
   * @param type amount or intensity
   * @returns 活動量もしくはGHG原単位（削減後の値、推定値、ベースライン値がない場合はNaNを返す）
   */
  findActionOrDefault: (
    option: string,
    domain: Domain,
    item: string,
    type: Type
  ) => number
): number => {
  let sumBefore = 0
  let sumAfter = 0

  for (const key of domainItems) {
    const [domain, item] = key.split('_')
    const ab = findEstimationOrDefault(domain as Domain, item, 'amount') // amountBefore
    const aa = findActionOrDefault(option, domain as Domain, item, 'amount') // amountAfter

    const ib = findEstimationOrDefault(domain as Domain, item, 'intensity') // intensityBefore
    const ia = findActionOrDefault(option, domain as Domain, item, 'intensity') // intensityAfter

    sumBefore += ab * ib
    sumAfter += aa * ia
  }
  return base * (1 - rate) + base * rate * (sumAfter / sumBefore)
}

/**
 * [削減後] = [削減前(base)] +
 * (Σ[他のフットプリントの削減後] - Σ[他のフットプリントの削減前])
 * x [リバウンド割合(reboundRate)] ※sign=1で排出増加(リバウンド) sign=-1で排出削減(相乗効果)
 * 他の複数項目のフットプリントの合計の削減分の一部(reboundRateの割合)が増加
 * 例）断熱リノベーションによりエネルギー消費量が削減されるが、その一部は建設・維持管理のために増加
 * @remarks Phase4: 他の項目のフットプリント（amount x intensity）の削減量を参照して削減量を計算する施策
 * @param baseAmount 削減前の活動量
 * @param baseIntensity 削減前のGHG原単位
 * @param type 計算対象のタイプ(amount(活動量)/intensity(GHG原単位))
 * @param option 他の削減施策
 * @param domainItems 他のフットプリント項目
 * @param reboundRate リバウンド割合
 * @param findEstimationOrDefault 活動量、GHG原単位の推定値を取得する（推定値がない場合はベースライン値を返す）
 * @param findActionOrDefault 削減施策後の活動量、GHG原単位を取得する（削減後の値がない場合は、推定値、ベースライン値を返す）
 * @param sign -1 排出削減、1:リバウンド
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const furtherReductionFromOtherFootprints = (
  baseAmount: number,
  baseIntensity: number,
  type: 'amount' | 'intensity',
  option: string,
  domainItems: readonly string[],
  reboundRate: number,
  /**
   * 活動量、GHG原単位の推定値を取得する（推定値がない場合はベースライン値を返す）
   * @param domain 活動量、GHG原単位を計算する領域
   * @param item 活動量、GHG原単位を取得する要素
   * @param type amount or intensity
   * @returns 活動量もしくはGHG原単位（推定値、ベースライン値ともない場合はNaNを返す）
   */
  findEstimationOrDefault: (domain: Domain, item: string, type: Type) => number,
  /**
   * 削減施策後の活動量、GHG原単位を取得する（削減後の値がない場合は、推定値、ベースライン値を返す）
   * @param option 削減施策
   * @param domain 活動量、GHG原単位を計算する領域
   * @param item 活動量、GHG原単位を取得する要素
   * @param type amount or intensity
   * @returns 活動量もしくはGHG原単位（削減後の値、推定値、ベースライン値がない場合はNaNを返す）
   */
  findActionOrDefault: (
    option: string,
    domain: Domain,
    item: string,
    type: Type
  ) => number,
  sign: -1 | 1 = -1
): number => {
  let sumBefore = 0
  let sumAfter = 0
  for (const key of domainItems) {
    const [domain, item] = key.split('_')
    const ab = findEstimationOrDefault(domain as Domain, item, 'amount') // amountBefore
    const aa = findActionOrDefault(option, domain as Domain, item, 'amount') // amountAfter
    const ib = findEstimationOrDefault(domain as Domain, item, 'intensity') // intensityBefore
    const ia = findActionOrDefault(option, domain as Domain, item, 'intensity') // intensityAfter

    sumBefore += ab * ib
    sumAfter += aa * ia
  }

  const numerator = sign * (sumAfter - sumBefore) * reboundRate
  return type === 'amount'
    ? baseAmount + numerator / baseIntensity
    : baseIntensity + numerator / baseAmount
}

/**
 * [削減後] = [削減前(base)] +
 * (Σ[他のフットプリントの削減後] - Σ[他のフットプリントの削減前])
 * x [リバウンド割合(reboundRate)]
 * 他の複数項目のフットプリントの合計の削減分の一部(reboundRateの割合)が増加
 * 例）断熱リノベーションによりエネルギー消費量が削減されるが、その一部は建設・維持管理のために増加
 * @remarks Phase4: 他の項目のフットプリント（amount x intensity）の削減量を参照して削減量を計算する施策
 * @param baseAmount 削減前の活動量
 * @param baseIntensity 削減前のGHG原単位
 * @param type 計算対象のタイプ(amount(活動量)/intensity(GHG原単位))
 * @param option 他の削減施策
 * @param domainItems 他のフットプリント項目
 * @param reboundRate リバウンド割合
 * @param findEstimationOrDefault 活動量、GHG原単位の推定値を取得する（推定値がない場合はベースライン値を返す）
 * @param findActionOrDefault 削減施策後の活動量、GHG原単位を取得する（削減後の値がない場合は、推定値、ベースライン値を返す）
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const reboundFromOtherFootprints = (
  baseAmount: number,
  baseIntensity: number,
  type: 'amount' | 'intensity',
  option: string,
  domainItems: readonly string[],
  reboundRate: number,
  /**
   * 活動量、GHG原単位の推定値を取得する（推定値がない場合はベースライン値を返す）
   * @param domain 活動量、GHG原単位を計算する領域
   * @param item 活動量、GHG原単位を取得する要素
   * @param type amount or intensity
   * @returns 活動量もしくはGHG原単位（推定値、ベースライン値ともない場合はNaNを返す）
   */
  findEstimationOrDefault: (domain: Domain, item: string, type: Type) => number,
  /**
   * 削減施策後の活動量、GHG原単位を取得する（削減後の値がない場合は、推定値、ベースライン値を返す）
   * @param option 削減施策
   * @param domain 活動量、GHG原単位を計算する領域
   * @param item 活動量、GHG原単位を取得する要素
   * @param type amount or intensity
   * @returns 活動量もしくはGHG原単位（削減後の値、推定値、ベースライン値がない場合はNaNを返す）
   */
  findActionOrDefault: (
    option: string,
    domain: Domain,
    item: string,
    type: Type
  ) => number
): number =>
  furtherReductionFromOtherFootprints(
    baseAmount,
    baseIntensity,
    type,
    option,
    domainItems,
    reboundRate,
    findEstimationOrDefault,
    findActionOrDefault,
    1
  )
