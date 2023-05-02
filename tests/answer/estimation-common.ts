import { type Domain } from '../../src/common'
import { type Item } from '../../src/entity'
import { type TestCase } from './util'

export const testEstimation = (
  domain: Domain,
  testCase: TestCase,
  estimations: readonly Item[],
  baselines: readonly Item[],
  originalBaselines: readonly Item[]
): void => {
  for (const estimation of estimations.filter(
    (e: any) => e.domain === domain
  )) {
    const exp = testCase.expectations.find(
      (e) =>
        e.domain === estimation.domain &&
        e.item === estimation.item &&
        e.type === estimation.type
    )

    // console.log(estimation, exp)

    expect(exp).not.toBeNull()
    expect(exp?.estimated).toBeTruthy()
    expect(estimation.value).toBeCloseTo(exp != null ? exp.value : NaN)
  }

  // estimationに重複がないことを確認
  for (let i = 0; i < estimations.length; ++i) {
    for (let j = i + 1; j < estimations.length; ++j) {
      expect(
        estimations[i].domain + estimations[i].item + estimations[i].type
      ).not.toBe(
        estimations[j].domain + estimations[j].item + estimations[j].type
      )
    }
  }

  // expectationがestimatedになっている場合、estimationに値があるかを確認
  for (const exp of testCase.expectations) {
    const estimation = estimations.find(
      (e) =>
        e.domain === exp.domain && e.item === exp.item && e.type === exp.type
    )
    /*
    console.log('estimation: ')
    console.log(estimation)
    console.log('exp: ')
    console.log(exp)
    */

    expect(Boolean(estimation)).toBe(exp.estimated)
  }

  // estimationsとbaselinesの値を合成し、結果が合っているかを確認。
  for (const exp of testCase.expectations) {
    const estimation = estimations.find(
      (e) =>
        e.domain === exp.domain && e.item === exp.item && e.type === exp.type
    )
    const baseline = baselines.find(
      (b) =>
        b.domain === exp.domain && b.item === exp.item && b.type === exp.type
    )
    const result = estimation ?? baseline
    expect(result?.value).toBeCloseTo(exp.value)
  }

  // baselineが間違って書き換えられていないかを確認
  for (const baseline of baselines.filter((b) => b.domain === domain)) {
    const org = originalBaselines.find(
      (b) =>
        b.domain === baseline.domain &&
        b.item === baseline.item &&
        b.type === baseline.type
    )

    expect(baseline.value).toBeCloseTo(org !== undefined ? org.value : NaN)
  }
}
