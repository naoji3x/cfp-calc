import { type Domain } from '../common'
import { type Footprint } from '../entity/footprint'
import { type Option } from '../entity/option'
import { type Parameter } from '../entity/parameter'
import { footprints } from './footprints'
import { options } from './options'
import { parameters } from './parameters'

const footprintsByKey: Record<string, Footprint> = footprints.reduce(
  (acc: Record<string, Footprint>, footprint: Footprint) => {
    acc[
      footprint.directory +
        '_' +
        footprint.domain +
        '_' +
        footprint.item +
        '_' +
        footprint.type
    ] = footprint
    return acc
  },
  {}
)

const parametersByKey: Record<string, Parameter> = parameters.reduce(
  (acc: Record<string, Parameter>, parameter: Parameter) => {
    acc[parameter.category + '_' + parameter.key] = parameter
    return acc
  },
  {}
)

export const enumerateBaselines = (): readonly Footprint[] => footprints

export const getBaselineAmount = (domain: Domain, item: string): Footprint =>
  footprintsByKey['baseline_' + domain + '_' + item + '_amount']

export const getBaselineIntensity = (domain: Domain, item: string): Footprint =>
  footprintsByKey['baseline_' + domain + '_' + item + '_intensity']

export const getParameter = (category: string, key: string): Parameter =>
  parametersByKey[category + '_' + key]

export const enumerateOptions = (): readonly Option[] => options
