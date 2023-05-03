//
// Phase 3: 他の項目の削減量を参照して削減量を計算する施策（その２）
//

import { type Domain, type Type } from '../common'

/**
 * [削減後] = [削減前(base)] x (1-[rateで指定した影響割合])
 * + [削減前(base)] x [rateで指定した影響割合] x (Σ[他の項目の削減後] /Σ[他の項目の削減前])
 * 他の項目の削減の比率に従い、その項目の一部(rateで指定した影響割合）が削減される
 * 例）テレワークにより自動車移動距離が削減されると、維持管理・購入も同じ比率で削減
 * @remarks Phase3: Phase 1, 2の削減施策の計算結果に依存した削減施策
 * @param base 削減前の値
 * @param option 転換する削減施策
 * @param domainItemTypes 転換する他の項目
 * @param rate 影響割合
 * @param findEstimationOrDefault 活動量、GHG原単位の推定値を取得する（推定値がない場合はベースライン値を返す）
 * @param findActionOrDefault 削減施策後の活動量、GHG原単位を取得する（削減後の値がない場合は、推定値、ベースライン値を返す）
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const proportionalToOtherItems = (
  base: number,
  option: string,
  domainItemTypes: readonly string[],
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
  const sumBefore = domainItemTypes.reduce((sum, key) => {
    const [domain, item, type] = key.split('_')
    return sum + findEstimationOrDefault(domain as Domain, item, type as Type)
  }, 0)
  const sumAfter = domainItemTypes.reduce((sum, key) => {
    const [domain, item, type] = key.split('_')
    return (
      sum + findActionOrDefault(option, domain as Domain, item, type as Type)
    )
  }, 0)

  return sumBefore !== 0
    ? base * (1 - rate) + base * rate * (sumAfter / sumBefore)
    : base
}
