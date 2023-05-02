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
import { testEstimation } from './estimation-common'
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
            trainWeeklyTravelingTime: answer.trainWeeklyTravelingTime as number,
            trainAnnualTravelingTime: answer.trainAnnualTravelingTime as number,

            busWeeklyTravelingTime: answer.busWeeklyTravelingTime as number,
            busAnnualTravelingTime: answer.busAnnualTravelingTime as number,

            motorbikeWeeklyTravelingTime:
              answer.motorbikeWeeklyTravelingTime as number,
            motorbikeAnnualTravelingTime:
              answer.motorbikeAnnualTravelingTime as number,
            otherCarWeeklyTravelingTime:
              answer.otherCarWeeklyTravelingTime as number,
            otherCarAnnualTravelingTime:
              answer.otherCarAnnualTravelingTime as number,

            airplaneAnnualTravelingTime:
              answer.airplaneAnnualTravelingTime as number,

            ferryAnnualTravelingTime: answer.ferryAnnualTravelingTime as number
          }
        : {
            residentialAreaSize:
              answer.mileageByAreaFirstKey as ResidentialAreaSize
          }
  }
}

/** テスト */
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
        domain,
        testCase,
        diagnosis.enumerateEstimations(false),
        diagnosis.enumerateBaselines(),
        originalBaselines
      )
    })
  }
})
