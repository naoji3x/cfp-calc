import { testOption } from './option-common'

const options = [
  'telework',
  'closework',
  'mictourism',
  'closeservice',
  'dailyshift',
  'longshift',
  'rideshare',
  'carshare',
  'car-ev-phv',
  'car-ev-phv-re'
]

for (const option of options) {
  describe('Test ' + option + ' options', () => {
    testOption(option)
  })
}
