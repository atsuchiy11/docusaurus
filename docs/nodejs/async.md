---
sidebar_position: 1
---

# 非同期プログラミング

## コールバック

### 規約

**コールバックによる非同期処理の実装に関する規約**

- コールバックがパラメータの最後にあること
- コールバックの最初のパラメータが処理中に発生したエラー、2 つ目以降のパラメータが処理の結果であること

```js title=parseJSON.js
function parseJSONAsync(json, callback) {
	setTimeout(() => {
		try {
			callback(null, JSON.parse(json))
		} catch (err) {
			callback(err)
		}
	}, 1000)
}
```

```js title=コールバック関数の第一引数はエラー、第二引数は結果にする
// 正常系
parseJSONAsync('{"foo": "bar"}', (err, result) => {
	if (err) console.error('ERR::', err)
	else console.log('Result:', result)
})
// 異常系
parseJSONAsync('不正なJSON', (err, result) => {
	if (err) console.error('ERR::', err)
	else console.log('Result:', result)
})
```

### 同期／非同期を混ぜない

コールバックをパラメータとする関数は、常に同期的 or 非同期的に実行させる

```js title=キャッシュの有無で同期的/非同期的に実行される関数
const cache = {}

function parseJSONAsyncWithCache(json, callback) {
	const cached = cache[json]
	if (cached) {
		// 同期的
		callback(cached.err, cached.result)
		return
	}
	// 非同期的
	parseJSONAsync(json, (err, result) => {
		cache[json] = { err, result }
		callback(err, result)
	})
}
```

```js title=実行する
parseJSONAsyncWithCache('{"message":"hello"}', (err, result) => {
	if (err) console.error('1st error:', err)
	else console.log('1st result:', result)

	parseJSONAsyncWithCache('{"message":"hello"}', (err, result) => {
		if (err) console.error('2nd error:', err)
		else console.log('2nd result:', result)
	})
	console.info('2nd called')
})
console.info('1st called')
```

```zsh
1st called
1st result: null {message: 'hello'}
2nd result: null {message: 'hello'}
2nd called
```

```js title=キャッシュの有無に関わらず非同期的に実行される関数
const cache = {}

function parseJSONAsyncWithCache(json, callback) {
	const cached = cache[json]
	if (cached) {
		// 非同期的
		setTimeout(() => callback(cached.err, cached.result), 0)
		return
	}
	// 非同期的
	parseJSONAsync(json, (err, result) => {
		cache[json] = { err, result }
		callback(err, result)
	})
}
```

```zsh
1st called
1st result: {message: 'hello'}
2nd called
2nd result: {message: 'hello'}
```

:::info コールバックの実行を非同期化するための API

- `setTimeout()`

  イベントループの次のフェーズが回ってこないと実行されない

  ```js
  setTimeout(() => callback(cached.err, cached.result), 0)
  ```

- `process.nextTick()`

  イベントループが次のフェーズに進む前に実行されるが、ブラウザ環境で**動作しない**

  ```js
  process.nextTick(() => callback(cached.err, cached.result))
  ```

- `queueMicrotask()`

  イベントループが次のフェーズに進む前に実行されるが、ブラウザでも**動作する**

  ```js
  queueMicrotask(() => callback(cached.err, cached.result))
  ```

- `Promise`を使う（**結局お前か**）

  fulfilled な Promise インスタンスを生成して`then()`メソッドで実行する

  ```js
  Promise.resolve().then(() => callback(cached.err, cached.result))
  ```

:::

## Promise

非同期処理の状態と結果を表現するオブジェクト

![Promise状態遷移](/img/nodejs/promise-status.png)

### Promise で書き換える

```js title=parseJSON.js
function parseJSONAsync(json) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			try {
				resolve(JSON.parse(json))
			} catch (err) {
				reject(err)
			}
		}, 1000)
	})
}
```

### コンストラクタとメソッド

pending を経ず、fulfilled または rejected な Promise インスタンスを直接生成する

```js title=コンストラクタを使う
const resolved = new Promise((resolve) => resolve({ foo: 1 }))
const rejected = new Promise((_, reject) => reject(new Error('エラー')))
resolved.then(console.log)
rejected.catch(console.error)
// {foo: 1}
// Error: エラー
```

```js title=メソッドを使う
const resolved = Promise.resolve({ foo: 1 })
const rejected = Promise.reject(new Error('エラー'))
resolved.then(console.log)
rejected.catch(console.error)
// {foo: 1}
// Error: エラー
```

### `then()`

Promise インスタンスの状態が fulfilled または rejected になったときに実行するコールバックを登録するメソッド

