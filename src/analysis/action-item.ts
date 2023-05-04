import type FootprintItem from './footprint-item'

export default interface ActionItem extends FootprintItem {
  readonly option: string
}
