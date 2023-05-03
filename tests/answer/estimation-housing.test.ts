import xlsx from 'xlsx'
import { type HousingAnswer } from '../../src/answer/answer'
import { Diagnosis } from '../../src/answer/diagnosis'
import { enumerateBaselines } from '../../src/data'
import { toHousingAnswer } from './answer-converter'
import { testEstimation } from './estimation-common'
import { createTestCases } from './util'

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
        testCase,
        diagnosis.enumerateEstimations(),
        diagnosis.enumerateBaselines(),
        originalBaselines
      )
    })
  }
})

describe(`Extra test ${domain} estimations`, () => {
  test('empty answer', () => {
    const diagnosis = new Diagnosis()
    diagnosis.answerHousing({ housingSize: 'unknown', residentCount: 1 })
    expect(
      diagnosis.findEstimationOrDefault('housing', 'electricity', 'amount')
        .value
    ).toBeCloseTo(0)
  })

  test('property', () => {
    const diagnosis = new Diagnosis()
    const answer1: HousingAnswer = { residentCount: 0 }
    diagnosis.answerHousing(answer1)
    expect(diagnosis.housingAnswer).toStrictEqual(answer1)
    const answer2: HousingAnswer = { housingSize: 'unknown' }
    diagnosis.answerHousing(answer2)
    expect(diagnosis.housingAnswer).toStrictEqual({ ...answer1, ...answer2 })
    diagnosis.answerHousing({}, true)
    expect(diagnosis.housingAnswer).toStrictEqual({})
  })
})
