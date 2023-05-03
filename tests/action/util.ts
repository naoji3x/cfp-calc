import { type Domain, type Type } from '../../src/common'

export class Result {
  private readonly items: Record<string, number> = {}
  private readonly actions: Record<string, number> = {}

  readonly addItem = (
    domain: Domain,
    item: string,
    type: Type,
    value: number
  ): void => {
    this.items[domain + '_' + item + '_' + type] = value
  }

  readonly addAction = (
    option: string,
    domain: Domain,
    item: string,
    type: Type,
    value: number
  ): void => {
    this.actions[option + '_' + domain + '_' + item + '_' + type] = value
  }

  readonly findEstimationOrDefault = (
    domain: Domain,
    item: string,
    type: Type
  ): number => {
    return this.items[domain + '_' + item + '_' + type]
  }

  readonly findActionOrDefault = (
    option: string,
    domain: Domain,
    item: string,
    type: Type
  ): number => {
    const value = this.actions[option + '_' + domain + '_' + item + '_' + type]
    return isNaN(value)
      ? this.findEstimationOrDefault(domain, item, type)
      : value
  }
}
