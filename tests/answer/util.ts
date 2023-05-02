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
  const answers = xlsx.utils.sheet_to_json(workbook.Sheets.answers) as any[]

  const testCases: Record<string, TestCase> = {} // ケース名毎のテストケース
  const testCaseList: TestCase[] = []

  // answersシートの1行ずつを読み込み、テストケースを生成
  for (const answer of answers) {
    let testCase = testCases[answer.case]
    if (testCase === undefined) {
      testCase = new TestCase(answer.case)
      testCases[answer.case] = testCase
      testCaseList.push(testCase)
    }
    testCase.answers.push({
      answer: answer.answer,
      name: answer.name,
      value:
        answer.valueType === 'boolean'
          ? Boolean(answer.value)
          : answer.valueType === 'number'
          ? Number(answer.value)
          : String(answer.value)
    })
  }

  // テストケースのシートから期待値を読み込み、テストケースに追加
  Object.entries(testCases).forEach(([key, value]) => {
    const expectations = xlsx.utils.sheet_to_json(workbook.Sheets[key]) as any[]
    value.expectations = expectations.map((e) => ({
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
