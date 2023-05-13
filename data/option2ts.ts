import { parse } from 'csv-parse/sync'
import * as fs from 'fs'
import { type Domain, type Type } from '../src/common'
import { type Option } from '../src/entity/option'

const toOption = (
  option: string,
  domain: Domain,
  item: string,
  type: Type,
  record: any
): Option => {
  const values = [Number(record.value)]
  const args = record.args === '' ? [] : String(record.args).split(' ')

  if (record.operation === 'shift-from-other-items-then-reduction-rate') {
    values.push(Number(args[0]))
    args.shift()
  }

  return {
    option,
    domain,
    item,
    type,
    values,
    args,
    operation: record.operation,
    citation: record.citation
  }
}

const data = fs.readFileSync('data/option.csv')
const records = parse(data, { columns: true })

const options: Option[] = []

for (const record of records) {
  const option = String(record.option)
  const domainItemType = String(record.domain_item_type)
  const [domain, item, type] = domainItemType.split('_')
  options.push(toOption(option, domain as Domain, item, type as Type, record))
}

const header = `import { type Option } from '../entity/option'
export const options: Option[] = `
const ts = header + JSON.stringify(options, null, 2)

try {
  fs.writeFileSync('src/data/options.ts', ts)
} catch (e) {
  console.log(e)
}
