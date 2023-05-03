import {
  absoluteTarget,
  drivingIntensityToEvPhv,
  drivingIntensityToPrivateCarRideshare,
  drivingIntensityToTaxiRideshare,
  foodAmountToAverageWithoutFoodLoss,
  furtherReductionFromOtherFootprints,
  housingInsulationClothing,
  housingInsulationRenovation,
  increaseRate,
  manufacturingIntensityToEvPhv,
  proportionalToOtherFootprints,
  proportionalToOtherItems,
  reboundFromOtherFootprints,
  shiftFromOtherItems,
  shiftFromOtherItemsThenReductionRate
} from '../../src/action/action'
import {
  type AlcoholFrequency,
  type CarCharging,
  type CarPassengers,
  type CarType,
  type DairyFoodFrequency,
  type DishFrequency,
  type Domain,
  type ElectricityType,
  type FoodDirectWasteFrequency,
  type FoodIntake,
  type FoodIntakeItem,
  type FoodLeftoverFrequency,
  type GasItem,
  type HousingInsulation,
  type HousingSize,
  type Month,
  type SoftDrinkSnackExpenses,
  type Type
} from '../../src/common/types'
import {
  estimateDairyFoodAnnualAmounts,
  estimateDairyFoodIntensities
} from '../../src/food/dairy-food'
import {
  estimateDishAnnualAmounts,
  estimateDishIntensities
} from '../../src/food/dish'
import { estimateEatOutIntensity } from '../../src/food/eat-out'
import {
  estimateFoodIntakeAnnualAmount,
  estimateFoodIntakeIntensity
} from '../../src/food/food-intake'
import {
  estimateProcessedMeatAnnualAmount,
  estimateProcessedMeatIntensity
} from '../../src/food/processed-meat'
import { estimateReadyMealIntensity } from '../../src/food/ready-meal'
import {
  estimateElectricityAnnualAmount,
  estimateElectricityIntensity
} from '../../src/housing/electricity'
import {
  estimateGasAnnualAmount,
  estimateGasIntensity
} from '../../src/housing/gas'
import {
  estimateHousingMaintenanceAnnualAmount,
  estimateHousingMaintenanceIntensity
} from '../../src/housing/housing-maintenance'
import {
  estimateKeroseneAnnualAmount,
  estimateKeroseneIntensity
} from '../../src/housing/kerosene'
import { estimateOtherEnergyAnnualAmount } from '../../src/housing/other-energy'
import { estimateBicycleDrivingAnnualAmount } from '../../src/mobility/bicycle-driving'
import { estimateBicycleMaintenanceAnnualAmount } from '../../src/mobility/bicycle-maintenance'
import { estimateBusAnnualAmount } from '../../src/mobility/bus'
import { estimateCarSharingDrivingIntensity } from '../../src/mobility/car-sharing-driving'
import { estimateOtherCarAnnualAmount } from '../../src/mobility/other-car'
import {
  estimatePrivateCarDrivingAmount,
  estimatePrivateCarDrivingIntensity
} from '../../src/mobility/private-car-driving'
import { estimatePrivateCarMaintenanceAmount } from '../../src/mobility/private-car-maintenance'
import {
  estimatePrivateCarPurchaseAmount,
  estimatePrivateCarPurchaseIntensity
} from '../../src/mobility/private-car-purchase'
import { estimateTaxiIntensity } from '../../src/mobility/taxi'
import { estimateTrainAnnualAmount } from '../../src/mobility/train'

class Result {
  private readonly items: Record<string, number> = {}
  private readonly actions: Record<string, number> = {}

  readonly addItem = (
    domain: Domain,
    item: string,
    type: Type,
    value: number
  ): void => {
    this.items[domain + '_' + item + '_' + type] = value
  }

  readonly addAction = (
    option: string,
    domain: Domain,
    item: string,
    type: Type,
    value: number
  ): void => {
    this.actions[option + '_' + domain + '_' + item + '_' + type] = value
  }

  readonly findEstimationOrDefault = (
    domain: Domain,
    item: string,
    type: Type
  ): number => {
    return this.items[domain + '_' + item + '_' + type]
  }

  readonly findActionOrDefault = (
    option: string,
    domain: Domain,
    item: string,
    type: Type
  ): number => {
    const value = this.actions[option + '_' + domain + '_' + item + '_' + type]
    return isNaN(value)
      ? this.findEstimationOrDefault(domain, item, type)
      : value
  }
}

