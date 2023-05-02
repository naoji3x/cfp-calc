import xlsx from 'xlsx'

/** Excelのanswersシートの1行 */
export interface Answer {
  readonly answer: string
  readonly name: string
  readonly value: string | boolean | number
}

/** Excelの各テストケースの期待値 */
export interface Expectation {
  readonly domain: string
  readonly item: string
  readonly subdomain: string
  readonly value: number
  readonly unit: string
  readonly type: string
  readonly estimated: boolean
}

/** Excelのanswersシートの1テストケース */
export class TestCase {
  constructor(testCase: string) {
    this.case = testCase
  }

  readonly case: string
  answers: Answer[] = []
  expectations: Expectation[] = []
}

export const createTestCases = (workbook: xlsx.WorkBook): TestCase[] => {
  const rows = xlsx.utils.sheet_to_json(workbook.Sheets.answers)

  const testCases: Record<string, TestCase> = {} // ケース名毎のテストケース
  const testCaseList: TestCase[] = []

  // answersシートの1行ずつを読み込み、テストケースを生成
  rows.forEach((row: any) => {
    let testCase = testCases[row.case]
    if (testCase === undefined) {
      testCase = new TestCase(row.case)
      testCases[row.case] = testCase
      testCaseList.push(testCase)
    }
    testCase.answers.push({
      answer: row.answer,
      name: row.name,
      value:
        row.valueType === 'boolean'
          ? Boolean(row.value)
          : row.valueType === 'number'
          ? Number(row.value)
          : String(row.value)
    })
  })

  // テストケースのシートから期待値を読み込み、テストケースに追加
  Object.entries(testCases).forEach(([key, value]) => {
    const expectations = xlsx.utils.sheet_to_json(workbook.Sheets[key])
    value.expectations = expectations.map((e: any) => ({
      domain: e.domain,
      item: e.item,
      subdomain: e.subdomain,
      value: e.value,
      unit: e.unit,
      type: e.type,
      estimated: e.estimated
    }))
  })

  return testCaseList
}
