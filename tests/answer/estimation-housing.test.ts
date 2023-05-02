import xlsx from 'xlsx'
import { Diagnosis } from '../../src/answer/diagnosis'
import { enumerateBaselines } from '../../src/data'
import { toHousingAnswer } from './answer-converter'
import { testEstimation } from './estimation-common'
import { createTestCases } from './util'

/** テスト */
const domain = 'housing'
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
      const housingAnswer = toHousingAnswer(testCase.answers)
      diagnosis.answerHousing(housingAnswer)

      testEstimation(
        domain,
        testCase,
        diagnosis.enumerateEstimations(false),
        diagnosis.enumerateBaselines(),
        originalBaselines
      )
    })
  }
})
