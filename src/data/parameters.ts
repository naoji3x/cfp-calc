import { type Parameter } from '../entity/parameter'
export const parameters: Record<string, Parameter> = {
  'family-size_unknown': {
    category: 'family-size',
    key: 'unknown',
    value: 2.33,
    unit: 'person',
    citation: '総務省統計局. 2015. 国勢調査'
  },
  'housing-size_1-room': {
    category: 'housing-size',
    key: '1-room',
    value: 20,
    unit: 'm2',
    citation: 'Assumption'
  },
  'housing-size_2-room': {
    category: 'housing-size',
    key: '2-room',
    value: 30,
    unit: 'm2',
    citation: 'Assumption'
  },
  'housing-size_3-room': {
    category: 'housing-size',
    key: '3-room',
    value: 40,
    unit: 'm2',
    citation: 'Assumption'
  },
  'housing-size_4-room': {
    category: 'housing-size',
    key: '4-room',
    value: 60,
    unit: 'm2',
    citation: 'Assumption'
  },
  'housing-size_5-6-room': {
    category: 'housing-size',
    key: '5-6-room',
    value: 80,
    unit: 'm2',
    citation: 'Assumption'
  },
  'housing-size_7-more-room': {
    category: 'housing-size',
    key: '7-more-room',
    value: 120,
    unit: 'm2',
    citation: 'Assumption'
  },
  'housing-size_unknown': {
    category: 'housing-size',
    key: 'unknown',
    value: 38.99612182,
    unit: 'm2',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'electricity-intensity_conventional': {
    category: 'electricity-intensity',
    key: 'conventional',
    value: 0.634319811,
    unit: 'kgCO2e/kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'electricity-intensity_30-renewable': {
    category: 'electricity-intensity',
    key: '30-renewable',
    value: 0.53349389,
    unit: 'kgCO2e/kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'electricity-intensity_50-renewable': {
    category: 'electricity-intensity',
    key: '50-renewable',
    value: 0.399059329,
    unit: 'kgCO2e/kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'electricity-intensity_100-renewable': {
    category: 'electricity-intensity',
    key: '100-renewable',
    value: 0.062972926,
    unit: 'kgCO2e/kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'electricity-intensity_solar-panel': {
    category: 'electricity-intensity',
    key: 'solar-panel',
    value: 0.042861845,
    unit: 'kgCO2e/kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'electricity-intensity_unknown': {
    category: 'electricity-intensity',
    key: 'unknown',
    value: 0.634319811,
    unit: 'kgCO2e/kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'electricity-intensity-factor_conventional': {
    category: 'electricity-intensity-factor',
    key: 'conventional',
    value: 0,
    unit: 'kgCO2e/kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'electricity-intensity-factor_30-renewable': {
    category: 'electricity-intensity-factor',
    key: '30-renewable',
    value: 0.176470588,
    unit: 'kgCO2e/kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'electricity-intensity-factor_50-renewable': {
    category: 'electricity-intensity-factor',
    key: '50-renewable',
    value: 0.411764706,
    unit: 'kgCO2e/kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'electricity-intensity-factor_100-renewable': {
    category: 'electricity-intensity-factor',
    key: '100-renewable',
    value: 1,
    unit: 'kgCO2e/kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'electricity-intensity-factor_solar-panel': {
    category: 'electricity-intensity-factor',
    key: 'solar-panel',
    value: 1,
    unit: 'kgCO2e/kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'electricity-intensity-factor_unknown': {
    category: 'electricity-intensity-factor',
    key: 'unknown',
    value: 0,
    unit: 'kgCO2e/kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'energy-amount-unknown_electricity': {
    category: 'energy-amount-unknown',
    key: 'electricity',
    value: 2156.268842,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'energy-amount-unknown_gas': {
    category: 'energy-amount-unknown',
    key: 'gas',
    value: 1325.561369,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'energy-amount-unknown_kerosene': {
    category: 'energy-amount-unknown',
    key: 'kerosene',
    value: 650.7599302,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'energy-heat-intensity_urban-gas': {
    category: 'energy-heat-intensity',
    key: 'urban-gas',
    value: 11.0399255,
    unit: 'kWh/m3',
    citation:
      '資源エネルギー庁. 2006. 市町村別エネルギー消費統計作成のためのガイドライン'
  },
  'energy-heat-intensity_lpg': {
    category: 'energy-heat-intensity',
    key: 'lpg',
    value: 27.916689,
    unit: 'kWh/m3',
    citation:
      '資源エネルギー庁. 2006. 市町村別エネルギー消費統計作成のためのガイドライン'
  },
  'energy-heat-intensity_kerosene': {
    category: 'energy-heat-intensity',
    key: 'kerosene',
    value: 10.1944526,
    unit: 'kWh/L',
    citation:
      '資源エネルギー庁. 2006. 市町村別エネルギー消費統計作成のためのガイドライン'
  },
  'electricity-season-factor_january': {
    category: 'electricity-season-factor',
    key: 'january',
    value: 9.155365047,
    unit: 'times',
    citation: '総務省統計局. 2015. 電気使用量の推移 平成27年２月27日より算出'
  },
  'electricity-season-factor_february': {
    category: 'electricity-season-factor',
    key: 'february',
    value: 8.92083057,
    unit: 'times',
    citation: '総務省統計局. 2015. 電気使用量の推移 平成27年２月27日より算出'
  },
  'electricity-season-factor_march': {
    category: 'electricity-season-factor',
    key: 'march',
    value: 9.165491073,
    unit: 'times',
    citation: '総務省統計局. 2015. 電気使用量の推移 平成27年２月27日より算出'
  },
  'electricity-season-factor_april': {
    category: 'electricity-season-factor',
    key: 'april',
    value: 10.81397346,
    unit: 'times',
    citation: '総務省統計局. 2015. 電気使用量の推移 平成27年２月27日より算出'
  },
  'electricity-season-factor_may': {
    category: 'electricity-season-factor',
    key: 'may',
    value: 12.9543285,
    unit: 'times',
    citation: '総務省統計局. 2015. 電気使用量の推移 平成27年２月27日より算出'
  },
  'electricity-season-factor_june': {
    category: 'electricity-season-factor',
    key: 'june',
    value: 14.98864011,
    unit: 'times',
    citation: '総務省統計局. 2015. 電気使用量の推移 平成27年２月27日より算出'
  },
  'electricity-season-factor_july': {
    category: 'electricity-season-factor',
    key: 'july',
    value: 15.46045726,
    unit: 'times',
    citation: '総務省統計局. 2015. 電気使用量の推移 平成27年２月27日より算出'
  },
  'electricity-season-factor_august': {
    category: 'electricity-season-factor',
    key: 'august',
    value: 13.1065718,
    unit: 'times',
    citation: '総務省統計局. 2015. 電気使用量の推移 平成27年２月27日より算出'
  },
  'electricity-season-factor_september': {
    category: 'electricity-season-factor',
    key: 'september',
    value: 13.1141993,
    unit: 'times',
    citation: '総務省統計局. 2015. 電気使用量の推移 平成27年２月27日より算出'
  },
  'electricity-season-factor_october': {
    category: 'electricity-season-factor',
    key: 'october',
    value: 14.58262306,
    unit: 'times',
    citation: '総務省統計局. 2015. 電気使用量の推移 平成27年２月27日より算出'
  },
  'electricity-season-factor_november': {
    category: 'electricity-season-factor',
    key: 'november',
    value: 14.71506023,
    unit: 'times',
    citation: '総務省統計局. 2015. 電気使用量の推移 平成27年２月27日より算出'
  },
  'electricity-season-factor_december': {
    category: 'electricity-season-factor',
    key: 'december',
    value: 12.59071628,
    unit: 'times',
    citation: '総務省統計局. 2015. 電気使用量の推移 平成27年２月27日より算出'
  },
  'gas-season-factor_january': {
    category: 'gas-season-factor',
    key: 'january',
    value: 6.916666667,
    unit: 'times',
    citation:
      '環境省. 2015. 家庭からの二酸化炭素排出量の推計に係る実態調査 全国試験調査 平成26年10月～平成27年9月より算出 '
  },
  'gas-season-factor_february': {
    category: 'gas-season-factor',
    key: 'february',
    value: 7.720930233,
    unit: 'times',
    citation:
      '環境省. 2015. 家庭からの二酸化炭素排出量の推計に係る実態調査 全国試験調査 平成26年10月～平成27年9月より算出 '
  },
  'gas-season-factor_march': {
    category: 'gas-season-factor',
    key: 'march',
    value: 8.512820513,
    unit: 'times',
    citation:
      '環境省. 2015. 家庭からの二酸化炭素排出量の推計に係る実態調査 全国試験調査 平成26年10月～平成27年9月より算出 '
  },
  'gas-season-factor_april': {
    category: 'gas-season-factor',
    key: 'april',
    value: 9.485714286,
    unit: 'times',
    citation:
      '環境省. 2015. 家庭からの二酸化炭素排出量の推計に係る実態調査 全国試験調査 平成26年10月～平成27年9月より算出 '
  },
  'gas-season-factor_may': {
    category: 'gas-season-factor',
    key: 'may',
    value: 12.76923077,
    unit: 'times',
    citation:
      '環境省. 2015. 家庭からの二酸化炭素排出量の推計に係る実態調査 全国試験調査 平成26年10月～平成27年9月より算出 '
  },
  'gas-season-factor_june': {
    category: 'gas-season-factor',
    key: 'june',
    value: 16.6,
    unit: 'times',
    citation:
      '環境省. 2015. 家庭からの二酸化炭素排出量の推計に係る実態調査 全国試験調査 平成26年10月～平成27年9月より算出 '
  },
  'gas-season-factor_july': {
    category: 'gas-season-factor',
    key: 'july',
    value: 18.44444444,
    unit: 'times',
    citation:
      '環境省. 2015. 家庭からの二酸化炭素排出量の推計に係る実態調査 全国試験調査 平成26年10月～平成27年9月より算出 '
  },
  'gas-season-factor_august': {
    category: 'gas-season-factor',
    key: 'august',
    value: 23.71428571,
    unit: 'times',
    citation:
      '環境省. 2015. 家庭からの二酸化炭素排出量の推計に係る実態調査 全国試験調査 平成26年10月～平成27年9月より算出 '
  },
  'gas-season-factor_september': {
    category: 'gas-season-factor',
    key: 'september',
    value: 23.71428571,
    unit: 'times',
    citation:
      '環境省. 2015. 家庭からの二酸化炭素排出量の推計に係る実態調査 全国試験調査 平成26年10月～平成27年9月より算出 '
  },
  'gas-season-factor_october': {
    category: 'gas-season-factor',
    key: 'october',
    value: 18.44444444,
    unit: 'times',
    citation:
      '環境省. 2015. 家庭からの二酸化炭素排出量の推計に係る実態調査 全国試験調査 平成26年10月～平成27年9月より算出 '
  },
  'gas-season-factor_november': {
    category: 'gas-season-factor',
    key: 'november',
    value: 13.83333333,
    unit: 'times',
    citation:
      '環境省. 2015. 家庭からの二酸化炭素排出量の推計に係る実態調査 全国試験調査 平成26年10月～平成27年9月より算出 '
  },
  'gas-season-factor_december': {
    category: 'gas-season-factor',
    key: 'december',
    value: 10.06060606,
    unit: 'times',
    citation:
      '環境省. 2015. 家庭からの二酸化炭素排出量の推計に係る実態調査 全国試験調査 平成26年10月～平成27年9月より算出 '
  },
  'housing-amount-by-region_northeast_imputed-rent-amount': {
    category: 'housing-amount-by-region',
    key: 'northeast_imputed-rent-amount',
    value: 38.98080772,
    unit: 'm2',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_northeast_rent-amount': {
    category: 'housing-amount-by-region',
    key: 'northeast_rent-amount',
    value: 8.518158765,
    unit: 'm2',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_northeast_land-rent-amount': {
    category: 'housing-amount-by-region',
    key: 'northeast_land-rent-amount',
    value: 0.428215789,
    unit: 'm2',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_northeast_housing-maintenance-amount': {
    category: 'housing-amount-by-region',
    key: 'northeast_housing-maintenance-amount',
    value: 42.19606566,
    unit: '000JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_northeast_electricity-amount': {
    category: 'housing-amount-by-region',
    key: 'northeast_electricity-amount',
    value: 2429.879348,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_northeast_urban-gas-amount': {
    category: 'housing-amount-by-region',
    key: 'northeast_urban-gas-amount',
    value: 483.3918243,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_northeast_lpg-amount': {
    category: 'housing-amount-by-region',
    key: 'northeast_lpg-amount',
    value: 449.045623,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_northeast_kerosene-amount': {
    category: 'housing-amount-by-region',
    key: 'northeast_kerosene-amount',
    value: 2171.346349,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_northeast_other-energy-amount': {
    category: 'housing-amount-by-region',
    key: 'northeast_other-energy-amount',
    value: 57.80704881,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_northeast_water-amount': {
    category: 'housing-amount-by-region',
    key: 'northeast_water-amount',
    value: 96.53645058,
    unit: 'm3',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_middle_imputed-rent-amount': {
    category: 'housing-amount-by-region',
    key: 'middle_imputed-rent-amount',
    value: 32.00344548,
    unit: 'm2',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_middle_rent-amount': {
    category: 'housing-amount-by-region',
    key: 'middle_rent-amount',
    value: 6.063525186,
    unit: 'm2',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_middle_land-rent-amount': {
    category: 'housing-amount-by-region',
    key: 'middle_land-rent-amount',
    value: 1.7464516,
    unit: 'm2',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_middle_housing-maintenance-amount': {
    category: 'housing-amount-by-region',
    key: 'middle_housing-maintenance-amount',
    value: 41.78341404,
    unit: '000JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_middle_electricity-amount': {
    category: 'housing-amount-by-region',
    key: 'middle_electricity-amount',
    value: 2249.623235,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_middle_urban-gas-amount': {
    category: 'housing-amount-by-region',
    key: 'middle_urban-gas-amount',
    value: 839.5280673,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_middle_lpg-amount': {
    category: 'housing-amount-by-region',
    key: 'middle_lpg-amount',
    value: 468.1377938,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_middle_kerosene-amount': {
    category: 'housing-amount-by-region',
    key: 'middle_kerosene-amount',
    value: 418.9412402,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_middle_other-energy-amount': {
    category: 'housing-amount-by-region',
    key: 'middle_other-energy-amount',
    value: 59.5350204,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_middle_water-amount': {
    category: 'housing-amount-by-region',
    key: 'middle_water-amount',
    value: 103.1075979,
    unit: 'm3',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_southwest_imputed-rent-amount': {
    category: 'housing-amount-by-region',
    key: 'southwest_imputed-rent-amount',
    value: 23.4960231,
    unit: 'm2',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_southwest_rent-amount': {
    category: 'housing-amount-by-region',
    key: 'southwest_rent-amount',
    value: 11.67527498,
    unit: 'm2',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_southwest_land-rent-amount': {
    category: 'housing-amount-by-region',
    key: 'southwest_land-rent-amount',
    value: 1.364856292,
    unit: 'm2',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_southwest_housing-maintenance-amount': {
    category: 'housing-amount-by-region',
    key: 'southwest_housing-maintenance-amount',
    value: 36.20086626,
    unit: '000JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_southwest_electricity-amount': {
    category: 'housing-amount-by-region',
    key: 'southwest_electricity-amount',
    value: 2000.687747,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_southwest_urban-gas-amount': {
    category: 'housing-amount-by-region',
    key: 'southwest_urban-gas-amount',
    value: 278.4233619,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_southwest_lpg-amount': {
    category: 'housing-amount-by-region',
    key: 'southwest_lpg-amount',
    value: 722.6599564,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_southwest_kerosene-amount': {
    category: 'housing-amount-by-region',
    key: 'southwest_kerosene-amount',
    value: 338.5522031,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_southwest_other-energy-amount': {
    category: 'housing-amount-by-region',
    key: 'southwest_other-energy-amount',
    value: 51.57550805,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_southwest_water-amount': {
    category: 'housing-amount-by-region',
    key: 'southwest_water-amount',
    value: 89.94119651,
    unit: 'm3',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_unknown_imputed-rent-amount': {
    category: 'housing-amount-by-region',
    key: 'unknown_imputed-rent-amount',
    value: 32.06179314,
    unit: 'm2',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_unknown_rent-amount': {
    category: 'housing-amount-by-region',
    key: 'unknown_rent-amount',
    value: 6.934328682,
    unit: 'm2',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_unknown_land-rent-amount': {
    category: 'housing-amount-by-region',
    key: 'unknown_land-rent-amount',
    value: 1.96142204,
    unit: 'm2',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_unknown_housing-maintenance-amount': {
    category: 'housing-amount-by-region',
    key: 'unknown_housing-maintenance-amount',
    value: 44.18305217,
    unit: '000JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_unknown_electricity-amount': {
    category: 'housing-amount-by-region',
    key: 'unknown_electricity-amount',
    value: 2156.268842,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_unknown_urban-gas-amount': {
    category: 'housing-amount-by-region',
    key: 'unknown_urban-gas-amount',
    value: 886.8038344,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_unknown_lpg-amount': {
    category: 'housing-amount-by-region',
    key: 'unknown_lpg-amount',
    value: 438.7575348,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_unknown_kerosene-amount': {
    category: 'housing-amount-by-region',
    key: 'unknown_kerosene-amount',
    value: 650.7599302,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_unknown_other-energy-amount': {
    category: 'housing-amount-by-region',
    key: 'unknown_other-energy-amount',
    value: 54.81742592,
    unit: 'kWh',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-amount-by-region_unknown_water-amount': {
    category: 'housing-amount-by-region',
    key: 'unknown_water-amount',
    value: 103.5505,
    unit: 'm3',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-insulation_no-insulation_clothing': {
    category: 'housing-insulation',
    key: 'no-insulation_clothing',
    value: -0.4,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-insulation_2-level_clothing': {
    category: 'housing-insulation',
    key: '2-level_clothing',
    value: -0.4,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-insulation_3-level_clothing': {
    category: 'housing-insulation',
    key: '3-level_clothing',
    value: -0.2,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-insulation_4-level_clothing': {
    category: 'housing-insulation',
    key: '4-level_clothing',
    value: -0.1,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-insulation_unknown_clothing': {
    category: 'housing-insulation',
    key: 'unknown_clothing',
    value: -0.4,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-insulation_no-insulation_renovation': {
    category: 'housing-insulation',
    key: 'no-insulation_renovation',
    value: -0.607142857,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-insulation_2-level_renovation': {
    category: 'housing-insulation',
    key: '2-level_renovation',
    value: -0.435897436,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-insulation_3-level_renovation': {
    category: 'housing-insulation',
    key: '3-level_renovation',
    value: -0.3125,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-insulation_4-level_renovation': {
    category: 'housing-insulation',
    key: '4-level_renovation',
    value: 0,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'housing-insulation_unknown_renovation': {
    category: 'housing-insulation',
    key: 'unknown_renovation',
    value: -0.478549419,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_gasoline_driving-factor': {
    category: 'car-intensity-factor',
    key: 'gasoline_driving-factor',
    value: 1.140989342,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_light_driving-factor': {
    category: 'car-intensity-factor',
    key: 'light_driving-factor',
    value: 0.847680722,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_hv_driving-factor': {
    category: 'car-intensity-factor',
    key: 'hv_driving-factor',
    value: 0.731232701,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_phv_driving-factor': {
    category: 'car-intensity-factor',
    key: 'phv_driving-factor',
    value: 0.656334942,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_ev_driving-factor': {
    category: 'car-intensity-factor',
    key: 'ev_driving-factor',
    value: 0.606403103,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_unknown_driving-factor': {
    category: 'car-intensity-factor',
    key: 'unknown_driving-factor',
    value: 1,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_gasoline_manufacturing-factor': {
    category: 'car-intensity-factor',
    key: 'gasoline_manufacturing-factor',
    value: 0.986856847,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_light_manufacturing-factor': {
    category: 'car-intensity-factor',
    key: 'light_manufacturing-factor',
    value: 0.986856847,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_hv_manufacturing-factor': {
    category: 'car-intensity-factor',
    key: 'hv_manufacturing-factor',
    value: 1.085542532,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_phv_manufacturing-factor': {
    category: 'car-intensity-factor',
    key: 'phv_manufacturing-factor',
    value: 1.649976509,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_ev_manufacturing-factor': {
    category: 'car-intensity-factor',
    key: 'ev_manufacturing-factor',
    value: 2.214410486,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_unknown_manufacturing-factor': {
    category: 'car-intensity-factor',
    key: 'unknown_manufacturing-factor',
    value: 1,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_gasoline_driving-intensity': {
    category: 'car-intensity-factor',
    key: 'gasoline_driving-intensity',
    value: 0.150984647,
    unit: 'kgCO2eq/km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_light_driving-intensity': {
    category: 'car-intensity-factor',
    key: 'light_driving-intensity',
    value: 0.112171753,
    unit: 'kgCO2eq/km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_hv_driving-intensity': {
    category: 'car-intensity-factor',
    key: 'hv_driving-intensity',
    value: 0.096762438,
    unit: 'kgCO2eq/km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_phv_driving-intensity': {
    category: 'car-intensity-factor',
    key: 'phv_driving-intensity',
    value: 0.08685138,
    unit: 'kgCO2eq/km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_ev_driving-intensity': {
    category: 'car-intensity-factor',
    key: 'ev_driving-intensity',
    value: 0.080244008,
    unit: 'kgCO2eq/km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_unknown_driving-intensity': {
    category: 'car-intensity-factor',
    key: 'unknown_driving-intensity',
    value: 0.132327833,
    unit: 'kgCO2eq/km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_gasoline_manufacturing-intensity': {
    category: 'car-intensity-factor',
    key: 'gasoline_manufacturing-intensity',
    value: 4100,
    unit: 'kgCO2/car',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_light_manufacturing-intensity': {
    category: 'car-intensity-factor',
    key: 'light_manufacturing-intensity',
    value: 4100,
    unit: 'kgCO2/car',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_hv_manufacturing-intensity': {
    category: 'car-intensity-factor',
    key: 'hv_manufacturing-intensity',
    value: 4510,
    unit: 'kgCO2/car',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_phv_manufacturing-intensity': {
    category: 'car-intensity-factor',
    key: 'phv_manufacturing-intensity',
    value: 6855,
    unit: 'kgCO2/car',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_ev_manufacturing-intensity': {
    category: 'car-intensity-factor',
    key: 'ev_manufacturing-intensity',
    value: 9200,
    unit: 'kgCO2/car',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_unknown_manufacturing-intensity': {
    category: 'car-intensity-factor',
    key: 'unknown_manufacturing-intensity',
    value: 4154.604604,
    unit: 'kgCO2/car',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_gasoline_electricity-intensity': {
    category: 'car-intensity-factor',
    key: 'gasoline_electricity-intensity',
    value: 0,
    unit: 'kWh/km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_light_electricity-intensity': {
    category: 'car-intensity-factor',
    key: 'light_electricity-intensity',
    value: 0,
    unit: 'kWh/km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_hv_electricity-intensity': {
    category: 'car-intensity-factor',
    key: 'hv_electricity-intensity',
    value: 0,
    unit: 'kWh/km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_phv_electricity-intensity': {
    category: 'car-intensity-factor',
    key: 'phv_electricity-intensity',
    value: 0.05129771,
    unit: 'kWh/km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_ev_electricity-intensity': {
    category: 'car-intensity-factor',
    key: 'ev_electricity-intensity',
    value: 0.085496183,
    unit: 'kWh/km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-intensity-factor_unknown_electricity-intensity': {
    category: 'car-intensity-factor',
    key: 'unknown_electricity-intensity',
    value: 0,
    unit: 'kWh/km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-charging_charge-almost-at-home': {
    category: 'car-charging',
    key: 'charge-almost-at-home',
    value: 0.9,
    unit: 'times',
    citation: 'Assumption'
  },
  'car-charging_use-charging-spots-occasionally': {
    category: 'car-charging',
    key: 'use-charging-spots-occasionally',
    value: 0.7,
    unit: 'times',
    citation: 'Assumption'
  },
  'car-charging_use-charging-spots-sometimes': {
    category: 'car-charging',
    key: 'use-charging-spots-sometimes',
    value: 0.5,
    unit: 'times',
    citation: 'Assumption'
  },
  'car-charging_use-charging-spots-usually': {
    category: 'car-charging',
    key: 'use-charging-spots-usually',
    value: 0.1,
    unit: 'times',
    citation: 'Assumption'
  },
  'car-charging_unknown': {
    category: 'car-charging',
    key: 'unknown',
    value: 0.7,
    unit: 'times',
    citation: 'Assumption'
  },
  'renewable-car-intensity-factor_phv_driving-factor': {
    category: 'renewable-car-intensity-factor',
    key: 'phv_driving-factor',
    value: 0.328206127,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'renewable-car-intensity-factor_ev_driving-factor': {
    category: 'renewable-car-intensity-factor',
    key: 'ev_driving-factor',
    value: 0.059521744,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'renewable-car-intensity-factor_phv_driving-intensity': {
    category: 'renewable-car-intensity-factor',
    key: 'phv_driving-intensity',
    value: 0.043430805,
    unit: 'kgCO2eq/km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'renewable-car-intensity-factor_ev_driving-intensity': {
    category: 'renewable-car-intensity-factor',
    key: 'ev_driving-intensity',
    value: 0.007876383,
    unit: 'kgCO2eq/km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'car-passengers_1_private-car-factor': {
    category: 'car-passengers',
    key: '1_private-car-factor',
    value: 1.31,
    unit: 'times',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_1-2_private-car-factor': {
    category: 'car-passengers',
    key: '1-2_private-car-factor',
    value: 0.873333333,
    unit: 'times',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_2_private-car-factor': {
    category: 'car-passengers',
    key: '2_private-car-factor',
    value: 0.655,
    unit: 'times',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_2-3_private-car-factor': {
    category: 'car-passengers',
    key: '2-3_private-car-factor',
    value: 0.524,
    unit: 'times',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_3_private-car-factor': {
    category: 'car-passengers',
    key: '3_private-car-factor',
    value: 0.436666667,
    unit: 'times',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_3-4_private-car-factor': {
    category: 'car-passengers',
    key: '3-4_private-car-factor',
    value: 0.374285714,
    unit: 'times',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_4-more_private-car-factor': {
    category: 'car-passengers',
    key: '4-more_private-car-factor',
    value: 0.3275,
    unit: 'times',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_unknown_private-car-factor': {
    category: 'car-passengers',
    key: 'unknown_private-car-factor',
    value: 1,
    unit: 'times',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_1_taxi-factor': {
    category: 'car-passengers',
    key: '1_taxi-factor',
    value: 1.65,
    unit: 'times',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_1-2_taxi-factor': {
    category: 'car-passengers',
    key: '1-2_taxi-factor',
    value: 1.1,
    unit: 'times',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_2_taxi-factor': {
    category: 'car-passengers',
    key: '2_taxi-factor',
    value: 0.825,
    unit: 'times',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_2-3_taxi-factor': {
    category: 'car-passengers',
    key: '2-3_taxi-factor',
    value: 0.66,
    unit: 'times',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_3_taxi-factor': {
    category: 'car-passengers',
    key: '3_taxi-factor',
    value: 0.55,
    unit: 'times',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_3-4_taxi-factor': {
    category: 'car-passengers',
    key: '3-4_taxi-factor',
    value: 0.471428571,
    unit: 'times',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_4-more_taxi-factor': {
    category: 'car-passengers',
    key: '4-more_taxi-factor',
    value: 0.4125,
    unit: 'times',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_unknown_taxi-factor': {
    category: 'car-passengers',
    key: 'unknown_taxi-factor',
    value: 1,
    unit: 'times',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_1_private-car-passengers': {
    category: 'car-passengers',
    key: '1_private-car-passengers',
    value: 1,
    unit: 'person',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_1-2_private-car-passengers': {
    category: 'car-passengers',
    key: '1-2_private-car-passengers',
    value: 1.5,
    unit: 'person',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_2_private-car-passengers': {
    category: 'car-passengers',
    key: '2_private-car-passengers',
    value: 2,
    unit: 'person',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_2-3_private-car-passengers': {
    category: 'car-passengers',
    key: '2-3_private-car-passengers',
    value: 2.5,
    unit: 'person',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_3_private-car-passengers': {
    category: 'car-passengers',
    key: '3_private-car-passengers',
    value: 3,
    unit: 'person',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_3-4_private-car-passengers': {
    category: 'car-passengers',
    key: '3-4_private-car-passengers',
    value: 3.5,
    unit: 'person',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_4-more_private-car-passengers': {
    category: 'car-passengers',
    key: '4-more_private-car-passengers',
    value: 4,
    unit: 'person',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_unknown_private-car-passengers': {
    category: 'car-passengers',
    key: 'unknown_private-car-passengers',
    value: 1.31,
    unit: 'person',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_1_taxi-passengers': {
    category: 'car-passengers',
    key: '1_taxi-passengers',
    value: 1,
    unit: 'person',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_1-2_taxi-passengers': {
    category: 'car-passengers',
    key: '1-2_taxi-passengers',
    value: 1.5,
    unit: 'person',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_2_taxi-passengers': {
    category: 'car-passengers',
    key: '2_taxi-passengers',
    value: 2,
    unit: 'person',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_2-3_taxi-passengers': {
    category: 'car-passengers',
    key: '2-3_taxi-passengers',
    value: 2.5,
    unit: 'person',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_3_taxi-passengers': {
    category: 'car-passengers',
    key: '3_taxi-passengers',
    value: 3,
    unit: 'person',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_3-4_taxi-passengers': {
    category: 'car-passengers',
    key: '3-4_taxi-passengers',
    value: 3.5,
    unit: 'person',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_4-more_taxi-passengers': {
    category: 'car-passengers',
    key: '4-more_taxi-passengers',
    value: 4,
    unit: 'person',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'car-passengers_unknown_taxi-passengers': {
    category: 'car-passengers',
    key: 'unknown_taxi-passengers',
    value: 1.65,
    unit: 'person',
    citation:
      '国土交通省. 2015. 全国道路・街路交通情勢調査 自動車起終点調査（OD調査）結果より算出 '
  },
  'transportation-speed_car-speed': {
    category: 'transportation-speed',
    key: 'car-speed',
    value: 25,
    unit: 'km/hour',
    citation: 'Assumption'
  },
  'transportation-speed_train-speed': {
    category: 'transportation-speed',
    key: 'train-speed',
    value: 60,
    unit: 'km/hour',
    citation: 'Assumption'
  },
  'transportation-speed_bus-speed': {
    category: 'transportation-speed',
    key: 'bus-speed',
    value: 10,
    unit: 'km/hour',
    citation: 'Assumption'
  },
  'transportation-speed_motorbike-speed': {
    category: 'transportation-speed',
    key: 'motorbike-speed',
    value: 25,
    unit: 'km/hour',
    citation: 'Assumption'
  },
  'transportation-speed_long-distance-car-speed': {
    category: 'transportation-speed',
    key: 'long-distance-car-speed',
    value: 60,
    unit: 'km/hour',
    citation: 'Assumption'
  },
  'transportation-speed_long-distance-train-speed': {
    category: 'transportation-speed',
    key: 'long-distance-train-speed',
    value: 100,
    unit: 'km/hour',
    citation: 'Assumption'
  },
  'transportation-speed_express-bus-speed': {
    category: 'transportation-speed',
    key: 'express-bus-speed',
    value: 50,
    unit: 'km/hour',
    citation: 'Assumption'
  },
  'transportation-speed_long-distance-motorbike-speed': {
    category: 'transportation-speed',
    key: 'long-distance-motorbike-speed',
    value: 60,
    unit: 'km/hour',
    citation: 'Assumption'
  },
  'transportation-speed_airplane-speed': {
    category: 'transportation-speed',
    key: 'airplane-speed',
    value: 600,
    unit: 'km/hour',
    citation: 'Assumption'
  },
  'transportation-speed_ferry-speed': {
    category: 'transportation-speed',
    key: 'ferry-speed',
    value: 40,
    unit: 'km/hour',
    citation: 'Assumption'
  },
  'misc_weeks-per-year-excluding-long-vacations': {
    category: 'misc',
    key: 'weeks-per-year-excluding-long-vacations',
    value: 49,
    unit: 'week',
    citation: 'Assumption'
  },
  'mileage-by-area_major-city-or-metropolitan-area_airplane': {
    category: 'mileage-by-area',
    key: 'major-city-or-metropolitan-area_airplane',
    value: 1507.345223,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-150k-more_airplane': {
    category: 'mileage-by-area',
    key: 'city-150k-more_airplane',
    value: 1144.893404,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-50k-150k_airplane': {
    category: 'mileage-by-area',
    key: 'city-50k-150k_airplane',
    value: 1016.677146,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_area-less-than-50k_airplane': {
    category: 'mileage-by-area',
    key: 'area-less-than-50k_airplane',
    value: 775.2649318,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_unknown_airplane': {
    category: 'mileage-by-area',
    key: 'unknown_airplane',
    value: 1161.463556,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_major-city-or-metropolitan-area_train': {
    category: 'mileage-by-area',
    key: 'major-city-or-metropolitan-area_train',
    value: 4002.878879,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-150k-more_train': {
    category: 'mileage-by-area',
    key: 'city-150k-more_train',
    value: 2831.211796,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-50k-150k_train': {
    category: 'mileage-by-area',
    key: 'city-50k-150k_train',
    value: 2506.637751,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_area-less-than-50k_train': {
    category: 'mileage-by-area',
    key: 'area-less-than-50k_train',
    value: 1544.263668,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_unknown_train': {
    category: 'mileage-by-area',
    key: 'unknown_train',
    value: 2883.143695,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_major-city-or-metropolitan-area_bus': {
    category: 'mileage-by-area',
    key: 'major-city-or-metropolitan-area_bus',
    value: 698.5895508,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-150k-more_bus': {
    category: 'mileage-by-area',
    key: 'city-150k-more_bus',
    value: 388.0210822,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-50k-150k_bus': {
    category: 'mileage-by-area',
    key: 'city-50k-150k_bus',
    value: 310.4002107,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_area-less-than-50k_bus': {
    category: 'mileage-by-area',
    key: 'area-less-than-50k_bus',
    value: 304.4881964,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_unknown_bus': {
    category: 'mileage-by-area',
    key: 'unknown_bus',
    value: 430.6177624,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_major-city-or-metropolitan-area_ferry': {
    category: 'mileage-by-area',
    key: 'major-city-or-metropolitan-area_ferry',
    value: 20.16526175,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-150k-more_ferry': {
    category: 'mileage-by-area',
    key: 'city-150k-more_ferry',
    value: 20.85237234,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-50k-150k_ferry': {
    category: 'mileage-by-area',
    key: 'city-50k-150k_ferry',
    value: 20.92105917,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_area-less-than-50k_ferry': {
    category: 'mileage-by-area',
    key: 'area-less-than-50k_ferry',
    value: 17.30611523,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_unknown_ferry': {
    category: 'mileage-by-area',
    key: 'unknown_ferry',
    value: 20.10019321,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_major-city-or-metropolitan-area_taxi': {
    category: 'mileage-by-area',
    key: 'major-city-or-metropolitan-area_taxi',
    value: 77.0691577,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-150k-more_taxi': {
    category: 'mileage-by-area',
    key: 'city-150k-more_taxi',
    value: 44.27463,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-50k-150k_taxi': {
    category: 'mileage-by-area',
    key: 'city-50k-150k_taxi',
    value: 33.7682362,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_area-less-than-50k_taxi': {
    category: 'mileage-by-area',
    key: 'area-less-than-50k_taxi',
    value: 24.05233786,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_unknown_taxi': {
    category: 'mileage-by-area',
    key: 'unknown_taxi',
    value: 48.16514973,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_major-city-or-metropolitan-area_private-car-driving': {
    category: 'mileage-by-area',
    key: 'major-city-or-metropolitan-area_private-car-driving',
    value: 2844.387081,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-150k-more_private-car-driving': {
    category: 'mileage-by-area',
    key: 'city-150k-more_private-car-driving',
    value: 4392.707122,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-50k-150k_private-car-driving': {
    category: 'mileage-by-area',
    key: 'city-50k-150k_private-car-driving',
    value: 5114.65296,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_area-less-than-50k_private-car-driving': {
    category: 'mileage-by-area',
    key: 'area-less-than-50k_private-car-driving',
    value: 6002.11848,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_unknown_private-car-driving': {
    category: 'mileage-by-area',
    key: 'unknown_private-car-driving',
    value: 4341.744284,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_major-city-or-metropolitan-area_car-sharing-driving': {
    category: 'mileage-by-area',
    key: 'major-city-or-metropolitan-area_car-sharing-driving',
    value: 89.06216,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-150k-more_car-sharing-driving': {
    category: 'mileage-by-area',
    key: 'city-150k-more_car-sharing-driving',
    value: 51.30309174,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-50k-150k_car-sharing-driving': {
    category: 'mileage-by-area',
    key: 'city-50k-150k_car-sharing-driving',
    value: 47.62176474,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_area-less-than-50k_car-sharing-driving': {
    category: 'mileage-by-area',
    key: 'area-less-than-50k_car-sharing-driving',
    value: 46.47394961,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_unknown_car-sharing-driving': {
    category: 'mileage-by-area',
    key: 'unknown_car-sharing-driving',
    value: 60.7815956,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_major-city-or-metropolitan-area_motorbike-driving': {
    category: 'mileage-by-area',
    key: 'major-city-or-metropolitan-area_motorbike-driving',
    value: 169.5552676,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-150k-more_motorbike-driving': {
    category: 'mileage-by-area',
    key: 'city-150k-more_motorbike-driving',
    value: 256.8545121,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-50k-150k_motorbike-driving': {
    category: 'mileage-by-area',
    key: 'city-50k-150k_motorbike-driving',
    value: 298.3669602,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_area-less-than-50k_motorbike-driving': {
    category: 'mileage-by-area',
    key: 'area-less-than-50k_motorbike-driving',
    value: 349.5926185,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_unknown_motorbike-driving': {
    category: 'mileage-by-area',
    key: 'unknown_motorbike-driving',
    value: 254.458252,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_major-city-or-metropolitan-area_bicycle-driving': {
    category: 'mileage-by-area',
    key: 'major-city-or-metropolitan-area_bicycle-driving',
    value: 340.2621468,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-150k-more_bicycle-driving': {
    category: 'mileage-by-area',
    key: 'city-150k-more_bicycle-driving',
    value: 249.8138366,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-50k-150k_bicycle-driving': {
    category: 'mileage-by-area',
    key: 'city-50k-150k_bicycle-driving',
    value: 272.4527352,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_area-less-than-50k_bicycle-driving': {
    category: 'mileage-by-area',
    key: 'area-less-than-50k_bicycle-driving',
    value: 139.4906834,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_unknown_bicycle-driving': {
    category: 'mileage-by-area',
    key: 'unknown_bicycle-driving',
    value: 264.0133354,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_major-city-or-metropolitan-area_walking': {
    category: 'mileage-by-area',
    key: 'major-city-or-metropolitan-area_walking',
    value: 168.9344406,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-150k-more_walking': {
    category: 'mileage-by-area',
    key: 'city-150k-more_walking',
    value: 168.9344406,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-50k-150k_walking': {
    category: 'mileage-by-area',
    key: 'city-50k-150k_walking',
    value: 168.9344406,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_area-less-than-50k_walking': {
    category: 'mileage-by-area',
    key: 'area-less-than-50k_walking',
    value: 168.9344406,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_unknown_walking': {
    category: 'mileage-by-area',
    key: 'unknown_walking',
    value: 168.9344406,
    unit: 'km-passenger',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_major-city-or-metropolitan-area_private-car-purchase': {
    category: 'mileage-by-area',
    key: 'major-city-or-metropolitan-area_private-car-purchase',
    value: 0.027547541,
    unit: 'vehicle',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-150k-more_private-car-purchase': {
    category: 'mileage-by-area',
    key: 'city-150k-more_private-car-purchase',
    value: 0.03698957,
    unit: 'vehicle',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-50k-150k_private-car-purchase': {
    category: 'mileage-by-area',
    key: 'city-50k-150k_private-car-purchase',
    value: 0.058101776,
    unit: 'vehicle',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_area-less-than-50k_private-car-purchase': {
    category: 'mileage-by-area',
    key: 'area-less-than-50k_private-car-purchase',
    value: 0.063023882,
    unit: 'vehicle',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_unknown_private-car-purchase': {
    category: 'mileage-by-area',
    key: 'unknown_private-car-purchase',
    value: 0.043510227,
    unit: 'vehicle',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_major-city-or-metropolitan-area_motorbike-purchase': {
    category: 'mileage-by-area',
    key: 'major-city-or-metropolitan-area_motorbike-purchase',
    value: 0.001481261,
    unit: 'vehicle',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-150k-more_motorbike-purchase': {
    category: 'mileage-by-area',
    key: 'city-150k-more_motorbike-purchase',
    value: 0.003256596,
    unit: 'vehicle',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-50k-150k_motorbike-purchase': {
    category: 'mileage-by-area',
    key: 'city-50k-150k_motorbike-purchase',
    value: 0.003018645,
    unit: 'vehicle',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_area-less-than-50k_motorbike-purchase': {
    category: 'mileage-by-area',
    key: 'area-less-than-50k_motorbike-purchase',
    value: 0.002882468,
    unit: 'vehicle',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_unknown_motorbike-purchase': {
    category: 'mileage-by-area',
    key: 'unknown_motorbike-purchase',
    value: 0.002635317,
    unit: 'vehicle',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_major-city-or-metropolitan-area_car-sharing-rental': {
    category: 'mileage-by-area',
    key: 'major-city-or-metropolitan-area_car-sharing-rental',
    value: 0.236309982,
    unit: 'use',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-150k-more_car-sharing-rental': {
    category: 'mileage-by-area',
    key: 'city-150k-more_car-sharing-rental',
    value: 0.136123272,
    unit: 'use',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-50k-150k_car-sharing-rental': {
    category: 'mileage-by-area',
    key: 'city-50k-150k_car-sharing-rental',
    value: 0.126355552,
    unit: 'use',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_area-less-than-50k_car-sharing-rental': {
    category: 'mileage-by-area',
    key: 'area-less-than-50k_car-sharing-rental',
    value: 0.123310036,
    unit: 'use',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_unknown_car-sharing-rental': {
    category: 'mileage-by-area',
    key: 'unknown_car-sharing-rental',
    value: 0.161272731,
    unit: 'use',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_major-city-or-metropolitan-area_private-car-maintenance': {
    category: 'mileage-by-area',
    key: 'major-city-or-metropolitan-area_private-car-maintenance',
    value: 47.41693663,
    unit: '000JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-150k-more_private-car-maintenance': {
    category: 'mileage-by-area',
    key: 'city-150k-more_private-car-maintenance',
    value: 57.62349476,
    unit: '000JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-50k-150k_private-car-maintenance': {
    category: 'mileage-by-area',
    key: 'city-50k-150k_private-car-maintenance',
    value: 59.64400728,
    unit: '000JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_area-less-than-50k_private-car-maintenance': {
    category: 'mileage-by-area',
    key: 'area-less-than-50k_private-car-maintenance',
    value: 62.14332377,
    unit: '000JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_unknown_private-car-maintenance': {
    category: 'mileage-by-area',
    key: 'unknown_private-car-maintenance',
    value: 55.72777896,
    unit: '000JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_major-city-or-metropolitan-area_motorbike-maintenance': {
    category: 'mileage-by-area',
    key: 'major-city-or-metropolitan-area_motorbike-maintenance',
    value: 0.297496117,
    unit: '000JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-150k-more_motorbike-maintenance': {
    category: 'mileage-by-area',
    key: 'city-150k-more_motorbike-maintenance',
    value: 0.568630562,
    unit: '000JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-50k-150k_motorbike-maintenance': {
    category: 'mileage-by-area',
    key: 'city-50k-150k_motorbike-maintenance',
    value: 0.464008876,
    unit: '000JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_area-less-than-50k_motorbike-maintenance': {
    category: 'mileage-by-area',
    key: 'area-less-than-50k_motorbike-maintenance',
    value: 0.475465667,
    unit: '000JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_unknown_motorbike-maintenance': {
    category: 'mileage-by-area',
    key: 'unknown_motorbike-maintenance',
    value: 0.446120353,
    unit: '000JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_major-city-or-metropolitan-area_bicycle-maintenance': {
    category: 'mileage-by-area',
    key: 'major-city-or-metropolitan-area_bicycle-maintenance',
    value: 0.482425985,
    unit: '000JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-150k-more_bicycle-maintenance': {
    category: 'mileage-by-area',
    key: 'city-150k-more_bicycle-maintenance',
    value: 0.399241827,
    unit: '000JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_city-50k-150k_bicycle-maintenance': {
    category: 'mileage-by-area',
    key: 'city-50k-150k_bicycle-maintenance',
    value: 0.429252268,
    unit: '000JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_area-less-than-50k_bicycle-maintenance': {
    category: 'mileage-by-area',
    key: 'area-less-than-50k_bicycle-maintenance',
    value: 0.240751767,
    unit: '000JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'mileage-by-area_unknown_bicycle-maintenance': {
    category: 'mileage-by-area',
    key: 'unknown_bicycle-maintenance',
    value: 0.406667749,
    unit: '000JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'food-intake-factor_very-little': {
    category: 'food-intake-factor',
    key: 'very-little',
    value: 0.741132875,
    unit: 'times',
    citation:
      '農林水産省. n.d. 食事バランスガイド. 厚生労働省. 2015. 国民健康・栄養調査より算出'
  },
  'food-intake-factor_somewhat-little': {
    category: 'food-intake-factor',
    key: 'somewhat-little',
    value: 1.058761249,
    unit: 'times',
    citation:
      '農林水産省. n.d. 食事バランスガイド. 厚生労働省. 2015. 国民健康・栄養調査より算出'
  },
  'food-intake-factor_moderate': {
    category: 'food-intake-factor',
    key: 'moderate',
    value: 1.164637374,
    unit: 'times',
    citation:
      '農林水産省. n.d. 食事バランスガイド. 厚生労働省. 2015. 国民健康・栄養調査より算出'
  },
  'food-intake-factor_somewhat-much': {
    category: 'food-intake-factor',
    key: 'somewhat-much',
    value: 1.270513499,
    unit: 'times',
    citation:
      '農林水産省. n.d. 食事バランスガイド. 厚生労働省. 2015. 国民健康・栄養調査より算出'
  },
  'food-intake-factor_very-much': {
    category: 'food-intake-factor',
    key: 'very-much',
    value: 1.588141874,
    unit: 'times',
    citation:
      '農林水産省. n.d. 食事バランスガイド. 厚生労働省. 2015. 国民健康・栄養調査より算出'
  },
  'food-intake-factor_unknown': {
    category: 'food-intake-factor',
    key: 'unknown',
    value: 1,
    unit: 'times',
    citation:
      '農林水産省. n.d. 食事バランスガイド. 厚生労働省. 2015. 国民健康・栄養調査より算出'
  },
  'food-direct-waste-factor_seldom': {
    category: 'food-direct-waste-factor',
    key: 'seldom',
    value: 0.275165763,
    unit: 'times',
    citation: '東京都環境局. 2017. 家庭系食品ロス発生要因等調査より算出　'
  },
  'food-direct-waste-factor_1-per-week': {
    category: 'food-direct-waste-factor',
    key: '1-per-week',
    value: 1.10066305,
    unit: 'times',
    citation: '東京都環境局. 2017. 家庭系食品ロス発生要因等調査より算出　'
  },
  'food-direct-waste-factor_2-3-per-week': {
    category: 'food-direct-waste-factor',
    key: '2-3-per-week',
    value: 2.751657625,
    unit: 'times',
    citation: '東京都環境局. 2017. 家庭系食品ロス発生要因等調査より算出　'
  },
  'food-direct-waste-factor_4-7-per-week': {
    category: 'food-direct-waste-factor',
    key: '4-7-per-week',
    value: 6.053646775,
    unit: 'times',
    citation: '東京都環境局. 2017. 家庭系食品ロス発生要因等調査より算出　'
  },
  'food-direct-waste-factor_8-more-per-week': {
    category: 'food-direct-waste-factor',
    key: '8-more-per-week',
    value: 8.8053044,
    unit: 'times',
    citation: '東京都環境局. 2017. 家庭系食品ロス発生要因等調査より算出　'
  },
  'food-direct-waste-factor_unknown': {
    category: 'food-direct-waste-factor',
    key: 'unknown',
    value: 1,
    unit: 'times',
    citation: '東京都環境局. 2017. 家庭系食品ロス発生要因等調査より算出　'
  },
  'food-leftover-factor_seldom': {
    category: 'food-leftover-factor',
    key: 'seldom',
    value: 0.221172481,
    unit: 'times',
    citation: '東京都環境局. 2017. 家庭系食品ロス発生要因等調査より算出　'
  },
  'food-leftover-factor_1-per-week': {
    category: 'food-leftover-factor',
    key: '1-per-week',
    value: 1.10066305,
    unit: 'times',
    citation: '東京都環境局. 2017. 家庭系食品ロス発生要因等調査より算出　'
  },
  'food-leftover-factor_2-3-per-week': {
    category: 'food-leftover-factor',
    key: '2-3-per-week',
    value: 2.751657625,
    unit: 'times',
    citation: '東京都環境局. 2017. 家庭系食品ロス発生要因等調査より算出　'
  },
  'food-leftover-factor_4-7-per-week': {
    category: 'food-leftover-factor',
    key: '4-7-per-week',
    value: 6.053646775,
    unit: 'times',
    citation: '東京都環境局. 2017. 家庭系食品ロス発生要因等調査より算出　'
  },
  'food-leftover-factor_8-more-per-week': {
    category: 'food-leftover-factor',
    key: '8-more-per-week',
    value: 8.8053044,
    unit: 'times',
    citation: '東京都環境局. 2017. 家庭系食品ロス発生要因等調査より算出　'
  },
  'food-leftover-factor_unknown': {
    category: 'food-leftover-factor',
    key: 'unknown',
    value: 1,
    unit: 'times',
    citation: '東京都環境局. 2017. 家庭系食品ロス発生要因等調査より算出　'
  },
  'food-waste-share_direct-waste-per-food-waste': {
    category: 'food-waste-share',
    key: 'direct-waste-per-food-waste',
    value: 0.411764706,
    unit: 'times',
    citation: '農林水産省. 2016. 食品ロス統計調査報告（世帯調査）より算出\t'
  },
  'food-waste-share_leftover-per-food-waste': {
    category: 'food-waste-share',
    key: 'leftover-per-food-waste',
    value: 0.588235294,
    unit: 'times',
    citation: '農林水産省. 2016. 食品ロス統計調査報告（世帯調査）より算出\t'
  },
  'food-waste-share_food-waste-per-food': {
    category: 'food-waste-share',
    key: 'food-waste-per-food',
    value: 0.037,
    unit: 'times',
    citation: '農林水産省. 2016. 食品ロス統計調査報告（世帯調査）より算出\t'
  },
  'dish-beef-factor_everyday': {
    category: 'dish-beef-factor',
    key: 'everyday',
    value: 3.734827264,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-beef-factor_4-5-per-week': {
    category: 'dish-beef-factor',
    key: '4-5-per-week',
    value: 2.400960384,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-beef-factor_2-3-per-week': {
    category: 'dish-beef-factor',
    key: '2-3-per-week',
    value: 1.33386688,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-beef-factor_1-per-week': {
    category: 'dish-beef-factor',
    key: '1-per-week',
    value: 0.533546752,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-beef-factor_2-3-per-month': {
    category: 'dish-beef-factor',
    key: '2-3-per-month',
    value: 0.33346672,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-beef-factor_1-less-per-month': {
    category: 'dish-beef-factor',
    key: '1-less-per-month',
    value: 0.133386688,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-beef-factor_never': {
    category: 'dish-beef-factor',
    key: 'never',
    value: 0,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-beef-factor_unknown': {
    category: 'dish-beef-factor',
    key: 'unknown',
    value: 1,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-pork-factor_everyday': {
    category: 'dish-pork-factor',
    key: 'everyday',
    value: 2.652997413,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-pork-factor_4-5-per-week': {
    category: 'dish-pork-factor',
    key: '4-5-per-week',
    value: 1.705498337,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-pork-factor_2-3-per-week': {
    category: 'dish-pork-factor',
    key: '2-3-per-week',
    value: 0.947499076,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-pork-factor_1-per-week': {
    category: 'dish-pork-factor',
    key: '1-per-week',
    value: 0.37899963,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-pork-factor_2-3-per-month': {
    category: 'dish-pork-factor',
    key: '2-3-per-month',
    value: 0.236874769,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-pork-factor_1-less-per-month': {
    category: 'dish-pork-factor',
    key: '1-less-per-month',
    value: 0.094749908,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-pork-factor_never': {
    category: 'dish-pork-factor',
    key: 'never',
    value: 0,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-pork-factor_unknown': {
    category: 'dish-pork-factor',
    key: 'unknown',
    value: 1,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-chicken-factor_everyday': {
    category: 'dish-chicken-factor',
    key: 'everyday',
    value: 2.773540424,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-chicken-factor_4-5-per-week': {
    category: 'dish-chicken-factor',
    key: '4-5-per-week',
    value: 1.782990273,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-chicken-factor_2-3-per-week': {
    category: 'dish-chicken-factor',
    key: '2-3-per-week',
    value: 0.990550152,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-chicken-factor_1-per-week': {
    category: 'dish-chicken-factor',
    key: '1-per-week',
    value: 0.396220061,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-chicken-factor_2-3-per-month': {
    category: 'dish-chicken-factor',
    key: '2-3-per-month',
    value: 0.247637538,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-chicken-factor_1-less-per-month': {
    category: 'dish-chicken-factor',
    key: '1-less-per-month',
    value: 0.099055015,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-chicken-factor_never': {
    category: 'dish-chicken-factor',
    key: 'never',
    value: 0,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-chicken-factor_unknown': {
    category: 'dish-chicken-factor',
    key: 'unknown',
    value: 1,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-seafood-factor_everyday': {
    category: 'dish-seafood-factor',
    key: 'everyday',
    value: 2.783189535,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-seafood-factor_4-5-per-week': {
    category: 'dish-seafood-factor',
    key: '4-5-per-week',
    value: 1.789193273,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-seafood-factor_2-3-per-week': {
    category: 'dish-seafood-factor',
    key: '2-3-per-week',
    value: 0.993996263,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-seafood-factor_1-per-week': {
    category: 'dish-seafood-factor',
    key: '1-per-week',
    value: 0.397598505,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-seafood-factor_2-3-per-month': {
    category: 'dish-seafood-factor',
    key: '2-3-per-month',
    value: 0.248499066,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-seafood-factor_1-less-per-month': {
    category: 'dish-seafood-factor',
    key: '1-less-per-month',
    value: 0.099399626,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-seafood-factor_never': {
    category: 'dish-seafood-factor',
    key: 'never',
    value: 0,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dish-seafood-factor_unknown': {
    category: 'dish-seafood-factor',
    key: 'unknown',
    value: 1,
    unit: 'times',
    citation:
      '日本食肉消費総合センター.  2020. 食肉に関する意識調査報告書より算出'
  },
  'dairy-food-factor_3-more-per-day': {
    category: 'dairy-food-factor',
    key: '3-more-per-day',
    value: 1.809645792,
    unit: 'times',
    citation:
      '農畜産業振興機構. 2025. 牛乳・乳製品の消費動向に関する調査.  一般社団法人ＪＣ総研. 2015. たまごの消費行動調査の概要より算出　'
  },
  'dairy-food-factor_2-per-day': {
    category: 'dairy-food-factor',
    key: '2-per-day',
    value: 1.206430528,
    unit: 'times',
    citation:
      '農畜産業振興機構. 2025. 牛乳・乳製品の消費動向に関する調査.  一般社団法人ＪＣ総研. 2015. たまごの消費行動調査の概要より算出　'
  },
  'dairy-food-factor_1-per-day': {
    category: 'dairy-food-factor',
    key: '1-per-day',
    value: 0.603215264,
    unit: 'times',
    citation:
      '農畜産業振興機構. 2025. 牛乳・乳製品の消費動向に関する調査.  一般社団法人ＪＣ総研. 2015. たまごの消費行動調査の概要より算出　'
  },
  'dairy-food-factor_half-of-week': {
    category: 'dairy-food-factor',
    key: 'half-of-week',
    value: 0.301607632,
    unit: 'times',
    citation:
      '農畜産業振興機構. 2025. 牛乳・乳製品の消費動向に関する調査.  一般社団法人ＪＣ総研. 2015. たまごの消費行動調査の概要より算出　'
  },
  'dairy-food-factor_1-2-less-per-week': {
    category: 'dairy-food-factor',
    key: '1-2-less-per-week',
    value: 0.129260414,
    unit: 'times',
    citation:
      '農畜産業振興機構. 2025. 牛乳・乳製品の消費動向に関する調査.  一般社団法人ＪＣ総研. 2015. たまごの消費行動調査の概要より算出　'
  },
  'dairy-food-factor_never': {
    category: 'dairy-food-factor',
    key: 'never',
    value: 0,
    unit: 'times',
    citation:
      '農畜産業振興機構. 2025. 牛乳・乳製品の消費動向に関する調査.  一般社団法人ＪＣ総研. 2015. たまごの消費行動調査の概要より算出　'
  },
  'dairy-food-factor_unknown': {
    category: 'dairy-food-factor',
    key: 'unknown',
    value: 1,
    unit: 'times',
    citation:
      '農畜産業振興機構. 2025. 牛乳・乳製品の消費動向に関する調査.  一般社団法人ＪＣ総研. 2015. たまごの消費行動調査の概要より算出　'
  },
  'alcohol-factor_everyday': {
    category: 'alcohol-factor',
    key: 'everyday',
    value: 1.803310363,
    unit: 'times',
    citation: '国税庁. n.d. お酒に関するアンケートの集計より算出 '
  },
  'alcohol-factor_4-5-per-week': {
    category: 'alcohol-factor',
    key: '4-5-per-week',
    value: 1.159270947,
    unit: 'times',
    citation: '国税庁. n.d. お酒に関するアンケートの集計より算出 '
  },
  'alcohol-factor_2-3-per-week': {
    category: 'alcohol-factor',
    key: '2-3-per-week',
    value: 0.644039415,
    unit: 'times',
    citation: '国税庁. n.d. お酒に関するアンケートの集計より算出 '
  },
  'alcohol-factor_1-per-week': {
    category: 'alcohol-factor',
    key: '1-per-week',
    value: 0.257615766,
    unit: 'times',
    citation: '国税庁. n.d. お酒に関するアンケートの集計より算出 '
  },
  'alcohol-factor_2-3-less-per-month': {
    category: 'alcohol-factor',
    key: '2-3-less-per-month',
    value: 0.064403942,
    unit: 'times',
    citation: '国税庁. n.d. お酒に関するアンケートの集計より算出 '
  },
  'alcohol-factor_never': {
    category: 'alcohol-factor',
    key: 'never',
    value: 0,
    unit: 'times',
    citation: '国税庁. n.d. お酒に関するアンケートの集計より算出 '
  },
  'alcohol-factor_unknown': {
    category: 'alcohol-factor',
    key: 'unknown',
    value: 1,
    unit: 'times',
    citation: '国税庁. n.d. お酒に関するアンケートの集計より算出 '
  },
  'soft-drink-snack-factor_3k-less': {
    category: 'soft-drink-snack-factor',
    key: '3k-less',
    value: 0.326078322,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'soft-drink-snack-factor_3k-5k': {
    category: 'soft-drink-snack-factor',
    key: '3k-5k',
    value: 0.652156644,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'soft-drink-snack-factor_5k-10k': {
    category: 'soft-drink-snack-factor',
    key: '5k-10k',
    value: 1.222793708,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'soft-drink-snack-factor_10k-15k': {
    category: 'soft-drink-snack-factor',
    key: '10k-15k',
    value: 2.037989514,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'soft-drink-snack-factor_15k-more': {
    category: 'soft-drink-snack-factor',
    key: '15k-more',
    value: 2.853185319,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'soft-drink-snack-factor_unknown': {
    category: 'soft-drink-snack-factor',
    key: 'unknown',
    value: 1,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'eat-out-factor_5k-less': {
    category: 'eat-out-factor',
    key: '5k-less',
    value: 0.19153341,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'eat-out-factor_5k-10k': {
    category: 'eat-out-factor',
    key: '5k-10k',
    value: 0.574600229,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'eat-out-factor_10k-20k': {
    category: 'eat-out-factor',
    key: '10k-20k',
    value: 1.149200457,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'eat-out-factor_20k-50k': {
    category: 'eat-out-factor',
    key: '20k-50k',
    value: 3.064534553,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'eat-out-factor_50k-more': {
    category: 'eat-out-factor',
    key: '50k-more',
    value: 5.746002287,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'eat-out-factor_unknown': {
    category: 'eat-out-factor',
    key: 'unknown',
    value: 1,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'clothes-beauty-factor_5k-less': {
    category: 'clothes-beauty-factor',
    key: '5k-less',
    value: 0.258895762,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'clothes-beauty-factor_5k-10k': {
    category: 'clothes-beauty-factor',
    key: '5k-10k',
    value: 0.647239404,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'clothes-beauty-factor_10k-20k': {
    category: 'clothes-beauty-factor',
    key: '10k-20k',
    value: 1.294478809,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'clothes-beauty-factor_20k-50k': {
    category: 'clothes-beauty-factor',
    key: '20k-50k',
    value: 3.020450553,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'clothes-beauty-factor_50k-more': {
    category: 'clothes-beauty-factor',
    key: '50k-more',
    value: 5.177915234,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'clothes-beauty-factor_unknown': {
    category: 'clothes-beauty-factor',
    key: 'unknown',
    value: 1,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'hobby-goods-factor_5k-less': {
    category: 'hobby-goods-factor',
    key: '5k-less',
    value: 0.46277351,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'hobby-goods-factor_5k-10k': {
    category: 'hobby-goods-factor',
    key: '5k-10k',
    value: 1.156933774,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'hobby-goods-factor_10k-20k': {
    category: 'hobby-goods-factor',
    key: '10k-20k',
    value: 2.313867548,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'hobby-goods-factor_20k-50k': {
    category: 'hobby-goods-factor',
    key: '20k-50k',
    value: 5.399024278,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'hobby-goods-factor_50k-more': {
    category: 'hobby-goods-factor',
    key: '50k-more',
    value: 9.25547019,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'hobby-goods-factor_unknown': {
    category: 'hobby-goods-factor',
    key: 'unknown',
    value: 1,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'daily-goods-amount_5k-less': {
    category: 'daily-goods-amount',
    key: '5k-less',
    value: 3000,
    unit: 'JPY',
    citation: 'Assumption'
  },
  'daily-goods-amount_5k-10k': {
    category: 'daily-goods-amount',
    key: '5k-10k',
    value: 7500,
    unit: 'JPY',
    citation: 'Assumption'
  },
  'daily-goods-amount_10k-20k': {
    category: 'daily-goods-amount',
    key: '10k-20k',
    value: 15000,
    unit: 'JPY',
    citation: 'Assumption'
  },
  'daily-goods-amount_20k-30k': {
    category: 'daily-goods-amount',
    key: '20k-30k',
    value: 25000,
    unit: 'JPY',
    citation: 'Assumption'
  },
  'daily-goods-amount_30k-more': {
    category: 'daily-goods-amount',
    key: '30k-more',
    value: 40000,
    unit: 'JPY',
    citation: 'Assumption'
  },
  'daily-goods-amount_unknown': {
    category: 'daily-goods-amount',
    key: 'unknown',
    value: 8376.919944,
    unit: 'JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'daily-goods-amount_average-per-capita': {
    category: 'daily-goods-amount',
    key: 'average-per-capita',
    value: 3595.244611,
    unit: 'JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'communication-amount_5k-less': {
    category: 'communication-amount',
    key: '5k-less',
    value: 3000,
    unit: 'JPY',
    citation: 'Assumption'
  },
  'communication-amount_5k-10k': {
    category: 'communication-amount',
    key: '5k-10k',
    value: 7500,
    unit: 'JPY',
    citation: 'Assumption'
  },
  'communication-amount_10k-20k': {
    category: 'communication-amount',
    key: '10k-20k',
    value: 15000,
    unit: 'JPY',
    citation: 'Assumption'
  },
  'communication-amount_20k-30k': {
    category: 'communication-amount',
    key: '20k-30k',
    value: 25000,
    unit: 'JPY',
    citation: 'Assumption'
  },
  'communication-amount_30k-more': {
    category: 'communication-amount',
    key: '30k-more',
    value: 40000,
    unit: 'JPY',
    citation: 'Assumption'
  },
  'communication-amount_unknown': {
    category: 'communication-amount',
    key: 'unknown',
    value: 28736.48078,
    unit: 'JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'communication-amount_average-per-capita': {
    category: 'communication-amount',
    key: 'average-per-capita',
    value: 12333.25355,
    unit: 'JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'service-factor_5k-less': {
    category: 'service-factor',
    key: '5k-less',
    value: 0.262661425,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'service-factor_5k-10k': {
    category: 'service-factor',
    key: '5k-10k',
    value: 0.562845911,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'service-factor_10k-20k': {
    category: 'service-factor',
    key: '10k-20k',
    value: 1.125691821,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'service-factor_20k-50k': {
    category: 'service-factor',
    key: '20k-50k',
    value: 2.626614249,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'service-factor_50k-more': {
    category: 'service-factor',
    key: '50k-more',
    value: 5.628459105,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'service-factor_unknown': {
    category: 'service-factor',
    key: 'unknown',
    value: 1,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'appliance-furniture-amount_50k-less': {
    category: 'appliance-furniture-amount',
    key: '50k-less',
    value: 25000,
    unit: 'JPY',
    citation: 'Assumption'
  },
  'appliance-furniture-amount_50k-100k': {
    category: 'appliance-furniture-amount',
    key: '50k-100k',
    value: 75000,
    unit: 'JPY',
    citation: 'Assumption'
  },
  'appliance-furniture-amount_100k-200k': {
    category: 'appliance-furniture-amount',
    key: '100k-200k',
    value: 150000,
    unit: 'JPY',
    citation: 'Assumption'
  },
  'appliance-furniture-amount_200k-300k': {
    category: 'appliance-furniture-amount',
    key: '200k-300k',
    value: 250000,
    unit: 'JPY',
    citation: 'Assumption'
  },
  'appliance-furniture-amount_300k-400k': {
    category: 'appliance-furniture-amount',
    key: '300k-400k',
    value: 350000,
    unit: 'JPY',
    citation: 'Assumption'
  },
  'appliance-furniture-amount_400k-more': {
    category: 'appliance-furniture-amount',
    key: '400k-more',
    value: 500000,
    unit: 'JPY',
    citation: 'Assumption'
  },
  'appliance-furniture-amount_unknown': {
    category: 'appliance-furniture-amount',
    key: 'unknown',
    value: 186333.6307,
    unit: 'JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'appliance-furniture-amount_average-per-capita': {
    category: 'appliance-furniture-amount',
    key: 'average-per-capita',
    value: 79971.51531,
    unit: 'JPY',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'leisure-sports-factor_5k-less': {
    category: 'leisure-sports-factor',
    key: '5k-less',
    value: 0.285556309,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'leisure-sports-factor_5k-10k': {
    category: 'leisure-sports-factor',
    key: '5k-10k',
    value: 0.856668926,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'leisure-sports-factor_10k-20k': {
    category: 'leisure-sports-factor',
    key: '10k-20k',
    value: 1.713337852,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'leisure-sports-factor_20k-50k': {
    category: 'leisure-sports-factor',
    key: '20k-50k',
    value: 3.99778832,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'leisure-sports-factor_50k-more': {
    category: 'leisure-sports-factor',
    key: '50k-more',
    value: 8.566689258,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'leisure-sports-factor_unknown': {
    category: 'leisure-sports-factor',
    key: 'unknown',
    value: 1,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'travel-factor_10k-less': {
    category: 'travel-factor',
    key: '10k-less',
    value: 0.17764228,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'travel-factor_10k-30k': {
    category: 'travel-factor',
    key: '10k-30k',
    value: 0.710569119,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'travel-factor_30k-50k': {
    category: 'travel-factor',
    key: '30k-50k',
    value: 1.421138239,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'travel-factor_50k-100k': {
    category: 'travel-factor',
    key: '50k-100k',
    value: 2.664634197,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'travel-factor_100k-200k': {
    category: 'travel-factor',
    key: '100k-200k',
    value: 5.329268395,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'travel-factor_200k-more': {
    category: 'travel-factor',
    key: '200k-more',
    value: 10.65853679,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  },
  'travel-factor_unknown': {
    category: 'travel-factor',
    key: 'unknown',
    value: 1,
    unit: 'times',
    citation: 'Koide et al. 2021. Environmental Research Letters 16 084001'
  }
}
