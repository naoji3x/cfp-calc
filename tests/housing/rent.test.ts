import { type HousingSize } from '../../src/common/types'
import {
  estimateRentAnnualAmount,
  estimateRentIntensity
} from '../../src/housing/rent'

const testAmount = (
  title: string,
  housingSize: HousingSize,
  residentCount: number,
  value: number
): void => {
  test(title, () => {
    expect(
      estimateRentAnnualAmount({
        housingSize,
        residentCount
      })
    ).toBeCloseTo(value)
  })
}

const testIntensity = (title: string, value: number): void => {
  test(title, () => {
    expect(estimateRentIntensity()).toBeCloseTo(value)
  })
}

describe('rent', () => {
  testAmount('amount case 01', '1-room', 1, 3.556419643)
  testAmount('amount case 02', '2-room', 2, 2.667314732)
  testAmount('amount case 03', '3-room', 2, 3.556419643)
  testAmount('amount case 04', '4-room', 3, 3.556419643)
  testAmount('amount case 05', '5-6-room', 3, 4.741892857)
  testAmount('amount case 06', '7-more-room', 4, 5.334629465)
  testAmount('amount case 07', 'unknown', 4, 6.934328682)

  testIntensity('intensity case 01', 3.418080692)
})
