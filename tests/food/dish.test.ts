import {
  estimateDishAnnualAmount,
  estimateDishIntensity
} from '../../src/food/dish'

import {
  type DishFrequency,
  type DishItem,
  type FoodDirectWasteFrequency,
  type FoodLeftoverFrequency
} from '../../src/common/types'

const expectAmount = (
  param: {
    foodDirectWasteFrequency: FoodDirectWasteFrequency
    foodLeftoverFrequency: FoodLeftoverFrequency
    dishFrequency: DishFrequency
  },
  itemAndValues: Array<{ item: DishItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateDishAnnualAmount(inv.item, param)).toBeCloseTo(inv.value)
  }
}

const expectIntensity = (
  itemAndValues: Array<{ item: DishItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateDishIntensity(inv.item)).toBeCloseTo(inv.value)
  }
}

describe('dish', () => {
  test('amount case E6', () => {
    expectAmount(
      {
        foodDirectWasteFrequency: 'seldom',
        foodLeftoverFrequency: 'seldom',
        dishFrequency: 'everyday'
      },
      [
        { item: 'beef', value: 7.440199867 },
        { item: 'pork', value: 16.45824952 },
        { item: 'chicken', value: 13.67195025 },
        { item: 'other-meat', value: 2.823419262 },
        { item: 'fish', value: 46.92894977 },
        { item: 'processed-fish', value: 17.52083205 }
      ]
    )
  })
  test('amount case 01', () => {
    expectAmount(
      {
        foodDirectWasteFrequency: '1-per-week',
        foodLeftoverFrequency: '1-per-week',
        dishFrequency: '4-5-per-week'
      },
      [
        { item: 'beef', value: 4.933340889 },
        { item: 'pork', value: 10.91289976 },
        { item: 'chicken', value: 9.065400445 },
        { item: 'other-meat', value: 1.872112301 },
        { item: 'fish', value: 31.11697413 },
        { item: 'processed-fish', value: 11.61746172 }
      ]
    )
  })

  test('amount case 02', () => {
    expectAmount(
      {
        foodDirectWasteFrequency: '2-3-per-week',
        foodLeftoverFrequency: '2-3-per-week',
        dishFrequency: '2-3-per-week'
      },
      [
        { item: 'beef', value: 2.901616841 },
        { item: 'pork', value: 6.41858214 },
        { item: 'chicken', value: 5.331948308 },
        { item: 'other-meat', value: 1.101110323 },
        { item: 'fish', value: 18.30190498 },
        { item: 'processed-fish', value: 6.832980598 }
      ]
    )
  })

  test('amount case 03', () => {
    expectAmount(
      {
        foodDirectWasteFrequency: '4-7-per-week',
        foodLeftoverFrequency: '4-7-per-week',
        dishFrequency: '1-per-week'
      },
      [
        { item: 'beef', value: 1.289344259 },
        { item: 'pork', value: 2.852120898 },
        { item: 'chicken', value: 2.369271105 },
        { item: 'other-meat', value: 0.489282476 },
        { item: 'fish', value: 8.132519694 },
        { item: 'processed-fish', value: 3.036260397 }
      ]
    )
  })

  test('amount case 04', () => {
    expectAmount(
      {
        foodDirectWasteFrequency: '8-more-per-week',
        foodLeftoverFrequency: '8-more-per-week',
        dishFrequency: '2-3-per-month'
      },
      [
        { item: 'beef', value: 0.872870121 },
        { item: 'pork', value: 1.930850583 },
        { item: 'chicken', value: 1.603967243 },
        { item: 'other-meat', value: 0.331238187 },
        { item: 'fish', value: 5.50561528 },
        { item: 'processed-fish', value: 2.055510748 }
      ]
    )
  })

  test('amount case 05', () => {
    expectAmount(
      {
        foodDirectWasteFrequency: 'unknown',
        foodLeftoverFrequency: 'unknown',
        dishFrequency: '1-less-per-month'
      },
      [
        { item: 'beef', value: 0.273093639 },
        { item: 'pork', value: 0.604102489 },
        { item: 'chicken', value: 0.501830961 },
        { item: 'other-meat', value: 0.103634023 },
        { item: 'fish', value: 1.722534059 },
        { item: 'processed-fish', value: 0.643104738 }
      ]
    )
  })

  test('amount case 06', () => {
    expectAmount(
      {
        foodDirectWasteFrequency: 'unknown',
        foodLeftoverFrequency: 'unknown',
        dishFrequency: 'never'
      },
      [
        { item: 'beef', value: 0 },
        { item: 'pork', value: 0 },
        { item: 'chicken', value: 0 },
        { item: 'other-meat', value: 0 },
        { item: 'fish', value: 0 },
        { item: 'processed-fish', value: 0 }
      ]
    )
  })

  test('amount case 07', () => {
    expectAmount(
      {
        foodDirectWasteFrequency: 'unknown',
        foodLeftoverFrequency: 'unknown',
        dishFrequency: 'unknown'
      },
      [
        { item: 'beef', value: 2.047383013 },
        { item: 'pork', value: 6.375758077 },
        { item: 'chicken', value: 5.066184282 },
        { item: 'other-meat', value: 1.093763838 },
        { item: 'fish', value: 17.32938165 },
        { item: 'processed-fish', value: 6.469890905 }
      ]
    )
  })

  test('intensity case 01', () => {
    expectIntensity([
      { item: 'beef', value: 18.34219895 },
      { item: 'pork', value: 8.051661719 },
      { item: 'chicken', value: 5.250241141 },
      { item: 'other-meat', value: 7.689625825 },
      { item: 'fish', value: 5.528206567 },
      { item: 'processed-fish', value: 4.080158747 }
    ])
  })
})
