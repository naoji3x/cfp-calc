import { type Domain, type Origin } from 'common'

export default interface FootprintItem {
  readonly domain: Domain
  readonly item: string
  readonly subdomain: string
  readonly intensity: number
  readonly intensityUnit: string
  readonly intensityOrigin: Origin
  readonly amount: number
  readonly amountUnit: string
  readonly amountOrigin: Origin
}
