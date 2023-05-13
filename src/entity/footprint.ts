import { type Domain, type Type } from '../common'

export interface FootprintKey {
  readonly directory: string
  readonly domain: Domain
  readonly item: string
  readonly type: Type
}

export interface FootprintValue {
  readonly subdomain: string
  readonly value: number
  readonly unit: string
  readonly citation: string
}

export type Footprint = FootprintKey & FootprintValue
