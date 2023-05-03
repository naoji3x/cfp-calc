import { testOption } from './option-common'

const options = [
  'zeh',
  'self-re',
  'grid-re',
  'com-house',
  'insrenov',
  'clothes-home',
  'ec',
  'ac',
  'led',
  'enenudge'
]

for (const option of options) {
  describe('Test ' + option + ' options', () => {
    testOption(option)
  })
}