describe('absoluteTarget', () => {
  test('returns the target', () => {
    expect(absoluteTarget(50)).toBeCloseTo(50)
  })
})

// test the increaseRate function
describe('increaseRate', () => {
  test('returns base * (1 + rate)', () => {
    expect(increaseRate(50, 0.5)).toBeCloseTo(75)
  })
})

// test the drivingIntensityToEvPhv function
describe('drivingIntensityToEvPhv', () => {
  const carType: CarType = 'ev'
  const carPassengers: CarPassengers = '3'
  const carCharging: CarCharging = 'unknown'
  const electricityType: ElectricityType = '30-renewable'
  const privateCarDriving = estimatePrivateCarDrivingIntensity({
    carType,
    carPassengers,
    carCharging,
    electricityType
  })

  test('car-ev-phv02', () => {
    expect(
      drivingIntensityToEvPhv(
        privateCarDriving,
        0.083547694,
        carType,
        carCharging,
        electricityType
      )
    ).toBeCloseTo(0.046426677182307)
  })
})

// test the manufacturingIntensityToEvPhv function
describe('manufacturingIntensityToEvPhv', () => {
  const carType: CarType = 'ev'
  const privateCarPurchase = estimatePrivateCarPurchaseIntensity({
    carType
  })

  test('car-ev-phv02', () => {
    expect(
      manufacturingIntensityToEvPhv(privateCarPurchase, 8027.5, carType)
    ).toBeCloseTo(9878.35177539868)
  })
})

// test the foodAmountToAverageWithoutFoodLoss function
describe('foodAmountToAverageWithoutFoodLoss', () => {
  const foodDirectWaste: FoodDirectWasteFrequency = '8-more-per-week'
  const foodLeftover: FoodLeftoverFrequency = '8-more-per-week'
  const foodIntake: FoodIntake = 'very-much'
  const base = estimateFoodIntakeAnnualAmount('rice', {
    foodDirectWasteFrequency: foodDirectWaste,
    foodLeftoverFrequency: foodLeftover,
    foodIntake
  })

  test('loss01', () => {
    expect(
      foodAmountToAverageWithoutFoodLoss(
        base,
        0.964320154,
        foodDirectWaste,
        foodLeftover
      )
    ).toBeCloseTo(55.6236040551718)
  })
})

// test the drivingIntensityToTaxiRideshare function
describe('drivingIntensityToTaxiRideshare', () => {
  const carType: CarType = 'gasoline'
  const carPassengers: CarPassengers = '1'
  const carCharging: CarCharging = 'unknown'
  const taxiIntensity = estimateTaxiIntensity({
    carPassengers
  })
  const privateCarDrivingIntensity = estimatePrivateCarDrivingIntensity({
    carType,
    carPassengers,
    carCharging
  })
  const carSharingDrivingIntensity = estimateCarSharingDrivingIntensity({
    carType,
    carPassengers,
    carCharging
  })

  test('rideshare01', () => {
    expect(
      drivingIntensityToTaxiRideshare(taxiIntensity, 4, carPassengers)
    ).toBeCloseTo(0.177172888572961)
    expect(
      drivingIntensityToPrivateCarRideshare(
        privateCarDrivingIntensity,
        4,
        carPassengers
      )
    ).toBeCloseTo(0.0629255735353304)
    expect(
      drivingIntensityToPrivateCarRideshare(
        carSharingDrivingIntensity,
        4,
        carPassengers
      )
    ).toBeCloseTo(0.0630467260348775)
  })
})

// test the housingInsulationRenovation function
describe('housingInsulationRenovation', () => {
  const residentCount = 2
  const insulation: HousingInsulation = '4-level'

  const electricityAmount = estimateElectricityAnnualAmount({
    residentCount,
    month: 'january',
    monthlyConsumption: 750
  })

  const urbanGasAmount = estimateGasAnnualAmount('urban-gas', {
    residentCount,
    month: 'january',
    monthlyConsumption: 15
  })

  const keroseneAmount = estimateKeroseneAnnualAmount({
    residentCount,
    monthCount: 2,
    monthlyConsumption: 200
  })

  test('insrenov05', () => {
    expect(
      housingInsulationRenovation(electricityAmount, 0.127762934, insulation)
    ).toBeCloseTo(3433.26189262778)

    expect(
      housingInsulationRenovation(urbanGasAmount, 0.234432234, insulation)
    ).toBeCloseTo(572.696135239875)

    expect(
      housingInsulationRenovation(keroseneAmount, 0.771779141, insulation)
    ).toBeCloseTo(2038.89052)
  })
})

