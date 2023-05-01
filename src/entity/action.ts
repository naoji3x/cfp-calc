import { type Item } from './item'

export interface Action extends Item {
  readonly option: string
}
