import {
  increaseRate,
  reboundFromOtherFootprints,
  shiftFromOtherItems
} from '../../src/action'
import {
  type Domain,
  type ElectricityType,
  type GasItem,
  type HousingSize,
  type Month,
  type Type
} from '../../src/common'
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
import { Result } from './util'

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