// test the housingInsulationClothing function
describe('housingInsulationClothing', () => {
  const residentCount = 2
  const insulation: HousingInsulation = '4-level'

  const electricityAmount = estimateElectricityAnnualAmount({
    residentCount,
    month: 'january',
    monthlyConsumption: 750
  })

  const urbanGasAmount = estimateGasAnnualAmount('urban-gas', {
    residentCount,
    month: 'january',
    monthlyConsumption: 15
  })

  const keroseneAmount = estimateKeroseneAnnualAmount({
    residentCount,
    monthCount: 2,
    monthlyConsumption: 200
  })

  test('clothes-home05', () => {
    expect(
      housingInsulationClothing(electricityAmount, 0.127762934, insulation)
    ).toBeCloseTo(3389.39753130832)

    expect(
      housingInsulationClothing(urbanGasAmount, 0.234432234, insulation)
    ).toBeCloseTo(559.270291776376)

    expect(
      housingInsulationClothing(keroseneAmount, 0.771779141, insulation)
    ).toBeCloseTo(1881.53320256687)
  })
})

// test the dailyshift01 case
describe('dailyshift01', () => {
  const privateCarAnnualMileage = 5000
  const trainWeeklyTravelingTime = 5
  const busWeeklyTravelingTime = 1
  const otherCarWeeklyTravelingTime = 1
  const otherCarAnnualTravelingTime = 20
  const trainAnnualTravelingTime = 20
  const busAnnualTravelingTime = 20

  const result = new Result()
  result.addItem(
    'mobility',
    'train',
    'amount',
    estimateTrainAnnualAmount({
      weeklyTravelingTime: trainWeeklyTravelingTime,
      annualTravelingTime: trainAnnualTravelingTime
    })
  )
  result.addItem(
    'mobility',
    'bus',
    'amount',
    estimateBusAnnualAmount({
      weeklyTravelingTime: busWeeklyTravelingTime,
      annualTravelingTime: busAnnualTravelingTime
    })
  )
  result.addItem(
    'mobility',
    'taxi',
    'amount',
    estimateOtherCarAnnualAmount('taxi', {
      weeklyTravelingTime: otherCarWeeklyTravelingTime,
      annualTravelingTime: otherCarAnnualTravelingTime
    })
  )
  result.addItem(
    'mobility',
    'private-car-driving',
    'amount',
    estimatePrivateCarDrivingAmount({ mileage: privateCarAnnualMileage })
  )
  result.addItem(
    'mobility',
    'bicycle-driving',
    'amount',
    estimateBicycleDrivingAnnualAmount({ residentialAreaSize: 'unknown' })
  )
  result.addItem(
    'mobility',
    'private-car-purchase',
    'amount',
    estimatePrivateCarPurchaseAmount({
      mileage: privateCarAnnualMileage
    })
  )
  result.addItem(
    'mobility',
    'car-sharing-driving',
    'amount',
    estimateOtherCarAnnualAmount('car-sharing-driving', {
      weeklyTravelingTime: otherCarWeeklyTravelingTime,
      annualTravelingTime: otherCarAnnualTravelingTime
    })
  )
  result.addItem(
    'mobility',
    'car-sharing-rental',
    'amount',
    estimateOtherCarAnnualAmount('car-sharing-rental', {
      weeklyTravelingTime: otherCarWeeklyTravelingTime,
      annualTravelingTime: otherCarAnnualTravelingTime
    })
  )
  result.addItem(
    'mobility',
    'private-car-maintenance',
    'amount',
    estimatePrivateCarMaintenanceAmount({
      mileage: privateCarAnnualMileage
    })
  )
  result.addItem(
    'mobility',
    'bicycle-maintenance',
    'amount',
    estimateBicycleMaintenanceAnnualAmount({ residentialAreaSize: 'unknown' })
  )

  const taxiAmount = increaseRate(
    result.findEstimationOrDefault('mobility', 'taxi', 'amount'),
    -1
  )
  test('taxi_amount', () => {
    expect(taxiAmount).toBeCloseTo(0)
  })

  const privateCarDrivingAmount = increaseRate(
    result.findEstimationOrDefault('mobility', 'private-car-driving', 'amount'),
    -0.704901961
  )
  test('private-car-driving_amount', () => {
    expect(privateCarDrivingAmount).toBeCloseTo(1475.49019607844)
  })

  result.addAction('dailyshift', 'mobility', 'taxi', 'amount', taxiAmount)
  result.addAction(
    'dailyshift',
    'mobility',
    'private-car-driving',
    'amount',
    privateCarDrivingAmount
  )

  test('mobility_train_amount', () => {
    expect(
      shiftFromOtherItems(
        result.findEstimationOrDefault('mobility', 'train', 'amount'),
        'dailyshift',
        ['mobility_private-car-driving_amount', 'mobility_taxi_amount'],
        0.333333333,
        result.findEstimationOrDefault,
        result.findActionOrDefault
      )
    ).toBeCloseTo(18232.1992366984)
  })

  test('mobility_bus_amount', () => {
    expect(
      shiftFromOtherItems(
        result.findEstimationOrDefault('mobility', 'bus', 'amount'),
        'dailyshift',
        ['mobility_private-car-driving_amount', 'mobility_taxi_amount'],
        0.333333333,
        result.findEstimationOrDefault,
        result.findActionOrDefault
      )
    ).toBeCloseTo(3022.19923669836)
  })

  test('mobility_bicycle-driving_amount', () => {
    const bicycleDrivingAmount = shiftFromOtherItems(
      result.findEstimationOrDefault('mobility', 'bicycle-driving', 'amount'),
      'dailyshift',
      ['mobility_private-car-driving_amount', 'mobility_taxi_amount'],
      0.333333333,
      result.findEstimationOrDefault,
      result.findActionOrDefault
    )
    expect(bicycleDrivingAmount).toBeCloseTo(1796.21257212208)
    result.addAction(
      'dailyshift',
      'mobility',
      'bicycle-driving',
      'amount',
      bicycleDrivingAmount
    )
  })

  // test mobility_private-car-purchase_amount
  test('mobility_private-car-purchase_amount', () => {
    expect(
      proportionalToOtherItems(
        result.findEstimationOrDefault(
          'mobility',
          'private-car-purchase',
          'amount'
        ),
        'dailyshift',
        ['mobility_private-car-driving_amount'],
        1,
        result.findEstimationOrDefault,
        result.findActionOrDefault
      )
    ).toBeCloseTo(0.014786433479391)
  })

  // test mobility_car-sharing-rental_amount
  test('mobility_car-sharing-rental_amount', () => {
    expect(
      proportionalToOtherItems(
        result.findEstimationOrDefault(
          'mobility',
          'car-sharing-rental',
          'amount'
        ),
        'dailyshift',
        ['mobility_car-sharing-driving_amount'],
        1,
        result.findEstimationOrDefault,
        result.findActionOrDefault
      )
    ).toBeCloseTo(3.5897022020565)
  })

  // test mobility_private-car-maintenance_amount
  test('mobility_private-car-maintenance_amount', () => {
    expect(
      proportionalToOtherItems(
        result.findEstimationOrDefault(
          'mobility',
          'private-car-maintenance',
          'amount'
        ),
        'dailyshift',
        ['mobility_private-car-driving_amount'],
        1,
        result.findEstimationOrDefault,
        result.findActionOrDefault
      )
    ).toBeCloseTo(18.9384233919727)
  })

  // test mobility_bicycle-maintenance_amount
  test('mobility_bicycle-maintenance_amount', () => {
    expect(
      proportionalToOtherItems(
        result.findEstimationOrDefault(
          'mobility',
          'bicycle-maintenance',
          'amount'
        ),
        'dailyshift',
        ['mobility_bicycle-driving_amount'],
        1,
        result.findEstimationOrDefault,
        result.findActionOrDefault
      )
    ).toBeCloseTo(2.76676070917255)
  })
})

