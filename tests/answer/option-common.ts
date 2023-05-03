import xlsx from 'xlsx'
import { Diagnosis } from '../../src/answer/diagnosis'
import { enumerateBaselines } from '../../src/data'
import { answer } from './answer-converter'
import { createTestCases } from './util'

export const testOption = (option: string): void => {
  // テストケースを記載したExcel
  const workbook = xlsx.readFile(
    'tests/answer/case/option-' + option + '.test-cases.xlsx'
  )
  const testCases = createTestCases(workbook)
  const diagnosis = new Diagnosis()
  const originalBaselines = enumerateBaselines()

  // 生成したDiagnosisに対してテストケースを順番に適用
  for (const testCase of testCases) {
    test('Option: ' + option + ' [' + testCase.case + ']', async () => {
      answer(testCase.answers, diagnosis)

      // 計算したestimationがexpectationとあっているを確認
      const actions = diagnosis.enumerateActions(option)
      for (const action of actions) {
        const exp = testCase.expectations.find(
          (e) =>
            e.domain === action.domain &&
            e.item === action.item &&
            e.type === action.type
        )

        expect(exp).not.toBeUndefined()
        if (exp !== undefined) {
          expect(exp.estimated).toBeTruthy()
          expect(action.value).toBeCloseTo(exp.value)
        }
      }

      // actionに重複がないことを確認
      for (let i = 0; i < actions.length; ++i) {
        for (let j = i + 1; j < actions.length; ++j) {
          expect(
            actions[i].option +
              actions[i].domain +
              actions[i].item +
              actions[i].type
          ).not.toBe(
            actions[j].option +
              actions[j].domain +
              actions[j].item +
              actions[j].type
          )
        }
      }

      // expectationがestimatedになっている場合、actionに値があるかを確認
      for (const exp of testCase.expectations) {
        const action = actions
          .filter((a) => a.option === option)
          .find(
            (a) =>
              a.domain === exp.domain &&
              a.item === exp.item &&
              a.type === exp.type
          )

        expect(Boolean(action)).toBe(exp.estimated)
      }

      // baselineが間違って書き換えられていないかを確認
      for (const baseline of diagnosis.enumerateBaselines()) {
        const org = originalBaselines.find(
          (b) =>
            b.domain === baseline.domain &&
            b.item === baseline.item &&
            b.type === baseline.type
        )

        expect(org).not.toBeUndefined()
        if (org !== undefined) {
          expect(baseline.value).toBeCloseTo(org.value)
        }
      }
    })
  }
}
