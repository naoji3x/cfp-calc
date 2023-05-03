import {
  absoluteTarget,
  increaseRate,
  shiftFromOtherItemsThenReductionRate
} from '../../src/action'
import { type GasItem, type HousingSize, type Month } from '../../src/common'
import { estimateElectricityAnnualAmount } from '../../src/housing/electricity'
import { estimateGasAnnualAmount } from '../../src/housing/gas'
import { estimateHousingMaintenanceAnnualAmount } from '../../src/housing/housing-maintenance'
import { estimateKeroseneAnnualAmount } from '../../src/housing/kerosene'
import { estimateOtherEnergyAnnualAmount } from '../../src/housing/other-energy'
import { Result } from './util'

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
