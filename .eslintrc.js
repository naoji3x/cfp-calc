module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true // 追加 vs codeのエラー対策 https://qiita.com/tutu/items/66f586c455ded70bd1e2
  },
  extends: ['standard-with-typescript', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.eslint.json'] // 追加 eslintを実行する際の設定 https://zenn.dev/rinda_1994/articles/07a30be1a26a38
  },
  rules: {},
  plugins: ['jest'] // 追加 vs codeのエラー対策 https://oisham.hatenablog.com/entry/2019/08/20/111826
}
