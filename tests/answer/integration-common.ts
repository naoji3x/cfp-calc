import xlsx from 'xlsx'
import { Diagnosis } from '../../src/answer/diagnosis'
import { enumerateBaselines } from '../../src/data'
import { type Item } from '../../src/entity'
import {
  toFoodAnswer,
  toHousingAnswer,
  toMobilityAnswer,
  toOtherAnswer
} from './answer-converter'
// import { testEstimation } from './integration-common'
import { createTestCases, type TestCase } from './util'

export const testIntegration = (name: string): void => {
  // テストケースを記載したExcel
  const workbook = xlsx.readFile(
    'tests/answer/case/integration-' + name + '.test-cases.xlsx'
  )
  const testCases = createTestCases(workbook)
  const diagnosis = new Diagnosis()
  const originalBaselines = enumerateBaselines()

  // 生成したDiagnosisに対してテストケースを順番に適用
  for (const testCase of testCases) {
    test(`Estimation: ${testCase.case}`, () => {
      const answers = testCase.answers
      const housingAnswer = toHousingAnswer(answers)
      const mobilityAnswer = toMobilityAnswer(answers)
      const foodAnswer = toFoodAnswer(answers)
      const otherAnswer = toOtherAnswer(answers)

      if (answers.find((a) => a.answer === 'housingAnswer') !== undefined) {
        diagnosis.answerHousing(housingAnswer)
      }
      if (answers.find((a) => a.answer === 'mobilityAnswer') !== undefined) {
        diagnosis.answerMobility(mobilityAnswer)
      }
      if (answers.find((a) => a.answer === 'foodAnswer') !== undefined) {
        diagnosis.answerFood(foodAnswer)
      }
      if (answers.find((a) => a.answer === 'otherAnswer') !== undefined) {
        diagnosis.answerOther(otherAnswer)
      }

      testEstimation(
        testCase,
        diagnosis.enumerateEstimations(false),
        diagnosis.enumerateBaselines(),
        originalBaselines
      )
    })
  }
}

export const testEstimation = (
  testCase: TestCase,
  estimations: readonly Item[],
  baselines: readonly Item[],
  originalBaselines: readonly Item[]
): void => {
  for (const estimation of estimations) {
    const exp = testCase.expectations.find(
      (e) =>
        e.domain === estimation.domain &&
        e.item === estimation.item &&
        e.type === estimation.type
    )

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
  for (const baseline of baselines) {
    const org = originalBaselines.find(
      (b) =>
        b.domain === baseline.domain &&
        b.item === baseline.item &&
        b.type === baseline.type
    )

    expect(baseline.value).toBeCloseTo(org !== undefined ? org.value : NaN)
  }
}
