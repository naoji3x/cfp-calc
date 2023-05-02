import xlsx from 'xlsx'
import { type FoodAnswer } from '../../src/answer/answer'
import { Diagnosis } from '../../src/answer/diagnosis'
import {
  type AlcoholFrequency,
  type DairyFoodFrequency,
  type DishFrequency,
  type EatOutExpenses,
  type FoodDirectWasteFrequency,
  type FoodIntake,
  type FoodLeftoverFrequency,
  type SoftDrinkSnackExpenses
} from '../../src/common'
import { enumerateBaselines } from '../../src/data'
import { testEstimation } from './estimation-common'
import { createTestCases, type Answer } from './util'

/** excelのanswerをfoodAnswerに変換 */
const toFoodAnswer = (answers: readonly Answer[]): FoodAnswer => {
  const answer: Record<string, string | number | boolean> = {}
  for (const a of answers) {
    answer[a.name] = a.value
  }

  return {
    foodDirectWasteFrequency:
      answer.foodDirectWasteFactorKey as FoodDirectWasteFrequency,
    foodLeftoverFrequency:
      answer.foodLeftoverFactorKey as FoodLeftoverFrequency,
    foodIntake: answer.foodIntakeFactorKey as FoodIntake,
    alcoholFrequency: answer.alcoholFactorKey as AlcoholFrequency,
    dairyFoodFrequency: answer.dairyFoodFactorKey as DairyFoodFrequency,
    beefDishFrequency: answer.dishBeefFactorKey as DishFrequency,
    porkDishFrequency: answer.dishPorkFactorKey as DishFrequency,
    chickenDishFrequency: answer.dishChickenFactorKey as DishFrequency,
    seafoodDishFrequency: answer.dishSeafoodFactorKey as DishFrequency,
    softDrinkSnackExpenses:
      answer.softDrinkSnackFactorKey as SoftDrinkSnackExpenses,
    eatOutExpenses: answer.eatOutFactorKey as EatOutExpenses
  }
}

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
        domain,
        testCase,
        diagnosis.enumerateEstimations(false),
        diagnosis.enumerateBaselines(),
        originalBaselines
      )
    })
  }
})