- `then()`の戻り値は登録したコールバックの戻り値で解決される新しい Promise インスタンス
- `then()`の実行は元の Promise インスタンスに影響を及ぼさない

  ```js
  const stringPromise = Promise.resolve('{"foo":1}')
  console.log(stringPromise)
  const numberPromise = stringPromise.then((str) => str.length)
  console.log(numberPromise)
  console.log(stringPromise)
  ```

  ```zsh
  Promise { '{"foo":1}' }
  Promise { <pending> } # then()で返るものPromise
  Promise { '{"foo":1}' } # 元のPromiseはそのまま
  ```

:::info
つまりチェーンできるということ。
:::

### `catch()`

割愛

### `finally()`

割愛

### コールバックの実行タイミング

常に非同期的に処理される

```js
Promise.resolve('foo').then(console.log)
console.log('finish')
// finish
// foo
```

### 並行処理

複数の非同期処理を並列実行する Promise の静的メソッド

**ショートサーキット** | Promise インスタンスが*settled*になること

| メソッド               | ショートサーキットの条件       |
| ---------------------- | ------------------------------ |
| `Promise.all()`        | 1 つでも*rejected*になったとき |
| `Promise.race()`       | 1 つでも*settled*になったとき  |
| `Promise.allSettled()` | ショートサーキットしない       |
| `Promise.any()`        | 1 でも*fulfilled*になったとき  |

**`Promise.all()`**

全ての Promise インスタンスが fulfilled になったとき、自身も fulfilled になる

```js
const allResolved = Promise.all([1, Promise.resolve('foo'), Promise.resolve(true)])
allResolved.then(console.log)
// [ 1, 'foo', true ]
```

**`Promise.race()`**

Promise インスタンスが 1 つでも settled になると、自身もそのインスタンスと同じ状態になる

```js title=引数に指定した時間内に終わらなければタイムアウトエラーにする
function withTimeout(promise, timeout) {
	return Promise.race([
		promise,
		new Promise((_, reject) =>
			setTimeout(() => reject(new Error('Timeout!')), timeout)
		),
	])
}
const promise = new Promise((resolve) => setTimeout(() => resolve('fin'), 20))
// 正常系
const shouldBeResolved = withTimeout(promise, 30)
shouldBeResolved.then(console.log)
// 異常系
const sholdBeRejected = withTimeout(promise, 10)
sholdBeRejected.catch(console.log)
```

**`Promise.allSettled()`**

全ての Promise インスタンスが settled になったとき、自身は fulfilled になる

```js
const allSettled = Promise.allSettled([
	1,
	Promise.resolve('foo'),
	Promise.reject(new Error('ERR::')),
	Promise.resolve(true),
])
allSettled.then(console.log)
```

**`Promise.any()`**

Promise インスタンスが 1 つでも fulfilled になったとき、自身も fulfilled になる

```js
const anyFulfilled = Promise.any([
	Promise.resolve('foo'),
	Promise.reject(new Error('ERR::')),
	Promise.resolve(true),
])
anyFulfilled.then(console.log)
```

### Node.js の Promise 対応

- **`util.promisify`**

  コールバック規約を満たした非同期関数を Promise を返す関数に変換する

  ```js
  const fs = require('fs')
  const util = require('util')
  const readdir = util.promisify(fs.readdir)
  readdir('./').then(console.log)
  // ['await-for.js', 'callback.js', 'promise.js']
  ```

- **fs Promise API**

  Promise インターフェースを持つ`fs`モジュール

  ```js
  const fs = require('fs')
  fs.promises.readdir('./').then(console.log)
  // ['await-for.js', 'callback.js', 'promise.js']
  ```

など

## ジェネレータ

処理を途中で停止したり再開したりできるジェネレータ関数から返されるオブジェクト

```js title=ジェネレータ関数の定義
function* generatorFunc() {
	yield 1
	yield 2
	yield 3
	return 'ジェネレータ終わり'
}
```

```js title=ジェネレータの生成と実行
const generator = generatorFunc()
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())
```

```zsh
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: 'ジェネレータ終わり', done: true }
```

:::info
他言語では「ジェネレータ（関数）はイテレータを返す関数」と定義されるので、<br/>
**「ジェネレータ === イテレータ」**と解釈しても良さそう。
:::

### イテレータとイテラブル

**ぶっちゃけ C#/Python の方が理解しやすい。。所詮後付けか*w***

- **イテレータ**
  - `next()`メソッドを持つオブジェクト
- `next()`は**イテレータプロトコル**で定義されるオブジェクトを返す
  - イテレータプロトコル
    - `value` | イテレータによって返される値。
    - `done` | イテレータが全ての値を返し終えたかどうかを表す
- **イテラブル**

  - イテレータを持つオブジェクト
  - `[Symbol.iterator]()` メソッドを実行するとイテレータを返す
  - 単に反復可能なオブジェクト、の理解でいい気もする

    ```js
    const arr = [1, 2, 3, 4, 5]
    const iter = arr[Symbol.iterator]()
    console.log(iter.next())
    // {value: 1, done: false}
    ```

