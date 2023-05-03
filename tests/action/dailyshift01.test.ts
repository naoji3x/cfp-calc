import {
  increaseRate,
  proportionalToOtherItems,
  shiftFromOtherItems
} from '../../src/action'
import {
  estimateBicycleDrivingAnnualAmount,
  estimateBicycleMaintenanceAnnualAmount,
  estimateBusAnnualAmount,
  estimateOtherCarAnnualAmount,
  estimatePrivateCarDrivingAmount,
  estimatePrivateCarMaintenanceAmount,
  estimatePrivateCarPurchaseAmount,
  estimateTrainAnnualAmount
} from '../../src/mobility'
import { Result } from './util'

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