// test zeh01 case
describe('zeh01', () => {
  const residentCount = 2
  const housingSize: HousingSize = '2-room'
  const electricityMonthlyConsumption = 750
  const electricityMonth: Month = 'january'
  const gasItem: GasItem = 'urban-gas'
  const gasMonth: Month = 'january'
  const gasMonthlyConsumption = 15
  const keroseneMonthlyConsumption = 200
  const keroseneMonthCount = 2

  const result = new Result()
  result.addItem(
    'housing',
    'housing-maintenance',
    'amount',
    estimateHousingMaintenanceAnnualAmount({ residentCount, housingSize })
  )
  result.addItem(
    'housing',
    'electricity',
    'amount',
    estimateElectricityAnnualAmount({
      monthlyConsumption: electricityMonthlyConsumption,
      month: electricityMonth,
      residentCount
    })
  )
  result.addItem(
    'housing',
    'urban-gas',
    'amount',
    estimateGasAnnualAmount(gasItem, {
      monthlyConsumption: gasMonthlyConsumption,
      month: gasMonth,
      residentCount
    })
  )
  result.addItem('housing', 'lpg', 'amount', 0)
  result.addItem(
    'housing',
    'kerosene',
    'amount',
    estimateKeroseneAnnualAmount({
      monthlyConsumption: keroseneMonthlyConsumption,
      monthCount: keroseneMonthCount,
      residentCount
    })
  )
  result.addItem(
    'housing',
    'other-energy',
    'amount',
    estimateOtherEnergyAnnualAmount()
  )

  // test housing_housing-maintenance_amount
  test('housing_housing-maintenance_amount', () => {
    const housingMaintenanceAmount = increaseRate(
      result.findEstimationOrDefault(
        'housing',
        'housing-maintenance',
        'amount'
      ),
      0.7449956
    )
    expect(housingMaintenanceAmount).toBeCloseTo(29.6565001221022)
    result.addAction(
      'zeh',
      'housing',
      'housing-maintenance',
      'amount',
      housingMaintenanceAmount
    )
  })

  // test housing_urban-gas_amount
  test('housing_urban-gas_amount', () => {
    const urbanGasAmount = absoluteTarget(0)
    expect(urbanGasAmount).toBeCloseTo(0.0)
    result.addAction('zeh', 'housing', 'urban-gas', 'amount', urbanGasAmount)
  })

  // test housing_lpg_amount
  test('housing_lpg_amount', () => {
    const lpgAmount = absoluteTarget(0)
    expect(lpgAmount).toBeCloseTo(0.0)
    result.addAction('zeh', 'housing', 'lpg', 'amount', lpgAmount)
  })

  // test housing_kerosene_amount
  test('housing_kerosene_amount', () => {
    const keroseneAmount = absoluteTarget(0)
    expect(keroseneAmount).toBeCloseTo(0.0)
    result.addAction('zeh', 'housing', 'kerosene', 'amount', keroseneAmount)
  })

  // test housing_other-energy_amount
  test('housing_other-energy_amount', () => {
    const otherEnergyAmount = absoluteTarget(0)
    expect(otherEnergyAmount).toBeCloseTo(0.0)
    result.addAction(
      'zeh',
      'housing',
      'other-energy',
      'amount',
      otherEnergyAmount
    )
  })

  // test housing_electricity_intensity
  test('housing_electricity_intensity', () => {
    const electricityIntensity = absoluteTarget(0.042861845)
    expect(electricityIntensity).toBeCloseTo(0.042861845)
    result.addAction(
      'zeh',
      'housing',
      'electricity',
      'intensity',
      electricityIntensity
    )
  })

  // test housing_electricity_amount
  test('housing_electricity_amount', () => {
    expect(
      shiftFromOtherItemsThenReductionRate(
        result.findEstimationOrDefault('housing', 'electricity', 'amount'),
        'zeh',
        [
          'housing_urban-gas_amount',
          'housing_lpg_amount',
          'housing_kerosene_amount',
          'housing_other-energy_amount'
        ],
        0.369,
        -0.2,
        result.findEstimationOrDefault,
        result.findActionOrDefault
      )
    ).toBeCloseTo(3533.7319988604)
  })
})

