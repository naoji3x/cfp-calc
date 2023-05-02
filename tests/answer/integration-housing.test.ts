import { testIntegration } from './integration-common'

/** テスト */
const name = 'housing'
describe(`Test ${name} integration estimations`, () => {
  testIntegration(name)
})
