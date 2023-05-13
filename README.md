# cfp-calc

## Introduction

以下の GitHub で公開されている個人のカーボンフットプリントの算出ロジックをライブラリとして再実装しました。計算に必要な統計情報も全てコード内に埋め込んでいますので、このライブラリ単体で全ての計算が可能です。

<https://github.com/codeforjapan/JibungotoPlanet-backend>

## Feature

住居(HousingAnswer)・移動（MobilityAnswer）・食(FoodAnswer)・モノとサービス(OtherAnswer)に関する簡単な設問への回答からユーザー個人のカーボンフットプリントを算出します。

## Installing

Using npm:

```bash
% npm i cfp-calc
```

Using yarn:

```bash
% yarn add cfp-calc
```

住居・移動・食・モノとサービスに回答を設定し、Diagnosis でカーボンフットプリント推計を実施、Analysis でデータを使いやすい形に集計します。使い方は Example を参照下さい。

## Example

```typescript
import { Diagnosis, HousingAnswer, Analysis } from 'cfp-calc'

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
// ※Diagnosisでは、
//  フットプリントを計算した項目（活動量、GHG原単位）、
//  改善アクションを計算した項目のみを縦展開して保持しており、
//  分析には使いにくいためAnalysisでデータを横展開し集計を行う
const analysis = new Analysis(diagnosis)

// ベースラインの一覧を取得
const baselineItems = analysis.enumerateBaselineItems()
// ベースラインをキーを指定して取得
const baselineItem = analysis.findBaselineItem('housing', 'electricity')
// ベースラインのsubdomain別の集計の一覧を取得
const baselineSummaries = analysis.enumerateBaselineSummaries()
// ベースラインのsubdomain別の集計をキーを指定して取得
const baselineSummary = analysis.findBaselineSummary(
  'housing',
  'construction-maintenance'
)

// カーボンフットプリント排出量の推定結果の一覧を取得
const estimationItems = analysis.enumerateEstimationItems()
// カーボンフットプリント排出量の推定結果をキーを指定して取得
const estimationItem = analysis.findEstimationItem('housing', 'electricity')
// カーボンフットプリント排出量のsubdomain別の集計の一覧を取得
const estimationSummaries = analysis.enumerateEstimationSummaries()
// カーボンフットプリント排出量のsubdomain別の集計をキーを指定して取得
const estimationSummary = analysis.findEstimationSummary(
  'housing',
  'construction-maintenance'
)

// 改善アクション後の排出量の一覧を取得
const actionItems = analysis.enumerateActionItems()
// 改善アクション後の排出量をキーを指定して取得
const actionItem = analysis.findActionItem('ec', 'housing', 'urban-gas')
// 改善アクション後の排出量のsubdomain別の集計の一覧を取得
const actionSummaries = analysis.enumerateActionSummaries()
// 改善アクション後の排出量のsubdomain別の集計をキーを指定して取得
const actionSummary = analysis.findActionSummary('ec', 'housing', 'electricity')
```

## License

"cfp-calc" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
