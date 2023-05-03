import xlsx from 'xlsx'
import { type FoodAnswer } from '../../src/answer/answer'
import { Diagnosis } from '../../src/answer/diagnosis'
import { enumerateBaselines } from '../../src/data'
import { toFoodAnswer } from './answer-converter'
import { testEstimation } from './estimation-common'
import { createTestCases } from './util'

/** テスト */
const domain = 'food'
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
      const foodAnswer = toFoodAnswer(testCase.answers)
      diagnosis.answerFood(foodAnswer)

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
    const answer1: FoodAnswer = { beefDishFrequency: 'unknown' }
    diagnosis.answerFood(answer1)
    expect(diagnosis.foodAnswer).toStrictEqual(answer1)
    const answer2: FoodAnswer = { porkDishFrequency: 'unknown' }
    diagnosis.answerFood(answer2)
    expect(diagnosis.foodAnswer).toStrictEqual({ ...answer1, ...answer2 })
    diagnosis.answerFood({}, true)
    expect(diagnosis.foodAnswer).toStrictEqual({})
  })
})
