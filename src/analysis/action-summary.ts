import type FootprintSummary from './footprint-summary'

export default interface ActionSummary extends FootprintSummary {
  readonly option: string
}