// test led01 case
describe('led01', () => {
  const residentCount = 2
  const housingSize: HousingSize = '2-room'
  const electricity: ElectricityType = 'conventional'
  const electricityMonthlyConsumption = 750
  const electricityMonth: Month = 'january'

  const result = new Result()
  result.addItem(
    'housing',
    'electricity',
    'amount',
    estimateElectricityAnnualAmount({
      monthlyConsumption: electricityMonthlyConsumption,
      month: electricityMonth,
      residentCount
    })
  )
  result.addItem(
    'housing',
    'electricity',
    'intensity',
    estimateElectricityIntensity({ electricityType: electricity })
  )
  result.addItem(
    'housing',
    'housing-maintenance',
    'amount',
    estimateHousingMaintenanceAnnualAmount({ residentCount, housingSize })
  )
  result.addItem(
    'housing',
    'housing-maintenance',
    'intensity',
    estimateHousingMaintenanceIntensity()
  )

  // test housing_electricity_amount
  test('housing_electricity_amount', () => {
    const electricityAmount = increaseRate(
      result.findEstimationOrDefault('housing', 'electricity', 'amount'),
      -0.0660406
    )
    expect(electricityAmount).toBeCloseTo(3206.52721639271)
    result.addAction(
      'led',
      'housing',
      'electricity',
      'amount',
      electricityAmount
    )
  })

  // test housing_housing-maintenance_amount
  test('housing_housing-maintenance_amount', () => {
    expect(
      furtherReductionFromOtherFootprints(
        result.findEstimationOrDefault(
          'housing',
          'housing-maintenance',
          'amount'
        ),
        result.findEstimationOrDefault(
          'housing',
          'housing-maintenance',
          'intensity'
        ),
        'amount',
        'led',
        ['housing_electricity'],
        0.020622194,
        result.findEstimationOrDefault,
        result.findActionOrDefault
      )
    ).toBeCloseTo(19.1471336056997)
  })
})

