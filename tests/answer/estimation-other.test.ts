import xlsx from 'xlsx'
import { type OtherAnswer } from '../../src/answer/answer'
import { Diagnosis } from '../../src/answer/diagnosis'
import { enumerateBaselines } from '../../src/data'
import { toOtherAnswer } from './answer-converter'
import { testEstimation } from './estimation-common'
import { createTestCases } from './util'

/** テスト */
const domain = 'other'
describe(`Test ${domain} estimations`, () => {
  // テストケースを記載したExcel
  const workbook = xlsx.readFile(
    'tests/answer/case/estimation-' + domain + '.test-cases.xlsx'
  )
  const testCases = createTestCases(workbook)
  const diagnosis = new Diagnosis()
  const originalBaselines = enumerateBaselines()

  // 生成したDiagnosisに対してテストケースを順番に適用
  for (const testCase of testCases) {
    test(`Estimation: ${testCase.case}`, () => {
      const otherAnswer = toOtherAnswer(testCase.answers)
      diagnosis.answerOther(otherAnswer)

      testEstimation(
        testCase,
        diagnosis.enumerateEstimations(),
        diagnosis.enumerateBaselines(),
        originalBaselines
      )
    })
  }
})

describe(`Extra test ${domain} estimations`, () => {
  test('property', () => {
    const diagnosis = new Diagnosis()
    const answer1: OtherAnswer = { travelExpenses: 'unknown' }
    diagnosis.answerOther(answer1)
    expect(diagnosis.otherAnswer).toStrictEqual(answer1)
    const answer2: OtherAnswer = { serviceExpenses: 'unknown' }
    diagnosis.answerOther(answer2)
    expect(diagnosis.otherAnswer).toStrictEqual({ ...answer1, ...answer2 })
    diagnosis.answerOther({}, true)
    expect(diagnosis.otherAnswer).toStrictEqual({})
  })
})