### `for...of`構文

イテラブル（反復可能なオブジェクト）に対して反復処理する

```js
const generator = generatorFunc()
for (const value of generator) {
	console.log(value)
}
```

### `next()`

`next()`に引数を渡すと、渡した値はジェネレータ関数内で直前に実行された`yield`の戻り値になる。

```js title=next()経由でリセット可能なカウンタ
function* resetableGenerator() {
	let count = 0
	while (true) {
		// next()に引数が渡されるとyieldに代入される（イメージ）
		if (yield count++) {
			count = 0
		}
	}
}
```

```js title=ジェネレータ（イテレータ）を実行する
const gen = resetableGenerator()
console.log(gen.next()) // 0
console.log(gen.next()) // 1
console.log(gen.next()) // 2
console.log(gen.next()) // 3
console.log(gen.next(true)) // 4になる前にリセットされて0
```

### `throw()`

`throw()`でジェネレータ関数内で直前に実行された`yield`にエラーを投げる。

```js title=throw()でエラーを投げて停止させるカウンタ
function* tryCatchGenerator() {
	let count = 0
	while (true) {
		try {
			yield count++
		} catch (err) {
			console.error('エラーをキャッチ')
		}
	}
}
```

```js title=実行する
const gen = tryCatchGenerator()
console.log(gen.next()) // 0
console.log(gen.next()) // 1
console.log(gen.next()) // 2
console.log(gen.next()) // 3
gen.throw(new Error('エラーを渡す')) // エラーをキャッチ
```

### 非同期処理

Promise をジェネレータを使って書き換える

```js title=parseJSON.js（再掲）
function parseJSONAsync(json) {
	return new Promise((resolve, reject) =>
		setTimeout(() => {
			try {
				resolve(JSON.parse(json))
			} catch (err) {
				reject(err)
			}
		}, 1000)
	)
}
```

```js title=非同期処理を実行するジェネレータ
function* parseJSONAsyncGenerator(json) {
	try {
		const result = yield parseJSONAsync(json)
		console.log('Result:', result)
	} catch (err) {
		console.error('ERR::', err)
	}
}
```

```js title=イテレータを生成＆実行
/** 正常系 */
// ジェネレータを生成
const gen = parseJSONAsyncGenerator('{"foo":1}')
// ジェネレータからPromiseインスタンスを取得する
const promise = gen.next().value
// Promiseインスタンスが解決された結果をnext()でジェネレータに渡す
promise.then((result) => gen.next(result))
// Result: {foo: 1}

/** 異常系 */
const gen = parseJSONAsyncGenerator('不正なJSON')
const promise = gen.next().value
promise.catch((err) => gen.throw(err))
// ERR:: SyntaxError: Unexpected token 不 in JSON at position 0
```

```js title=汎用的なハンドリング処理
function handler(generator, resolved) {
	const { done, value } = generator.next(resolved)
	if (done) {
		return Promise.resolve(value)
	}
	return value.then(
		(resolved) => handler(generator, resolved),
		(err) => generator.throw(err)
	)
}
handler(parseJSONAsyncGenerator('{"foo":1}'))
handler(parseJSONAsyncGenerator('不正なJSON'))
// Result: {foo: 1}
// ERR:: SyntaxError: Unexpected token 不 in JSON at position 0
```

:::note
つまり`async/await`が素晴らしいということ
:::

## async/await

- `function*` -> `async`
- `yield` -> `await`

に書き換えるイメージ

- `async`は必ず Promise インスタンスを返す

  ```js
  const asyncReturnFoo = async () => 'foo'
  asyncReturnFoo().then(console.log)
  // foo

  const asyncThrowError = async () => {
  	throw new Error('エラー')
  }
  asyncThrowError().catch(console.error)
  // Error: エラー
  ```

```js title=async/awaitを使う
async function asyncFunc(json) {
	try {
		const result = await parseJSONAsync(json)
		console.log('Result:', result)
	} catch (err) {
		console.log('ERR::', err)
	}
}
```

```js
asyncFunc('{"foo":1}')
asyncFunc('不正なJSON')
// Result: {foo: 1}
// ERR:: SyntaxError: Unexpected token 不 in JSON at position 0
```

### `for await...of`

async なイテレータを反復処理する

- イテレーションごとに`next()`メソッドが実行される

```js title=asyncなジェネレータが返すオブジェクトはasyncなイテレータ
async function* asyncGenerator() {
	let i = 0
	while (i <= 3) {
		await new Promise((resolve) => setTimeout(resolve, 100))
		yield i++
	}
}
```

```js
;(async () => {
	for await (const element of asyncGenerator()) {
		console.log(element)
	}
})()
```
