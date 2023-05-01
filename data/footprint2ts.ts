import { parse } from 'csv-parse/sync'
import * as fs from 'fs'
import { type Domain, type Type } from '../src/common'
import { type Footprint } from '../src/entity/footprint'

const toFootprint = (
  directory: string,
  domain: Domain,
  item: string,
  type: Type,
  record: any
): Footprint => ({
  directory,
  domain,
  item,
  type,
  subdomain: record.subdomain,
  value: Number(record.value),
  unit: record.unit,
  citation: record.citation
})

const data = fs.readFileSync('data/footprint.csv')
const records = parse(data, { columns: true })

const footprints: Record<string, Footprint> = {}

for (const record of records) {
  const dirDomain = String(record.dir_domain)
  const itemType = String(record.item_type)
  const [directory, domain] = dirDomain.split('_')
  const [item, type] = itemType.split('_')
  footprints[dirDomain + '_' + itemType] = toFootprint(
    directory,
    domain as Domain,
    item,
    type as Type,
    record
  )
}

const header = `import { type Footprint } from '../entity/footprint'
export const footprints: Record<string, Footprint> = `
const ts = header + JSON.stringify(footprints, null, 2)

try {
  fs.writeFileSync('src/data/footprints.ts', ts)
} catch (e) {
  console.log(e)
}
