import { Analysis } from '../../src/analysis'
import { Diagnosis } from '../../src/answer'
import { type HousingAnswer } from '../../src/answer/answer'

describe('analysis', () => {
  test('calculates footprint summaries', () => {
    // 居住に関するカーボンフットプリントを計算するための質問への回答
    const housingAnswer: HousingAnswer = {
      residentCount: 1, // 住居者数
      housingSize: '1-room', // 住居の広さ
      electricity: {
        electricityType: 'conventional', // 電力の種類
        consumptionOrLivingRegion: {
          // 使用量を直接指定するか、居住地域から推定するかを指定
          monthlyConsumption: 750, // 1ヶ月の電力使用量[kWh]
          month: 'january' // 対象月
        }
      },
      gas: {
        item: 'urban-gas', // ガスの種類
        consumptionOrLivingRegion: {
          // 使用量を直接指定するか、居住地域から推定するかを指定
          monthlyConsumption: 15, // 1ヶ月のガス使用量[m3]
          month: 'january' // 対象月
        }
      },
      kerosene: {
        monthlyConsumption: 200, // 1ヶ月の灯油使用量[L]
        monthCount: 2 // 対象月数
      }
    }

    const diagnosis = new Diagnosis() // フットプリント診断オブジェクトの生成
    diagnosis.answerHousing(housingAnswer) // 居住に関する回答を診断に反映

    // 診断結果を解析するためのオブジェクトを生成
    // ※Diagnosisはフットプリントを計算した項目（活動量、GHG原単位）、
    // 改善アクションを計算した項目のみを縦展開して保持しており、
    // 分析には使いにくいためAnalysisでデータを横展開し集計を行う
    const analysis = new Analysis(diagnosis)

    // カーボンフットプリント排出量の推定結果の一覧を取得
    const footprintItems = analysis.enumerateFootprintItems()
    // カーボンフットプリント排出量の推定結果をキーを指定して取得
    const footprintItem = analysis.findFootprintItem('housing', 'electricity')
    // カーボンフットプリント排出量のsubdomain別の集計の一覧を取得
    const footprintSummaries = analysis.enumerateFootprintSummaries()
    // カーボンフットプリント排出量のsubdomain別の集計をキーを指定して取得
    const footprintSummary = analysis.findFootprintSummary(
      'housing',
      'construction-maintenance'
    )

    expect(footprintItems.length).toBe(10)
    expect(footprintItem.amount).toBeCloseTo(6866.52378525556)
    expect(footprintSummaries.length).toBe(4)
    expect(footprintSummary.footprint).toBeCloseTo(59.75535351)
  })

  test('calculates action summaries', () => {
    const housingAnswer: HousingAnswer = {
      residentCount: 2,
      housingSize: '2-room',
      electricity: {
        electricityType: 'conventional',
        consumptionOrLivingRegion: {
          monthlyConsumption: 750,
          month: 'january'
        }
      },
      gas: {
        item: 'urban-gas',
        consumptionOrLivingRegion: {
          monthlyConsumption: 15,
          month: 'january'
        }
      },
      kerosene: {
        monthlyConsumption: 200,
        monthCount: 2
      }
    }

    const diagnosis = new Diagnosis()
    diagnosis.answerHousing(housingAnswer)

    const analysis = new Analysis(diagnosis)

    // 改善アクション後の排出量の一覧を取得
    const actionItems = analysis.enumerateActionItems()
    // 改善アクション後の排出量をキーを指定して取得
    const actionItem = analysis.findActionItem('ec', 'housing', 'urban-gas')
    // 改善アクション後の排出量のsubdomain別の集計の一覧を取得
    const actionSummaries = analysis.enumerateActionSummaries()
    // 改善アクション後の排出量のsubdomain別の集計をキーを指定して取得
    const actionSummary = analysis.findActionSummary(
      'ec',
      'housing',
      'electricity'
    )

    expect(actionItems.length).toBe(10 * 10)
    expect(actionItem.amount).toBeCloseTo(226.910739786739)
    expect(actionSummaries.length).toBe(4 * 10)
    expect(actionSummary.footprint).toBeCloseTo(2326.430112)
  })
})