// test vegan01 case
describe('vegan01', () => {
  const foodIntake: FoodIntake = 'very-much'
  const foodDirectWaste: FoodDirectWasteFrequency = '8-more-per-week'
  const foodLeftover: FoodLeftoverFrequency = '8-more-per-week'
  const beefDishFrequency: DishFrequency = '2-3-per-month'
  const porkDishFrequency: DishFrequency = '2-3-per-month'
  const chickenDishFrequency: DishFrequency = '2-3-per-month'
  const seafoodDishFrequency: DishFrequency = '2-3-per-month'
  const dairyFoodFrequency: DairyFoodFrequency = '1-2-less-per-week'
  const alcoholFrequency: AlcoholFrequency = '2-3-less-per-month'
  const softDrinkSnackExpenses: SoftDrinkSnackExpenses = '15k-more'

  const result = new Result()

  const foodIntakeItems: FoodIntakeItem[] = [
    'rice',
    'bread-flour',
    'noodle',
    'potatoes',
    'vegetables',
    'processed-vegetables',
    'beans',
    'fruits',
    'oil',
    'seasoning'
  ]

  // add items
  for (const item of foodIntakeItems) {
    result.addItem(
      'food',
      item,
      'amount',
      estimateFoodIntakeAnnualAmount(item, {
        foodIntake,
        foodDirectWasteFrequency: foodDirectWaste,
        foodLeftoverFrequency: foodLeftover
      })
    )
    result.addItem('food', item, 'intensity', estimateFoodIntakeIntensity(item))
  }

  // beef, pork, chicken, other-meat, fish, processed-fish
  const dishAmounts = estimateDishAnnualAmounts({
    foodDirectWaste,
    foodLeftover,
    beefDishFrequency,
    porkDishFrequency,
    chickenDishFrequency,
    seafoodDishFrequency
  })
  for (const item in dishAmounts) {
    result.addItem('food', item, 'amount', dishAmounts[item])
  }

  const dishIntensities = estimateDishIntensities()
  for (const item in dishIntensities) {
    result.addItem('food', item, 'intensity', dishIntensities[item])
  }

  // milk, other-dairy, eggs
  const dairyFoodAmounts = estimateDairyFoodAnnualAmounts({
    foodDirectWasteFrequency: foodDirectWaste,
    foodLeftoverFrequency: foodLeftover,
    dairyFoodFrequency
  })
  for (const item in dairyFoodAmounts) {
    result.addItem('food', item, 'amount', dairyFoodAmounts[item])
  }

  const dairyFoodIntensities = estimateDairyFoodIntensities()
  for (const item in dairyFoodIntensities) {
    result.addItem('food', item, 'intensity', dairyFoodIntensities[item])
  }

  // processed-meat
  result.addItem(
    'food',
    'processed-meat',
    'amount',
    estimateProcessedMeatAnnualAmount({
      foodDirectWasteFrequency: foodDirectWaste,
      foodLeftoverFrequency: foodLeftover,
      beefDishFrequency,
      porkDishFrequency,
      chickenDishFrequency
    })
  )
  result.addItem(
    'food',
    'processed-meat',
    'intensity',
    estimateProcessedMeatIntensity()
  )

  // ready-meal
  result.addItem(
    'food',
    'ready-meal',
    'intensity',
    estimateReadyMealIntensity({
      foodDirectWasteFrequency: foodDirectWaste,
      foodLeftoverFrequency: foodLeftover,
      foodIntake,
      beefDishFrequency,
      porkDishFrequency,
      chickenDishFrequency,
      seafoodDishFrequency,
      dairyFoodFrequency,
      softDrinkSnackExpenses
    })
  )

  // restaurant
  result.addItem(
    'food',
    'restaurant',
    'intensity',
    estimateEatOutIntensity('restaurant', {
      foodDirectWasteFrequency: foodDirectWaste,
      foodLeftoverFrequency: foodLeftover,
      foodIntake,
      beefDishFrequency,
      porkDishFrequency,
      chickenDishFrequency,
      seafoodDishFrequency,
      dairyFoodFrequency,
      alcoholFrequency,
      softDrinkSnackExpenses
    })
  )

  // bar-cafe
  result.addItem(
    'food',
    'bar-cafe',
    'intensity',
    estimateEatOutIntensity('bar-cafe', {
      foodDirectWasteFrequency: foodDirectWaste,
      foodLeftoverFrequency: foodLeftover,
      foodIntake,
      beefDishFrequency,
      porkDishFrequency,
      chickenDishFrequency,
      seafoodDishFrequency,
      dairyFoodFrequency,
      alcoholFrequency,
      softDrinkSnackExpenses
    })
  )

  const addIncreaseRateAction = (
    domain: Domain,
    item: string,
    type: Type,
    rate: number
  ): void => {
    result.addAction(
      'vegan',
      domain,
      item,
      type,
      increaseRate(result.findEstimationOrDefault(domain, item, type), rate)
    )
  }

  const addAbsoluteTargetAction = (
    domain: Domain,
    item: string,
    type: Type,
    target: number
  ): void => {
    result.addAction('vegan', domain, item, type, absoluteTarget(target))
  }

  addIncreaseRateAction('food', 'rice', 'amount', -0.181818182)
  addIncreaseRateAction('food', 'bread-flour', 'amount', -0.181818182)
  addIncreaseRateAction('food', 'noodle', 'amount', -0.181818182)
  addIncreaseRateAction('food', 'potatoes', 'amount', 0.363636364)
  addIncreaseRateAction('food', 'vegetables', 'amount', 0.363636364)
  addIncreaseRateAction('food', 'processed-vegetables', 'amount', 0.363636364)

  addAbsoluteTargetAction('food', 'milk', 'amount', 0)
  addAbsoluteTargetAction('food', 'other-dairy', 'amount', 0)
  addAbsoluteTargetAction('food', 'eggs', 'amount', 0)
  addAbsoluteTargetAction('food', 'beef', 'amount', 0)
  addAbsoluteTargetAction('food', 'pork', 'amount', 0)
  addAbsoluteTargetAction('food', 'chicken', 'amount', 0)
  addAbsoluteTargetAction('food', 'other-meat', 'amount', 0)
  addAbsoluteTargetAction('food', 'processed-meat', 'amount', 0)
  addAbsoluteTargetAction('food', 'fish', 'amount', 0)
  addAbsoluteTargetAction('food', 'processed-fish', 'amount', 0)

  result.addAction(
    'vegan',
    'food',
    'beans',
    'amount',
    shiftFromOtherItems(
      result.findEstimationOrDefault('food', 'beans', 'amount'),
      'vegan',
      [
        'food_milk_amount',
        'food_other-dairy_amount',
        'food_eggs_amount',
        'food_beef_amount',
        'food_pork_amount',
        'food_chicken_amount',
        'food_other-meat_amount',
        'food_processed-meat_amount',
        'food_fish_amount',
        'food_processed-fish_amount'
      ],
      1,
      result.findEstimationOrDefault,
      result.findActionOrDefault
    )
  )

  test('food_beans_amount', () => {
    expect(
      result.findActionOrDefault('vegan', 'food', 'beans', 'amount')
    ).toBeCloseTo(64.9510941476434)
  })

  const domainItems = [
    'food_rice',
    'food_bread-flour',
    'food_noodle',
    'food_potatoes',
    'food_vegetables',
    'food_processed-vegetables',
    'food_beans',
    'food_milk',
    'food_other-dairy',
    'food_eggs',
    'food_beef',
    'food_pork',
    'food_chicken',
    'food_other-meat',
    'food_processed-meat',
    'food_fish',
    'food_processed-fish',
    'food_fruits',
    'food_oil',
    'food_seasoning'
  ]

  // test food_ready-meal_intensity
  test('food_ready-meal_intensity', () => {
    expect(
      proportionalToOtherFootprints(
        result.findEstimationOrDefault('food', 'ready-meal', 'intensity'),
        'vegan',
        domainItems,
        1,
        result.findEstimationOrDefault,
        result.findActionOrDefault
      )
    ).toBeCloseTo(3.58274908840034)
  })

  // test food_restaurant_intensity
  test('food_restaurant_intensity', () => {
    expect(
      proportionalToOtherFootprints(
        result.findEstimationOrDefault('food', 'restaurant', 'intensity'),
        'vegan',
        domainItems,
        0.7157,
        result.findEstimationOrDefault,
        result.findActionOrDefault
      )
    ).toBeCloseTo(2.24004125926062)
  })

  // test food_bar-cafe_intensity
  test('food_bar-cafe_intensity', () => {
    expect(
      proportionalToOtherFootprints(
        result.findEstimationOrDefault('food', 'bar-cafe', 'intensity'),
        'vegan',
        domainItems,
        0.7157,
        result.findEstimationOrDefault,
        result.findActionOrDefault
      )
    ).toBeCloseTo(2.25462895912396)
  })
})

