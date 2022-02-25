---
sidebar_position: 10
---

# 環境構築

## ESLint

構文ルールを実行前に検知、警告する**リンター（linter）**

1. インストール

   ```zsh
   $ yarn add eslint -D
   ```

2. 設定ファイルを生成

   ```zsh
   $ npx eslint --init
   # or
   $ touch eslintrc.json
   ```

   ```json title=.eslintrc.json
   {
   	"env": {
   		"browser": true,
   		"node": true,
   		"es2021": true
   	},
   	"extends": "eslint:recommended",
   	"parserOptions": {
   		"ecmaVersion": "latest",
   		"sourceType": "module"
   	},
   	"rules": {}
   }
   ```

3. `package.json`にスクリプトを記述

   ```json title=package.json
   {
   	"scripts": {
   		"lint": "eslint"
   	}
   }
   ```

4. 実行する

   ```zsh
   $ yarn lint index.js
   ```

## Prettier

コード整形ツール

1. インストール

   ```zsh
   $ yarn add prettier -D
   ```

2. 設定ファイルを作成

   ```zsh
   $ vim .prettierrc
   ```

   ```json title=.prettierrc
   {
   	"tabWidth": 2,
   	"semi": false,
   	"useTabs": true,
   	"singleQuote": false,
   	"bracketSameLine": true,
   	"printWidth": 80
   }
   ```

3. `package.json`にスクリプトを記述

   ```json title=package.json
   {
   	"scripts": {
   		"format": "prettier --write"
   	}
   }
   ```

4. 実行する

   ```zsh
   $ yarn format index.js
   ```

## ESlint/Prettier の統合

面倒くさい、、と思ったことは迷わず自動化する（**これ鉄則**）

### アプローチ

1. ESLint プラグインの`eslint-config-prettier`
   - ESLint と Prettier の設定をマージする（競合するルールを無効化する）
2. リンター/フォーマッターは`npm scripts`でそれぞれ実行する

