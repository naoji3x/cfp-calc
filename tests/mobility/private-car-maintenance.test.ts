import {
  estimatePrivateCarMaintenanceAmount,
  estimatePrivateCarMaintenanceIntensity
} from '../../src/mobility/private-car-maintenance'

describe('PrivateCarMaintenance', () => {
  test('intensity', () => {
    expect(estimatePrivateCarMaintenanceIntensity()).toBeCloseTo(1.648088312)
  })

  test('amount case 01', () => {
    expect(
      estimatePrivateCarMaintenanceAmount({
        mileage: 5000
      })
    ).toBeCloseTo(64.17671714)
  })
})
