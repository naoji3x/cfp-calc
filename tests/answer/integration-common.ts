import xlsx from 'xlsx'
import { Diagnosis } from '../../src/answer/diagnosis'
import { enumerateBaselines } from '../../src/data'
import { answer } from './answer-converter'
import { testEstimation } from './estimation-common'
import { createTestCases } from './util'

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
      answer(testCase.answers, diagnosis)
      testEstimation(
        testCase,
        diagnosis.enumerateEstimations(false),
        diagnosis.enumerateBaselines(),
        originalBaselines
      )
    })
  }
}
