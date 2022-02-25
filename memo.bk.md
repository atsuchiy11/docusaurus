# Node.js

## コールバックによる非同期処理の実装

- コールバックがパラメータの最後にあること
- コールバックの最初のパラメータが処理中に発生したエラー、2 つ目以降のパラメータが処理の結果であること

## Promise

**ショートサーキット** | Promise インスタンスが*settled*になること w

| メソッド               | ショートサーキットの条件       |
| ---------------------- | ------------------------------ |
| `Promise.all()`        | 1 つでも*rejected*になったとき |
| `Promise.race()`       | 1 つでも*settled*になったとき  |
| `Promise.allSettled()` | ショートサーキットしない       |
| `Promise.any()`        | 1 でも*fulfilled*になったとき  |

### Node.js の Promise 対応

- `util.promisify` | 非同期関数を Promise を返す関数に変換する

  ```js
  const fs = require('fs')
  const util = require('util')
  const readdir = util.promisify(fs.readdir)
  readdir('./').then(console.log)
  ```

- fs Promises API | Promise インターフェースを持つ`fs`モジュール

  ```js
  const fs = require('fs')
  fs.promises.readdir('./').then(console.log)
  ```

## ジェネレータ

- ジェネレータの生成

  ```js
  function* generator() {
  	yield 1
  	yield 2
  	yield 3
  	return 'ジェネレータ関数の戻り値'
  }
  ```

- ジェネレータの実行

  - `next()メソッド`

    ```js
    const gen = generator()
    console.log(gen.next())
    console.log(gen.next())
    console.log(gen.next())
    console.log(gen.next())
    ```

  - `for...of`構文

    ```zsh
    { value: 1, done: false }
    { value: 2, done: false }
    { value: 3, done: false }
    { value: 'ジェネレータ終わり', done: true }
    ```

### イテレータ

**イテレータプロトコル**

- `value` | イテレータによって返される値。
- `done` | イテレータが全ての値を返し終えたかどうかを表す

イテレータプロトコルを実装したオブジェクトを、**イテレータ**という

### next()

`next()`に引数を渡すと、渡した値はジェネレータ関数内で直前に実行された`yield`の戻り値になる。

```js
function* resetableGenerator() {
	let count = 0
	while (true) {
		if (yield count++) {
			count = 0
		}
	}
}
```

```js
const gen = resetableGenerator()
console.log(gen.next()) // 0
console.log(gen.next()) // 1
console.log(gen.next()) // 2
console.log(gen.next()) // 3
console.log(gen.next(true)) // 4になる前にリセットされて0
```

```zsh
{ value: 0, done: false }
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: 0, done: false }
```

### throw()

`throw()`でジェネレータ関数内で直前に実行された`yield`にエラーを投げる。

```js
function* tryCatchGenerator() {
	let count = 0
	while (true) {
		try {
			yield count++
		} catch (err) {
			console.error('エラーをキャッチ', err)
		}
	}
}
```

```js
const gen = tryCatchGenerator()
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())
gen.throw(new Error('エラーを渡す'))
```

```zsh
{ value: 0, done: false }
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
エラーをキャッチ
```

### ジェネレータによる非同期プログラミング

- Promise パターン

  ```js
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

- ジェネレータパターン

  ```js
  function* parseJSONAsyncGenerator(json) {
  	try {
  		const result = yield parseJSONAsync(json)
  		console.log('Result:', result)
  	} catch (err) {
  		console.error('ERR::', err)
  	}
  }
  ```

- 正常系

  ```js
  // ジェネレータを生成
  const genOK = parseJSONAsyncGenerator('{"foo":1}')
  // ジェネレータからPromiseインスタンスを取得する
  const promiseOK = genOK.next().value
  // Promiseインスタンスが解決された結果をnext()でジェネレータに渡す
  promiseOK.then((result) => genOK.next(result))
  ```

- 異常系

  ```js
  /** 異常系 */
  const genNG = parseJSONAsyncGenerator('不正なJSON')
  const promiseNG = genNG.next().value
  promiseNG.catch((err) => genNG.throw(err))
  ```

### エラーハンドリング

汎用的なジェネレータのハンドリング処理

```js
function handleAsyncWithGenerator(generator, resolved) {
	const { done, value } = generator.next(resolved)
	if (done) {
		return Promise.resolve(value)
	}
	return value.then(
		(resolved) => handleAsyncWithGenerator(generator, resolved),
		(err) => generator.throw(err)
	)
}
handleAsyncWithGenerator(parseJSONAsyncGenerator('{"foo":1}'))
handleAsyncWithGenerator(parseJSONAsyncGenerator('不正なJSON'))
```

## async/await

### トップレベル await

- ES モジュールではトップレベルで await が扱える
- CommonJS では不可（require が同期処理なので）

1.  Node.js で ES モジュールを使う

    - `package.json`に`type`を追加する
    - `commonjs`だと`cjs`、`module`だと`esm`として`.js`を扱う

      ```json
      {
      	"name": "nodejs",
      	"version": "1.0.0",
      	"main": "index.js",
      	"license": "MIT",
      	"type": "module"
      }
      ```

2.  モジュールを作る

    ```js
    // chidld-a.js
    console.log('child-a 1')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('child-a 2')
    ```

    ```js title="child-b.js"
    // child-b.js
    console.log('child-b')
    ```

    ```js
    // parent.js
    import './child-a.js'
    import './child-b.js'
    console.log('parent')
    ```

3.  実行する

    ```zsh
    $ node parent
    child-a 1
    child-b
    # 1秒後
    child-a 2
    parent
    ```

### `for await...of`

非同期イテラブルを反復処理する

```js
async function* asyncGenerator() {
	let i = 0
	while (i <= 3) {
		await new Promise((resolve) => setTimeout(resolve, 100))
		yield i++
	}
}
for await (const element of asyncGenerator()) {
	console.log(element)
}
```

## EventEmittter

`Observer`パターンに基づく。<br/>

- 監視対象（`Subject`）に対して発生した何らかのイベントが、監視役（`Observer`）に逐一通知される
- `Subject`には複数の`Observer`を登録できる

主なメソッド

- `on(event, listener)`
  - 指定したイベントに対する新しいリスナを登録する
- `once(event, listener)`
  - 一度イベントが発行されたら削除され、以降のイベントでは実行されない
- `off(event, listener)`
  - 指定されたイベントに登録されたリスナを削除する
- `emit(event[, ...args])`
  - 指定したイベントを指定した引数で発行する
