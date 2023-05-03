import { testOption } from './option-common'

const options = [
  'vegan',
  'vegetarian',
  'white-meat-fish',
  'guide-meal',
  'guide-snack-drink',
  'seasonal',
  'local',
  'loss'
]

for (const option of options) {
  describe('Test ' + option + ' options', () => {
    testOption(option)
  })
}