:::tip
[公式](https://prettier.io/docs/en/integrating-with-linters.html)によると、ESLint のルールであるかのように Prettier を実行するプラグインがあるが、<br/>**一般的には推奨しない**と言っています。`eslint-config-prettier`のみでやれと。。
:::

### 構築

1. プラグインのインストール

   ```zsh
   $ yarn add eslint-config-prettier -D
   ```

2. `.eslintrc.json`の修正

   ```json title=.eslintrc.json
   {
   	"extends": ["eslint:recommended", "eslint-config-prettier"]
   }
   ```

3. `package.json`の修正

   構文チェックしつつ、整形する

   ```json title=package.json
   {
   	"scripts": {
   		"format": "prettier --write",
   		"lint": "eslint",
   		"fix": "yarn lint && yarn format"
   	}
   }
   ```

## VSCode で使う

### アプローチ

- VSCode 全体に適用させる
- プロジェクト（ワークスペース）ごとに適用させる

:::info
複数言語使うことを想定すると、後者の方が使い勝手がいいのでその方向で進めます。
:::

### 利点

- プロジェクトディレクトリ配下の`.eslintrc`、`.prettierrc`の設定を読んでくれる
- リアルタイムにコード解析してくれる

### 構築

1. VSCode 拡張機能をインストール

   - ESLint
   - Prettier

2. 設定ファイルを作成

   ```zsh
   $ mkdir .vscode
   $ vim .vscode/settings.json
   ```

   ```json title=settings.json
   {
   	"editor.formatOnSave": true,
   	"editor.defaultFormatter": "esbenp.prettier-vscode"
   }
   ```

## husky + lint-staged

追加/変更されたファイルをコミットする前に何かしらのコマンドを走らせるためのアセット

- `husky` | コミットやプッシュ時に任意のコマンドを実行できる
- `lint-staged` | Staged されたファイルに対して任意のコマンドを実行する
  - Staged | `git add`コマンドで修正されたファイルをコミットするために追加した状態

### 構築

1. インストール

   ```zsh
   $ yarn add husky lint-staged -D
   ```

2. `package.json`を修正

   コミット時に`src`ディレクトリ配下の全ての`.js`ファイルにリンター/フォーマッターを適用する

   ```json
   {
   	"husky": {
   		"hooks": {
   			"pre-commit": "lint-staged"
   		}
   	},
   	"lint-staged": {
   		"src/**/*.js": "yarn fix"
   	}
   }
   ```

## Babel

ES6 以降のモダンな構文で書かれた JavaScript を ES5 に変換するツール

### コンパイル

1. 実行環境が未対応の新しい構文で記述したコードを、実行環境が対応する構文に変換する
2. JavaScript 以外の構文で記述したコードを、JavaScript の構文に変換する

   :::info 代表例

   1.で使われるのが**Babel**、2.のユースケースが**TypeScript**で、どちらも**コンパイラ**というカテゴリ
   :::

**コンパイルの仕組み**

1. **パース** | ソースコードを読み込んで AST(抽象構文木)を生成する
2. **変換** | 生成された AST に対して変更を加える
3. **生成** | 変換後の AST からソースコードを生成する

### 構築

1. インストール

   ```zsh
   $ yarn add @babel/core @babel/cli @babel/preset-env
   ```

   - `@babel/core` | メインとなるパッケージ
   - `@babel/core` | CLI を提供する
   - `@babel/preset-env` | AST の変換処理を行うプラグインの**プリセット**

2. 設定ファイルを作成

   ```json title=.babelrc.json
   {
   	"presets": [
   		[
   			"@babel/preset-env",
   			{
   				// IEで動くようにコンパイルする
   				"targets": {
   					"ie": "11"
   				},
   				"useBuiltIns": "usage",
   				"corejs": {
   					"version": 3,
   					"proposals": true
   				}
   			}
   		]
   	]
   }
   ```

3. コンパイルする

   `dist`ディレクトリが作成されその中にファイルができる

   ```zsh
   $ npx babel index.js -d dist
   ```

   :::tip `node_modules/.bin`にあるコマンドを叩く方法

   1. `package.json`の`scripts`に書く
   2. `npx`コマンドを使う
   3. `node_modules/.bin/<command>`を直接叩く

   :::

:::info
開発では Babel を単独で実行することはほとんどなく、Jest や webpack などから間接的に実行される。
:::

## TypeScript

割愛

## webpack

JavaScript のモジュールバンドラ

- 複数のモジュールを 1 つのファイルにバンドル（結合）する
- その際に色々な変換や加工を行う

### 基本設定

- `entry` | エントリポイント（モジュール結合の開始点となるファイル）のパス
- `output` | バンドルの出力先のディレクトリ(`path`)およびファイル名(`filename`)
- `module.rules` | ローダ（結合するモジュールのファイルに対して行う変換処理）の適用ルールを配列で記述する

  - `test` | 変換対象となるファイルを glob パターン or 正規表現で記述する
  - `exclude` | 変換対象から外すファイルを glob パターン or 正規表現で記述する
  - `use` | 使用するローダを指定する

### 構築

Babel を webpack 経由で起動するパターンで構築する

1. インストール

   ```zsh
   $ yarn add webpack-cli @types/webpack babel-loader -D
   ```

   :::info
   npm@7.x以降は`webpack-cli`に`webpack`も同梱されている
   :::

   :::info
   `@types/webpack`をインストールすると型補完される
   :::

2. 設定ファイルを作成

   ```js title=webpack.config.js
   const path = require('path')

   /**
    * @type {import("webpack").Configuration}
    */
   module.exports = {
   	entry: './src/index.js',
   	output: {
   		path: path.resolve(__dirname, 'dist'),
   		filename: 'bundle.js',
   	},
   	module: {
   		rules: [
   			{
   				test: /\.js$/,
   				include: path.resolve(__dirname, 'src'),
   				exclude: /node_modules/,
   				use: {
   					loader: 'babel-loader',
   				},
   			},
   		],
   	},
   }
   ```

3. バンドルする

   ```zsh
   $ npx webpack
   ```

### Web サーバを使う

UI 設計やスクリプトを配信したいときなど

1. インストール

   ```zsh
   $ yarn add webpack-dev-server -D
   ```

2. `webpack.config.js`を修正

   ```js title=webpack.config.js
   {
      devServer: {
         static: "dist",
         open: "bundle.js",
         https: true,
         hot: true
      },
   }
   ```

   - `static`: コンテンツを提供するディレクトリを指定する
   - `open`: サーバ起動時に開くファイルを指定する
   - `https`: HTTPS でサーバを起動する
   - `hot`: ホットリロードを有効にする

3. `package.json`を修正

   ```json title=package.json
   {
   	"scripts": {
   		"format": "prettier --write",
   		"lint": "eslint",
   		"fix": "yarn lint && yarn format",
   		"start": "webpack serve"
   	}
   }
   ```

4. サーバを起動する

   ```zsh
   $ yarn start
   ```

:::tip バンドルファイルの実態
バンドルしたファイルはオンメモリで保持される。<br/>
`dist/bundle.js`というファイルの実態は存在しない。存在してもメモリ上を参照する。
:::
