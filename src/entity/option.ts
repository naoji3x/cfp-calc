import { type Domain, type Type } from '../common'

export interface OptionKey {
  readonly option: string
  readonly domain: Domain
  readonly item: string
  readonly type: Type
}

export interface OptionValue {
  readonly values: readonly number[]
  readonly args: readonly string[]
  readonly operation: string
  readonly citation: string
}

export type Option = OptionKey & OptionValue
