import xlsx from 'xlsx'
import { type HousingAnswer } from '../../src/answer/answer'
import { Diagnosis } from '../../src/answer/diagnosis'
import {
  type CarCharging,
  type CarType,
  type ElectricityType,
  type GasItem,
  type HousingInsulation,
  type HousingSize,
  type LivingRegion,
  type Month
} from '../../src/common'
import { enumerateBaselines } from '../../src/data'
import { testEstimation } from './estimation-common'
import { createTestCases, type Answer } from './util'

/** excelのanswerをhousingAnswerに変換 */
const toHousingAnswer = (answers: readonly Answer[]): HousingAnswer => {
  const answer: Record<string, string | number | boolean> = {}
  for (const a of answers) {
    answer[a.name] = a.value
  }

  return {
    housingSize: answer.housingSizeKey as HousingSize,
    residentCount: answer.residentCount as number,
    housingInsulation: answer.housingInsulationFirstKey as HousingInsulation,
    // 電気
    electricity: {
      electricityType: answer.electricityIntensityKey as ElectricityType,
      // 電気の月間消費量または居住地域
      consumptionOrLivingRegion:
        answer.electricityMonthlyConsumption !== undefined &&
        answer.electricitySeasonFactorKey !== undefined
          ? {
              monthlyConsumption:
                answer.electricityMonthlyConsumption as number,
              month: answer.electricitySeasonFactorKey as Month
            }
          : {
              livingRegion: answer.housingAmountByRegionFirstKey as LivingRegion
            },
      // 自家用車
      privateCar:
        answer.hasPrivateCar === true
          ? {
              carType: answer.carIntensityFactorFirstKey as CarType,
              annualMileage: answer.privateCarAnnualMileage as number,
              carCharging: answer.carChargingKey as CarCharging
            }
          : undefined
    },
    // ガス
    gas:
      answer.useGas === true
        ? {
            item: answer.energyHeatIntensityKey as GasItem,
            // ガスの月間消費量または居住地域
            consumptionOrLivingRegion:
              answer.gasMonthlyConsumption !== undefined &&
              answer.gasSeasonFactorKey !== undefined
                ? {
                    monthlyConsumption: answer.gasMonthlyConsumption as number,
                    month: answer.gasSeasonFactorKey as Month
                  }
                : {
                    livingRegion:
                      answer.housingAmountByRegionFirstKey as LivingRegion
                  }
          }
        : undefined,
    // 灯油
    kerosene:
      answer.useKerosene === true
        ? // 灯油の月間消費量または居住地域
          answer.keroseneMonthlyConsumption !== undefined &&
          answer.keroseneMonthCount !== undefined
          ? {
              monthlyConsumption: answer.keroseneMonthlyConsumption as number,
              monthCount: answer.keroseneMonthCount as number
            }
          : {
              livingRegion: answer.housingAmountByRegionFirstKey as LivingRegion
            }
        : undefined
  }
}

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
