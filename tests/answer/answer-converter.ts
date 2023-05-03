import {
  type FoodAnswer,
  type HousingAnswer,
  type MobilityAnswer,
  type OtherAnswer
} from '../../src/answer/answer'
import { type Diagnosis } from '../../src/answer/diagnosis'
import {
  type AlcoholFrequency,
  type ApplianceFurnitureExpenses,
  type CarCharging,
  type CarPassengers,
  type CarType,
  type ClothesBeautyExpenses,
  type CommunicationExpenses,
  type DailyGoodsExpenses,
  type DairyFoodFrequency,
  type DishFrequency,
  type EatOutExpenses,
  type ElectricityType,
  type FoodDirectWasteFrequency,
  type FoodIntake,
  type FoodLeftoverFrequency,
  type GasItem,
  type HobbyGoodsExpenses,
  type HousingInsulation,
  type HousingSize,
  type LeisureSportsExpenses,
  type LivingRegion,
  type Month,
  type ResidentialAreaSize,
  type ServiceExpenses,
  type SoftDrinkSnackExpenses,
  type TravelExpenses
} from '../../src/common'
import { type Answer } from './util'

/**
 * excelのanswerをfoodAnswerに変換
 * @param answers excelのanswer
 * @returns FoodAnswer
 */
export const toFoodAnswer = (answers: readonly Answer[]): FoodAnswer => {
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

/**
 * excelのanswerをmobilityAnswerに変換
 * @param answers excelのanswer
 * @returns MobilityAnswer
 */
export const toMobilityAnswer = (
  answers: readonly Answer[]
): MobilityAnswer => {
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

/**
 * excelのanswerをhousingAnswerに変換
 * @param answers excelのanswer
 * @returns HousingAnswer
 */
export const toHousingAnswer = (answers: readonly Answer[]): HousingAnswer => {
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

/** excelのanswerをfoodAnswerに変換 */
export const toOtherAnswer = (answers: readonly Answer[]): OtherAnswer => {
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

/**
 * excelのanswerを元に設問に回答
 * @param answers excelのanswer
 * @param diagnosis カーボンフットプリント診断
 */
export const answer = (
  answers: readonly Answer[],
  diagnosis: Diagnosis
): void => {
  const housingAnswer = toHousingAnswer(answers)
  const mobilityAnswer = toMobilityAnswer(answers)
  const foodAnswer = toFoodAnswer(answers)
  const otherAnswer = toOtherAnswer(answers)

  if (answers.find((a) => a.answer === 'housingAnswer') !== undefined) {
    diagnosis.answerHousing(housingAnswer)
  }
  if (answers.find((a) => a.answer === 'mobilityAnswer') !== undefined) {
    diagnosis.answerMobility(mobilityAnswer)
  }
  if (answers.find((a) => a.answer === 'foodAnswer') !== undefined) {
    diagnosis.answerFood(foodAnswer)
  }
  if (answers.find((a) => a.answer === 'otherAnswer') !== undefined) {
    diagnosis.answerOther(otherAnswer)
  }
}
