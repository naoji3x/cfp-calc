import { furtherReductionFromOtherFootprints } from '../../src/action'
import { type Domain, type Type } from '../../src/common'

describe('furtherReductionFromOtherFootprints ', () => {
  test('returns 0', () => {
    expect(
      furtherReductionFromOtherFootprints(
        1,
        1,
        'intensity',
        'ac',
        ['dummy'],
        0,
        (domain: Domain, item: string, type: Type) => 1,
        (option: string, domain: Domain, item: string, type: Type) => 1
      )
    ).toBe(1)
  })
})
