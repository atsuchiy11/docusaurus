---
sidebar_position: 6
---

# Node.js

ブラウザ以外で動く*JavaScript*の実行環境です。**_サーバサイド JavaScript_**とも言います。  
別に*Node.js*で*Web サーバ*を開発しようというわけではなく、*kintone*にそんな需要もありません。  
本頁では「***Node.js*の恩恵を受けて、フロントエンド開発を快適にやろう！**」ということに焦点を置きます。

:::caution
ここからは個別の開発環境が必要となります。  
開発用の端末（*Mac*推奨）をお持ちで無い方はこれ以上進むことができません。。ご了承ください m(\_ \_)m
:::

:::caution
ここからはターミナルないしコマンドプロンプトでの操作を伴います。  
本頁では解説しませんので、予備知識を持ってお臨みください。
:::

### なぜ*Node.js*?

メリットはいっぱいあります。無くては生きていけない程です。。

- **_npm_**による膨大なパッケージ／ライブラリの利用
- **_Babel_**によるトランスパイル（*IE*滅亡宣言により若干需要は薄い）
- **_webpack_**によるバンドル
- **_Prettier, ESLint_**といった静的解析ツールの利用
- **_npm scripts, Husky, Gulp_**などのタスクランナーの利用（本カリキュラムではやりません）
- **_Jest, Mocha_**などテストフレームワークの利用（本カリキュラムではやりません）
- **_TypeScript_**による静的型付け（本カリキュラムではやりません）
- **_React_**等アプリケーションフレームワークの利用（本カリキュラムではやりません）
- **_CI/CD_**の構築（本カリキュラムではやりません）

:::tip
上述の通り、*Node.js*の開発環境はプロジェクトや組織により設定内容が大きく異なります。  
本頁では概要のみの解説に留めますので、詳細は各プロジェクト、組織に従ってください。
:::

## パッケージマネージャ

