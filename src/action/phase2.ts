//
// Phase 2: 他の項目の削減量を参照して削減量を計算する施策（その1）
//

import { type Domain, type Type } from '../common'

/**
 * [削減後] = [削減前] + Σ([他の項目の削減後]-[他の項目の削減前]) x [substitutionRateで指定した代替率]
 * 他の項目の削減分が代替率(substitutionRate)を掛け算した分だけその項目に転換される
 * 例）カーシェアリングにより自家用車の移動距離が削減された分、カーシェアリングの距離が増加する
 * @remarks Phase2: Phase 1の削減施策の計算結果に依存した削減施策
 * @param base 削減前の値
 * @param option 他の削減施策
 * @param domainItemTypes 転換する他の項目
 * @param substitutionRate 代替率
 * @param findEstimationOrDefault 活動量、GHG原単位の推定値を取得する（推定値がない場合はベースライン値を返す）
 * @param findActionOrDefault 削減施策後の活動量、GHG原単位を取得する（削減後の値がない場合は、推定値、ベースライン値を返す）
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const shiftFromOtherItems = (
  base: number,
  option: string,
  domainItemTypes: readonly string[],
  substitutionRate: number,
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
  const sum = domainItemTypes.reduce((sum, key) => {
    const [domain, item, type] = key.split('_')
    return (
      sum +
      findActionOrDefault(option, domain as Domain, item, type as Type) -
      findEstimationOrDefault(domain as Domain, item, type as Type)
    )
  }, 0)
  return base - sum * substitutionRate
}

/**
 * [削減後] = [削減前(base)] / (電力の一次エネルギー換算係数 - Σ([他の項目の削減後]-[他の項目の削減前])
 *  x (1 + 省エネ化後の一次エネルギー消費量の削減率(２割減)) * 電力の一次エネルギー換算係数
 * @remarks Phase2: Phase 1の削減施策の計算結果に依存した削減施策
 * zehに特化した実装
 * @param base 削減前の値
 * @param option 転換する削減施策
 * @param domainItemTypes 転換する他の項目
 * @param conversionFactor 電力の一次エネルギー換算係数
 * @param reductionRate 省エネ化後の一次エネルギー消費量の削減率（２割減=-0.2）
 * @param findEstimationOrDefault 活動量、GHG原単位の推定値を取得する（推定値がない場合はベースライン値を返す）
 * @param findActionOrDefault 削減施策後の活動量、GHG原単位を取得する（削減後の値がない場合は、推定値、ベースライン値を返す）
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const shiftFromOtherItemsThenReductionRate = (
  base: number,
  option: string,
  domainItemTypes: readonly string[],
  conversionFactor: number,
  reductionRate: number,
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
  const sum = domainItemTypes.reduce((sum, key) => {
    const [domain, item, type] = key.split('_')
    return (
      sum +
      findActionOrDefault(option, domain as Domain, item, type as Type) -
      findEstimationOrDefault(domain as Domain, item, type as Type)
    )
  }, 0)
  return (
    (base / conversionFactor - sum) * (1 + reductionRate) * conversionFactor
  )
}