// test ac01 case
describe('ac01', () => {
  const residentCount = 2
  const housingSize: HousingSize = '2-room'
  const electricity: ElectricityType = 'conventional'
  const electricityMonthlyConsumption = 750
  const electricityMonth: Month = 'january'
  const gasItem: GasItem = 'urban-gas'
  const gasMonth: Month = 'january'
  const gasMonthlyConsumption = 15
  const keroseneMonthlyConsumption = 200
  const keroseneMonthCount = 2

  const result = new Result()

  result.addItem(
    'housing',
    'housing-maintenance',
    'amount',
    estimateHousingMaintenanceAnnualAmount({ residentCount, housingSize })
  )
  result.addItem(
    'housing',
    'housing-maintenance',
    'intensity',
    estimateHousingMaintenanceIntensity()
  )

  result.addItem(
    'housing',
    'electricity',
    'amount',
    estimateElectricityAnnualAmount({
      monthlyConsumption: electricityMonthlyConsumption,
      month: electricityMonth,
      residentCount
    })
  )
  result.addItem(
    'housing',
    'electricity',
    'intensity',
    estimateElectricityIntensity({
      electricityType: electricity
    })
  )

  result.addItem(
    'housing',
    'urban-gas',
    'amount',
    estimateGasAnnualAmount(gasItem, {
      monthlyConsumption: gasMonthlyConsumption,
      month: gasMonth,
      residentCount
    })
  )
  result.addItem(
    'housing',
    'urban-gas',
    'intensity',
    estimateGasIntensity(gasItem)
  )

  result.addItem('housing', 'lpg', 'amount', 0)
  result.addItem('housing', 'lpg', 'intensity', estimateGasIntensity('lpg'))

  result.addItem(
    'housing',
    'kerosene',
    'amount',
    estimateKeroseneAnnualAmount({
      monthlyConsumption: keroseneMonthlyConsumption,
      monthCount: keroseneMonthCount,
      residentCount
    })
  )
  result.addItem(
    'housing',
    'kerosene',
    'intensity',
    estimateKeroseneIntensity()
  )

  const addIncreaseRateAction = (
    domain: Domain,
    item: string,
    type: Type,
    rate: number
  ): void => {
    result.addAction(
      'ac',
      domain,
      item,
      type,
      increaseRate(result.findEstimationOrDefault(domain, item, type), rate)
    )
  }

  addIncreaseRateAction('housing', 'urban-gas', 'amount', -0.234432234)
  addIncreaseRateAction('housing', 'lpg', 'amount', -0.082599119)
  addIncreaseRateAction('housing', 'kerosene', 'amount', -0.771779141)

  const electricityAmount = shiftFromOtherItems(
    result.findEstimationOrDefault('housing', 'electricity', 'amount'),
    'ac',
    [
      'housing_urban-gas_amount',
      'housing_lpg_amount',
      'housing_kerosene_amount'
    ],
    0.2125,
    result.findEstimationOrDefault,
    result.findActionOrDefault
  )

  // test electricity amount
  test('housing_electricity_amount', () => {
    expect(electricityAmount).toBeCloseTo(3796.17610953312)
  })

  result.addAction('ac', 'housing', 'electricity', 'amount', electricityAmount)

  // test housing_housing-maintenance_amount
  test('housing_housing-maintenance_amount', () => {
    expect(
      reboundFromOtherFootprints(
        result.findEstimationOrDefault(
          'housing',
          'housing-maintenance',
          'amount'
        ),
        result.findEstimationOrDefault(
          'housing',
          'housing-maintenance',
          'intensity'
        ),
        'amount',
        'ac',
        [
          'housing_electricity',
          'housing_urban-gas',
          'housing_lpg',
          'housing_kerosene'
        ],
        -0.015345044,
        result.findEstimationOrDefault,
        result.findActionOrDefault
      )
    ).toBeCloseTo(19.8033015569162)
  })
})
