import { type Domain, type Type } from '../common'
import { type Footprint, type FootprintKey } from '../entity/footprint'
import { type Option } from '../entity/option'
import { type Parameter } from '../entity/parameter'
import { footprints } from './footprints'
import { options } from './options'
import { parameters } from './parameters'

export const getBaseline = (
  domain: Domain,
  item: string,
  type: Type
): Footprint => ({
  ...footprints['baseline_' + domain + '_' + item + '_' + type]
})

export const getBaselineAmount = (domain: Domain, item: string): Footprint => ({
  ...footprints['baseline_' + domain + '_' + item + '_amount']
})

export const enumerateFootprintKeys = (domain: Domain): FootprintKey[] =>
  Object.keys(footprints)
    .filter((key) => key.startsWith(domain + '_'))
    .map((key) => {
      const values = key.split('_')
      return {
        domain,
        item: values[1],
        type: values[2] === 'amount' ? 'amount' : 'intensity'
      }
    })

export const getBaselineIntensity = (
  domain: Domain,
  item: string
): Footprint => ({
  ...footprints['baseline_' + domain + '_' + item + '_intensity']
})

export const getParameter = (category: string, key: string): Parameter => ({
  ...parameters[category + '_' + key]
})

export const getOption = (
  option: string,
  domain: Domain,
  item: string,
  type: Type
): Option => ({
  ...options[option + '_' + domain + '_' + item + '_' + type]
})
