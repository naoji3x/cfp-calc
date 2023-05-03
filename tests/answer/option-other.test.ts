import { testOption } from './option-common'

const options = [
  'clothes-accessory',
  'electronics-furniture',
  'hobby',
  'consumables',
  'books',
  'eco-tourism'
]

for (const option of options) {
  describe('Test ' + option + ' options', () => {
    testOption(option)
  })
}
