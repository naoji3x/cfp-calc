import { type Domain, type Type } from 'common'

export interface Option {
  readonly option: string
  readonly domain: Domain
  readonly item: string
  readonly type: Type
  readonly values: readonly number[]
  readonly args: readonly string[]
  readonly operation: string
  readonly citation: string
}
