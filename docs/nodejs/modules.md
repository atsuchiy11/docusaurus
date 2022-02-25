---
sidebar_position: 6
---

# モジュールシステム

## CommonJS

Node.js 環境におけるモジュールシステム

- `module`という変数の`exports`プロパティが外部に公開される
- インポートするには`require()`関数を使う

### `module`と`module.exports`

`exports`はショートカットで、初期状態では`module.exports`への参照になる

```js
const module = { exports: {} }
let exports = module.exports
```

```js title=cjs-module.js
// exportsプロパティを更新する
exports.foo = 'foo'
exports.bar = 'bar'
// module.exportsプロパティを更新する
module.exports = { foo: 'bar' }
// exportsは参照なので、module.exportsには影響しない
exports.fizz = 'fizz'
```

```js title=cjs-main.js
const myModule = require('./cjs-module')
console.log(myModule)
// {foo: 'bar'}
```

### JSON

JSON は JavaScript オブジェクトにパースされた状態でインポートされる

```json title=key-value.json
{ "key": "value" }
```

```zsh
$ node
Welcome to Node.js v16.13.0.
Type ".help" for more information.
> require("./key-value.json")
{ key: 'value' }
```

### `__filename`と`__dirname`

```js title=cjs-filename.js
module.exports = { __filename, __dirname }
```

```zsh
$ pwd
/private/tmp/nodejs/_src/modules
$ node
Welcome to Node.js v16.13.0.
Type ".help" for more information.
> require("./cjs-filename.js")
{
  __filename: '/private/tmp/nodejs/_src/modules/cjs-filename.js',
  __dirname: '/private/tmp/nodejs/_src/modules'
}
```

### `strict`モード

CommonJS ではデフォルトで非 strict モード（`sloppy`モード）なので`use strict;`をつけましょう

[strict モード？](/docs/javascript/chapter03#strict%E3%83%A2%E3%83%BC%E3%83%89)

:::info
後述の ES モジュールでは常に strict モードになる。<br/>
（そもそもブラウザ環境の JavaScript で導入されたものなので）
:::

## ES モジュール

ブラウザ環境（ECMAScript 標準）におけるモジュールシステム

- `export`文で外部に公開（エクスポート）する

  - `export`で名前付きエクスポート
  - `export default`でデフォルトエクスポート

- `import`文でインポートする
  - `{}`で名前付きエクスポートのインポート
  - `as`で別名インポート
  - `*`で名前空間インポート

```js title=mjs-math.mjs
console.log('Hello from esm-math.js')

// 名前付きエクスポート
export const add = (a, b) => a + b
export const substract = (a, b) => a - b
const multiply = (a, b) => a * b
export { multiply }

// デフォルトエクスポート
export default class Math {
	constructor(value) {
		this.value = value
	}
	add(value) {
		return new Math(this.value + value)
	}
	substract(value) {
		return new Math(this.value - value)
	}
}
```

```js title=mjs-main.js
import Math, { add, substract as sub, multiply } from './esm-math.mjs'
import * as math from './esm-math.mjs'
import json from './key-value.json'

console.log(Math)
console.log('add', add)
console.log('sub', sub)
console.log('multiply', multiply)
console.log(math)
console.log(json)
```

```zsh title=実行結果
$ node --experimental-json-modules esm-main.mjs
Hello from esm-math.js
[class Math]
add [Function: add]
sub [Function: substract]
multiply [Function: multiply]
[Module: null prototype] {
  add: [Function: add],
  default: [class Math],
  multiply: [Function: multiply],
  substract: [Function: substract]
}
{ key: 'value' }
```

:::tip
`import`文はデフォルトでは JSON ファイルをインポートできない<br/>
`--experimental-json-modules`フラグで有効にする。なお REPL はどうやってもできない。
:::

:::info ES モジュールのキャッシュ
`mjs-math.js`を 2 回インポートしているのに"**Hello from esm-math.js**"が 1 回しか表示されない。<br/>
ES モジュール(CommonJS も)はインポートしたモジュールがキャッシュされる。
:::

## 両者の違い

### 識別

- 拡張子が`.cjs`のものは CommonJS モジュール
- 拡張子が`.mjs`のものは ES モジュール
- 拡張子が`.js`のものは最も近い階層にある`package.json`の`type`フィールドの値

  - `commonjs` | CommonJS として扱う。デフォルト
  - `module` | ES モジュールとして扱う

    ```json
    { "type": "module" }
    ```

    :::tip
    `.js`でも拡張子を省略できなくなる
    :::

### 性質

- CommonJS モジュールは動的、ES モジュールは静的
- CommonJS モジュールは同期的、ES モジュールは非同期的

```js title=exporter.js
export const foo = 'foo'
console.log('exporterの本文')
```

```js title=importer.js
console.log('importerの本文', foo)
import { foo } from './exporter.js'
```

```zsh
$ node imports.js
# 先にこちらが実行されるということはモジュールは静的に読み込まれている
exporterの本文　
# foo変数が参照できるということは、やはりモジュールは先に読み込まれている
importerの本文 foo
```

:::info
つまり ES モジュールの import 文は巻き上げ（hoisting）が行われるということ
:::

:::tip 動的インポート

ES モジュールも動的に読み込むことができる。<br/>
遅延ロードすることで初回読み込みの負荷軽減など、パフォーマンス目的で使う

```js
const { foo } = await import('./exporter.js')
console.log('importerの本文', foo)
// exporterの本文
// importerの本文 foo
```

:::

### トップレベル await

ES モジュールはトップレベルで await を使える。CommonJS では使えない。

```js title=top-level-await.js
const asyncFunc = async () => {
	await new Promise((resolve) => setTimeout(resolve, 1000))
	console.log('hello, world')
}

await asyncFunc()
console.log('finish')
```

- CommonJS

  ```json title=package.json
  { "type": "commonjs" }
  ```

  ```zsh
  $ node top-level-await.js
  SyntaxError: await is only valid in async functions and the top level bodies of modules
  ```

- ES モジュール

  ```json title=package.json
  { "type": "module" }
  ```

  ```zsh
  $ node top-level-await.js
  # 1秒待つ
  hello, world
  finish
  ```
