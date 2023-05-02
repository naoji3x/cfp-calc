import xlsx from 'xlsx'
import { type OtherAnswer } from '../../src/answer/answer'
import { Diagnosis } from '../../src/answer/diagnosis'
import {
  type ApplianceFurnitureExpenses,
  type ClothesBeautyExpenses,
  type CommunicationExpenses,
  type DailyGoodsExpenses,
  type HobbyGoodsExpenses,
  type LeisureSportsExpenses,
  type ServiceExpenses,
  type TravelExpenses
} from '../../src/common'
import { enumerateBaselines } from '../../src/data'
import { testEstimation } from './estimation-common'
import { createTestCases, type Answer } from './util'

/** excelのanswerをfoodAnswerに変換 */
const toOtherAnswer = (answers: readonly Answer[]): OtherAnswer => {
  const answer: Record<string, string | number | boolean> = {}
  for (const a of answers) {
    answer[a.name] = a.value
  }

  return {
    residentCount: answer.residentCount as number,
    travelExpenses: answer.travelFactorKey as TravelExpenses,
    applianceFurnitureExpenses:
      answer.applianceFurnitureAmountKey as ApplianceFurnitureExpenses,
    clothesBeautyExpenses:
      answer.clothesBeautyFactorKey as ClothesBeautyExpenses,
    hobbyGoodsExpenses: answer.hobbyGoodsFactorKey as HobbyGoodsExpenses,
    serviceExpenses: answer.serviceFactorKey as ServiceExpenses,
    dailyGoodsExpenses: answer.dailyGoodsAmountKey as DailyGoodsExpenses,
    leisureSportsExpenses:
      answer.leisureSportsFactorKey as LeisureSportsExpenses,
    communicationExpenses:
      answer.communicationAmountKey as CommunicationExpenses
  }
}

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
        domain,
        testCase,
        diagnosis.enumerateEstimations(false),
        diagnosis.enumerateBaselines(),
        originalBaselines
      )
    })
  }
})
