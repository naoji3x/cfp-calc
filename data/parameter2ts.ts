import { parse } from 'csv-parse/sync'
import * as fs from 'fs'
import { type Parameter } from '../src/entity/parameter'

const toParameter = (record: any): Parameter => ({
  category: record.category,
  key: record.key,
  value: Number(record.value),
  unit: record.unit,
  citation: record.citation
})

const data = fs.readFileSync('data/parameter.csv')
const records = parse(data, { columns: true })

const parameters: Parameter[] = []

for (const record of records) {
  parameters.push(toParameter(record))
}

const header = `import { type Parameter } from '../entity/parameter'
export const parameters: Parameter[] = `
const ts = header + JSON.stringify(parameters, null, 2)

try {
  fs.writeFileSync('src/data/parameters.ts', ts)
} catch (e) {
  console.log(e)
}
