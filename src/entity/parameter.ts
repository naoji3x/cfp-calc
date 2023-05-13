export interface ParameterKey {
  readonly category: string
  readonly key: string
}

export interface ParameterValue {
  readonly value: number
  readonly unit: string
  readonly citation: string
}

export type Parameter = ParameterKey & ParameterValue