:::info
[最高に素晴らしい資料](https://github.com/prime-x-co-ltd/px-overview/wiki/%E3%83%91%E3%83%83%E3%82%B1%E3%83%BC%E3%82%B8%E3%83%9E%E3%83%8D%E3%83%BC%E3%82%B8%E3%83%A3%E3%81%A8%E3%81%AF)（copyright © 筆者）がありますのでこちらをご覧ください。
:::

*Node.js*は「**スモールコア**（small core）」という哲学に基づいています。つまり*Node.js*本体には、  
「最小限の機能」しか付属しておらず、必要な機能は「**ユーザーランド**（コアの外）」から持ってきてね、  
ということです。

そういった公式/非公式のライブラリ（*Node.js*ではパッケージと呼ぶので以降はパッケージと表記します）を  
管理するツールとして**_npm_**（Node Package Manager）というものがあります。

```bash
npm init -y
npm install [欲しいパッケージ名]
```

:::info
*npm*のほかに*Facebook*が開発した*yarn*というパッケージマネージャがあります。  
機能も似ていて、互換性もあるので好きな方を使っていただければいいと思います。
:::

:::tip
本頁執筆時点(2021-11-05)で社名は*Meta*に変更されていますが、表記は*Facebook*にしています。  
気になる方は[公式](https://about.facebook.com/ja/)をご覧ください。
:::

### package.json

パッケージのメタデータを管理する*JSON*ファイルです

- *npm*経由でインストールすると自動で追加されます
- *script*で、任意の名前のスクリプトを記述することができます

```json title="./package.json"
{
	"name": "kintone-template-js",
	"version": "1.0.0",
	"main": "index.js",
	"repository": "git@github.com:prime-x-co-ltd/kintone-template-js.git",
	"author": "<a2-tsuchiya@prime-x.co.jp>",
	"license": "MIT",
	"scripts": {
		"build": "webpack",
		"start": "webpack serve --https --hot"
	},
	"dependencies": {
		"webpack": "^5.61.0",
		"webpack-cli": "^4.9.1"
	},
	"devDependencies": {
		"@types/webpack": "^5.28.0",
		"@types/webpack-dev-server": "^4.3.1",
		"eslint": "^8.1.0",
		"eslint-config-google": "^0.14.0",
		"eslint-config-prettier": "^8.3.0",
		"webpack-dev-server": "^4.4.0"
	}
}
```

## CommonJS

*Node.js*におけるモジュールシステムです。別頁で解説しましたが、*JavaScript*自体にも*ES モジュール*という  
モジュールシステムが存在し、長らく混在している期間が続いていました。  
昨今では、**ユニバーサル*JavaScript***と呼ばれる思想により、*Node.js*でも*ES モジュール*を利用できます。

:::caution
冒頭で申し上げましたが「**フロントエンド開発を快適にするための*Node.js***」がテーマなので  
本頁では*ES モジュール*をベースに*CommonJS*を対比する形で解説します。  
:::

<br />

ずばり対比表です。

| ES Modules                     | CommonJS                            |
| ------------------------------ | ----------------------------------- |
| `export { method }`            | `exports.method = method`           |
| `export default ()=>{}`        | `module.exports = ()=>{}`           |
| `import mod from "module"`     | `const mod = require("module")`     |
| `import { mod } from "module"` | `const mod = require("module").mod` |

### 名前付きエクスポート

*ES モジュール*と同様です。何個でもエクスポートできます。

```tsx title="./module.js"
// exportsという名前空間ができると思えば分かりやすい
exports.hello = (message) => console.log(message)
exports.message = 'Hello, CommonJS'

// これは新たにexportsというオブジェクトを作ってるだけ
exports = { bad: 'エクスポートできないよ' }
```

```tsx title="./index.js"
const myModule = require('./module')
myModule.hello(myModule.message) //Hello, CommonJS

console.log(myModule.bad) //undefined
```

### デフォルトエクスポート

こちらも同様です。一つだけエクスポートできます。

```tsx title="./module.js"
module.exports = {
	name: 'John Doe',
	age: 32,
	job: 'engineer',
}
module.exports = () => console.log('上書きしてやったぜ')
```

```tsx title="./index.js"
const user = require('./module')
console.log(user.name) //"" ←？？？
user() //上書きしてやったぜ
```

:::info
そろそろ*JavaScript*の仕組みが分かってきましたよね？上書きされちゃうんです。  
仕様的に一つしかエクスポートできないんです。。  
:::

## webpack

複数の*JS*ファイルをまとめる**モジュールバンドラー**です。

- *Web*ページの*HTTP*リクエスト数を減らす
- 各種モジュールシステムが使える
- ファイルが分割されることによる可読性、再利用性の向上
- *Babel, TypeScript*などコンパイルを要する機能を組み込める
- 開発環境そのものが再利用可能になる

などいいことづくめです。

導入

```bash
npm i -D webpack webpack-cli #本体
npm i -D @types/webpack @types/webpack-dev-server #型情報（任意）
```

最低限知ってればいいことだけ解説します。

```tsx title="./webpack.config.js"
/**
 * @type {import('webpack').Configuration}
 * 入力補間してくれるので個人的にはオススメです
 */
module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: `${__dirname}/dist`,
		filename: 'main.js',
	},
	devServer: {
		static: 'dist',
		open: true,
		compress: true,
	},
	devtool: 'eval-cheap-module-source-map',
	resolve: {
		extensions: ['.js', '.json'],
	},
}
```

- エントリーポイント: `entry`
  - ファイルをまとめる起点となるファイルです。
- 出力: `output`
  - 出力先。パスと名前を指定します。
- `devServer`
  - 開発用のローカルサーバを立ち上げます。ブラウザの代わりだと思ってください。
- ソースマップ: `devtool`
  - デベロッパツールなどで変換前のソースを確認できます。
- 名前解決: `resolve`
  - モジュールのインポート時に拡張子を省略できます。面倒くさいので設定しときましょう。

:::info
設定項目は多岐にわたりますので、詳細は[公式](https://webpack.js.org/concepts/)をご確認ください。  
大抵プロジェクト単位で共通の設定ファイルが用意されているので、そちらを使いましょう。  
ゼロから環境構築することはあまりありません（ごく限られた人がやってくれます）。
:::

## ESLint

コードに関する細かなルールを**実行する前に**検知、警告してくれる**リンター**と呼ばれるものです。  
ルールは 100 以上あるので、推奨されているスタイルをベースに個別にカスタマイズしていくのが無難です。

- [AirBnb](https://github.com/airbnb/javascript)
- [Google](https://github.com/google/eslint-config-google)
- [Standard](https://github.com/standard/standard)

```tsx title="./.eslintrc.js"
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	// googleベースで最終的にprettierに合わせる
	extends: ['google', 'prettier'],
	parserOptions: {
		ecmaVersion: 13,
		sourceType: 'module',
	},
	// 個別のルール設定
	rules: {
		'require-jsdoc': 0,
	},
}
```

:::info
ルールを全部知りたい方は[ルール一覧（非公式）](https://garafu.blogspot.com/2017/02/eslint-rules-jp.html)をご確認ください。
:::

## Prettier

こちらはコードを整形してくれる**フォーマッター**です。*ESLint*と併用することが多いです。

```tsx title="./.prettierrc.js"
module.exports = {
	tabWidth: 4,
	semi: false,
	useTabs: true,
	singleQuote: true,
	jsxBracketSameLine: true,
	printWidth: 80,
}
```

:::info
一覧は[公式](https://prettier.io/docs/en/options.html)にあります。ESLint ほど多くないです。
:::
