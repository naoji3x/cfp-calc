import { type Domain, type Type } from '../common'

export interface Footprint {
  readonly directory: string
  readonly domain: Domain
  readonly item: string
  readonly type: Type
  readonly subdomain: string
  readonly value: number
  readonly unit: string
  readonly citation: string
}
