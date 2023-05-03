import {
  furtherReductionFromOtherFootprints,
  increaseRate
} from '../../src/action'
import {
  type ElectricityType,
  type HousingSize,
  type Month
} from '../../src/common'
import {
  estimateElectricityAnnualAmount,
  estimateElectricityIntensity
} from '../../src/housing/electricity'
import {
  estimateHousingMaintenanceAnnualAmount,
  estimateHousingMaintenanceIntensity
} from '../../src/housing/housing-maintenance'
import { Result } from './util'

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
