import xlsx from 'xlsx'
import { type MobilityAnswer } from '../../src/answer/answer'
import { Diagnosis } from '../../src/answer/diagnosis'
import { enumerateBaselines } from '../../src/data'
import { toMobilityAnswer } from './answer-converter'
import { testEstimation } from './estimation-common'
import { createTestCases } from './util'

const domain = 'mobility'
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
      const mobilityAnswer = toMobilityAnswer(testCase.answers)
      diagnosis.answerMobility(mobilityAnswer)

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
    diagnosis.answerMobility({ privateCarAnnualMileage: 0 })
    expect(
      diagnosis.findEstimationOrDefault(
        'mobility',
        'private-car-driving',
        'amount'
      ).value
    ).toBeCloseTo(0)
  })

  test('property', () => {
    const diagnosis = new Diagnosis()
    const answer1: MobilityAnswer = { privateCarAnnualMileage: 0 }
    diagnosis.answerMobility(answer1)
    expect(diagnosis.mobilityAnswer).toStrictEqual(answer1)
    const answer2: MobilityAnswer = { carType: 'gasoline' }
    diagnosis.answerMobility(answer2)
    expect(diagnosis.mobilityAnswer).toStrictEqual({ ...answer1, ...answer2 })
    diagnosis.answerMobility({}, true)
    expect(diagnosis.mobilityAnswer).toStrictEqual({})
  })
})
