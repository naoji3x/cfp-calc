import { type Domain, type Type } from '../common'

export interface Item {
  readonly domain: Domain
  readonly subdomain: string
  readonly item: string
  readonly type: Type
  readonly value: number
  readonly unit: string
}
