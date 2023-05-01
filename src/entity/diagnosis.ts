import { type Domain, type Type } from '../common'
import { type Footprint } from '../data'
import { type Action } from './action'
import { type Item } from './item'

export class Diagnosis {
  private readonly baselines: Record<string, Item> = {}
  private readonly estimations: Record<string, Item> = {}
  private readonly actions: Record<string, Action> = {}

  public addBaseline = (
    domain: Domain,
    item: string,
    type: Type,
    footprint: Footprint
  ): void => {
    const baseline: Item = {
      domain,
      item,
      type,
      subdomain: footprint.subdomain,
      value: footprint.value,
      unit: footprint.unit
    }
    this.baselines[domain + '_' + item + '_' + type] = baseline
  }

  public addEstimation = (base: Item, value: number): void => {
    const estimation: Item = {
      ...base,
      value
    }
    this.estimations[base.domain + '_' + base.item + '_' + base.type] =
      estimation
  }

  public addAction = (base: Item, option: string, value: number): void => {
    const action: Action = {
      ...base,
      option,
      value
    }
    this.actions[
      option + '_' + base.domain + '_' + base.item + '_' + base.type
    ] = action
  }

  public getBaseline = (domain: Domain, item: string, type: Type): Item =>
    this.baselines[domain + '_' + item + '_' + type]

  public getEstimation = (domain: Domain, item: string, type: Type): Item =>
    this.estimations[domain + '_' + item + '_' + type]

  public getAction = (
    option: string,
    domain: Domain,
    item: string,
    type: Type
  ): Action => this.actions[option + '_' + domain + '_' + item + '_' + type]
}
