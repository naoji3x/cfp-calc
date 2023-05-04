import { type Domain } from 'common'

export default interface FootprintSummary {
  readonly domain: Domain
  readonly subdomain: string
  footprint: number
}
