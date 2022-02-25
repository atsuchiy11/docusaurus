---
sidebar_position: 2
---

# EventEmitter

- Node.js における Observer パターンを実装するためのモジュール
- 監視対象（`Subject`）に対して発生した何らかのイベントが、監視役（`Observer`）に逐一通知される
- `Subject`には複数の`Observer`を登録できる
- `EventEmitter`自体は`Subject`として機能し、リスナが`Observer`として機能する

**まとめると、任意のイベントを定義して Observer パターンを実装できる**

## メソッド

- `on(event, listener)`
  - 指定したイベントに対する新しいリスナを登録する
- `once(event, listener)`
  - 一度イベントが発行されたら削除され、以降のイベントでは実行されない
- `off(event, listener)`
  - 指定されたイベントに登録されたリスナを削除する
- `emit(event[, ...args])`
  - 指定したイベントを指定した引数で発行する

## FizBuzz の実装

```js title=イベント処理の定義
function createFizzBuzzEventEmitter(until) {
	const eventEmitter = new events.EventEmitter()
	// イベントの発行を常に非同期にする
	Promise.resolve().then(
		() => _emitFizzBuzz(eventEmitter, until)
		// or
		// process.nextTick(() => _emitFizzBuzz(eventEmitter, until))
	)
	return eventEmitter
}

async function _emitFizzBuzz(eventEmitter, until) {
	eventEmitter.emit('start')
	let count = 1
	while (count <= until) {
		await new Promise((resolve) => setTimeout(resolve, 100))
		if (count % 15 === 0) {
			eventEmitter.emit('FizzBuzz', count)
		} else if (count % 3 === 0) {
			eventEmitter.emit('Fizz', count)
		} else if (count % 5 === 0) {
			eventEmitter.emit('Buzz', count)
		}
		count += 1
	}
	eventEmitter.emit('end')
}
```

```js title=リスナの登録/削除
const startListener = () => console.log('start')
const fizzListener = (count) => console.log('Fizz', count)
const buzzListener = (count) => console.log('Buzz', count)
const fizzBuzzListener = (count) => console.log('FizzBuzz', count)

function endListener() {
	console.log('end')
	this.off('start', startListener)
		.off('Fizz', fizzListener)
		.off('Buzz', buzzListener)
		.off('FizzBuzz', fizzBuzzListener)
		.off('end', endListener)
}

createFizzBuzzEventEmitter(40)
	.on('start', startListener)
	.on('Fizz', fizzListener)
	.once('Buzz', buzzListener)
	.on('FizzBuzz', fizzBuzzListener)
	.on('end', endListener)
```

### イベントは同期的に実行される

```js title=イベントを同期的に定義した場合
function createFizzBuzzEventEmitter(until) {
	const eventEmitter = new events.EventEmitter()
	_emitFizzBuzz(eventEmitter, until)
    // ...

async function _emitFizzBuzz(eventEmitter, until) {
	eventEmitter.emit('start') // 1.イベントが発行される
    // ...

createFizzBuzzEventEmitter(40)
	// リスナ登録より先にイベントが発行されているので実行されない
	.on('start', startListener) // 2.リスナを登録する
    // ...
```

### リスナは同期的に実行される

```js
const fooEvenEmitter = new events.EventEmitter()
// 登録と同時に実行
fooEvenEmitter.on('foo', () => console.log('イベントリスナの実行'))
console.log('fooイベントの発行', fooEvenEmitter.emit('foo'))
```

```zsh title=実行結果
イベントリスナの実行
fooイベントの発行 true
```

### リスナはガベージコレクションの対象外

```js
const barEventEmitter = new events.EventEmitter()
for (let i = 0; i < 11; i++) {
	barEventEmitter.on('bar', () => console.log('bar'))
}
```

```zsh title=実行結果
MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 bar listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit
```

:::info リスナ数 10 を超える
`EventEmitter.setMaxListeners(size: number)`を使う

```js
const barEventEmitter = new events.EventEmitter()
barEventEmitter.setMaxListeners(100)
for (let i = 0; i < 11; i++) {
	barEventEmitter.on('bar', () => console.log('bar'))
}
```

:::

### エラーハンドリング

`EventEmitter`では`error`イベントでエラーを伝播する

```js
try {
	new events.EventEmitter()
		.on('error', (err) => console.log('errorイベント'))
		// errorイベントで補足されcatch文は通らない
		.emit('error', () => new Error('エラー'))
} catch (err) {
	console.log('catch')
}
```

```zsh title=実行結果
errorイベント
```

### 継承

継承パターンの方が多いのでこちらを使う。

```js title=EventEmitterを継承したクラス
class FizzBuzzEventEmitter extends events.EventEmitter {
	async start(until) {
		this.emit('start')
		let count = 1
		while (true) {
			if (count % 15 === 0) {
				this.emit('FizzBuzz', count)
			} else if (count % 3 === 0) {
				this.emit('Fizz', count)
			} else if (count % 5 === 0) {
				this.emit('Buzz', count)
			}
			count += 1
			if (count >= until) break
			await new Promise((resolve) => setTimeout(resolve, 100))
		}
		this.emit('end')
	}
}
```

```js title=インスタンス生成
new FizzBuzzEventEmitter()
	.on('start', startListener)
	.on('Fizz', fizzListener)
	.once('Buzz', buzzListener)
	.on('FizzBuzz', fizzBuzzListener)
	.on('end', endListener)
	.start(20)
```

### async を使う

`events.on(emitter, eventName)`

`EventEmitter`から async イテラブルを生成し、`for await...of`でハンドリングする

1. `emitter`に`eventName`のリスナを登録する
2. `emit`でイベントを発行する
3. `for await...of`から抜けるとリスナは削除される

```js
;(async () => {
	const eventAEmitter = new events.EventEmitter()
	const eventAIterable = events.on(eventAEmitter, 'eventA')
	console.log(eventAEmitter.listeners('eventA'))

	// ここは同期処理
	eventAEmitter.emit('eventA', 'hello')
	eventAEmitter.emit('eventA', 'hello', 'world')
	eventAEmitter.emit('eventA', 'end')

	// 発行されたイベントを順番に処理（endで抜ける）
	for await (const a of eventAIterable) {
		if (a[0] === 'end') {
			break
		}
		console.log('eventA', a)
	}
	// ループから抜けるとリスナは削除される
	console.log(eventAEmitter.listeners('eventA'))
})()
```

### Promise を使う

`events.once(emitter, eventName)`

```js
const eventBEmitter = new events.EventEmitter()
const eventBPromise = events.once(eventBEmitter, 'eventB')
eventBPromise.then((arg) => console.log('eventB発生', arg))
eventBEmitter.emit('eventB', 'hello', 'world')
```
