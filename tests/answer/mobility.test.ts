import xlsx from 'xlsx'
import { type MobilityAnswer } from '../../src/answer/answer'
import { Diagnosis } from '../../src/answer/diagnosis'
import {
  type CarCharging,
  type CarPassengers,
  type CarType,
  type ElectricityType,
  type ResidentialAreaSize
} from '../../src/common'
import { enumerateBaselines } from '../../src/data'
import { createTestCases, type Answer } from './util'

/** excelのanswerをmobilityAnswerに変換 */
const toMobilityAnswer = (answers: readonly Answer[]): MobilityAnswer => {
  const answer: Record<string, string | number | boolean> = {}
  for (const a of answers) {
    answer[a.name] = a.value
  }

  return {
    privateCarAnnualMileage:
      answer.hasPrivateCar === true &&
      typeof answer.privateCarAnnualMileage === 'number'
        ? answer.privateCarAnnualMileage
        : undefined,
    carType: answer.carIntensityFactorFirstKey as CarType,
    carPassengers: answer.carPassengersFirstKey as CarPassengers,
    carCharging: answer.carChargingKey as CarCharging,
    electricityType: answer.electricityIntensityKey as ElectricityType,

    travelingTimeOrResidentialAreaSize:
      answer.hasTravelingTime === true
        ? {
            trainWeeklyTravelingTime: Number(answer.trainWeeklyTravelingTime),
            trainAnnualTravelingTime: Number(answer.trainAnnualTravelingTime),

            busWeeklyTravelingTime: Number(answer.busWeeklyTravelingTime),
            busAnnualTravelingTime: Number(answer.busAnnualTravelingTime),

            motorbikeWeeklyTravelingTime: Number(
              answer.motorbikeWeeklyTravelingTime
            ),
            motorbikeAnnualTravelingTime: Number(
              answer.motorbikeAnnualTravelingTime
            ),

            otherCarWeeklyTravelingTime: Number(
              answer.otherCarWeeklyTravelingTime
            ),
            otherCarAnnualTravelingTime: Number(
              answer.otherCarAnnualTravelingTime
            ),

            airplaneAnnualTravelingTime: Number(
              answer.airplaneAnnualTravelingTime
            ),
            ferryAnnualTravelingTime: Number(answer.ferryAnnualTravelingTime)
          }
        : {
            residentialAreaSize:
              answer.mileageByAreaFirstKey as ResidentialAreaSize
          }
  }
}

/** テスト */
describe('Test mobility estimations', () => {
  const domain = 'mobility'

  // テストケースを記載したExcel
  const workbook = xlsx.readFile(
    'tests/answer/case/estimation-' + domain + '.test-cases.xlsx'
  )
  const testCases = createTestCases(workbook)
  const diagnosis = new Diagnosis()
  const originalBaselines = enumerateBaselines()

  // 生成したProfileに対してテストケースを順番に適用
  for (const testCase of testCases) {
    test(`Estimation: ${testCase.case}`, async () => {
      const mobilityAnswer = toMobilityAnswer(testCase.answers)
      diagnosis.answerMobility(mobilityAnswer)

      // console.log(mobilityAnswer)
      // 計算したestimationがexpectationとあっているを確認
      const estimations = diagnosis.enumerateEstimations(false)

      for (const estimation of estimations.filter(
        (e: any) => e.domain === domain
      )) {
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
            e.domain === exp.domain &&
            e.item === exp.item &&
            e.type === exp.type
        )

        expect(Boolean(estimation)).toBe(exp.estimated)
      }

      // estimationsとbaselinesの値を合成し、結果が合っているかを確認。
      const baselines = diagnosis.enumerateBaselines()

      for (const exp of testCase.expectations) {
        const estimation = estimations.find(
          (e) =>
            e.domain === exp.domain &&
            e.item === exp.item &&
            e.type === exp.type
        )
        const baseline = baselines.find(
          (b) =>
            b.domain === exp.domain &&
            b.item === exp.item &&
            b.type === exp.type
        )
        const result = estimation ?? baseline
        expect(result?.value).toBeCloseTo(exp.value)
      }

      // baselineが間違って書き換えられていないかを確認
      for (const baseline of baselines.filter((b) => b.domain === domain)) {
        const org = originalBaselines.find(
          (b) =>
            b.domain === baseline.domain &&
            b.item === baseline.item &&
            b.type === baseline.type
        )

        expect(baseline.value).toBeCloseTo(org !== undefined ? org.value : NaN)
      }
    })
  }
})
