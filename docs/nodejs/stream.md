---
sidebar_position: 3
---

# ストリーム

ファイル一度に全て読み込むのではなく、読み込みが完了した部分から処理していくための標準インターフェース

```js
const fs = require('fs')
const path = require('path')
const inputPath = path.join(__dirname, 'memo.md')
const outputPath = path.join(__dirname, 'memo.bk.md')
```

```js title=一括でファイルを読み込む
function copyFile(src, dest, cb) {
	fs.readFile(src, (err, data) => {
		if (err) return cb(err)
		fs.writeFile(dest, data, cb)
	})
}
copyFile(inputPath, outputPath, (res) => console.log(res))
```

:::caution 2GB を超えるファイル

Node.js では次のようなエラーを投げる

```zsh
RangeError [ERR_FS_FILE_TOO_LARGE]: File size (2149580800) is greater than possible Buffer: 2147483647 bytes
```

:::

```js title=ストリームを使う
function copyFileWithStream(src, dest, cb) {
	fs.createReadStream(src).pipe(fs.createWriteStream(dest)).on('finish', cb)
}
copyFileWithStream(inputPath, outputPath, (res) => console.log(res))
```

## ストリームの種類

- 読み込みストリーム
- 書き込みストリーム
- 二重ストリーム
  - 変換ストリーム

## 読み込みストリーム

`pipe()`接続、二重、変換ストリームで読み込み可能なデータを生成する。

- 読み込み可能になると`readable`イベントを発行する
- `readable`イベントの中で`read()`メソッドでデータが読み込める
- 読み込みが完了したときに`end`イベントを発行する

```js
const readStream = fs.createReadStream(inputPath)
readStream
	.on('readable', () => {
		console.info('readable')
		let chunk
		while ((chunk = readStream.read()) !== null) {
			console.log(`chunk: ${chunk.toString()}`)
		}
	})
	.on('end', () => console.log('fin'))
```

### 継承して使う

`stream.Readable`クラスを継承して、`_read()`メソッドをオーバライドする

```js title=クラスの実装
const stream = require('stream')

class HelloReadableStream extends stream.Readable {
	constructor(options) {
		super(options)
		this.languages = ['JavaScript', 'Python', 'Java', 'C#']
	}
	_read(size) {
		console.log('_read()')
		let language
		while ((language = this.languages.shift())) {
			// readableのpush()はデータを流せない時falseを返す
			if (!this.push(`Hello, ${language}!\n`)) {
				console.log('読み込み中断')
				return
			}
		}
		console.log('読み込み完了')
		this.push(null)
	}
}
```

```js title=実行
const helloReadableStream = new HelloReadableStream()
helloReadableStream
	.on('readable', () => {
		console.log('readable')
		let chunk
		while ((chunk = helloReadableStream.read()) !== null) {
			console.log(`chunk: ${chunk.toString()}`)
		}
	})
	.on('end', () => console.log('end'))
```

```zsh title=実行結果
_read()
読み込み完了
readable
chunk: Hello, JavaScript!
Hello, Python!
Hello, Java!
Hello, C#!

end
```

:::caution 内部関数を外部から実行しない
`_read()`は内部実装に使われる関数なので、外部から呼び出すときは`read()`を使う
:::

:::tip 一時停止モードとフローイングモード

- 一時停止モード
  - デフォルト。`read()`メソッドを明示的に呼び出さない限りデータは流れない
- フローイングモード
  - データはストリームから自動的に読み込まれる

```js
readableStream.on('data', (chunk) => console.log(chunk))
```

`data`イベントリスナを登録すると、フローイングモードに移行する。<br/>
`readble`、`data`イベントを併用すると予期せぬ挙動をもたらす可能性がある。

:::

## 書き込みストリーム

読み込みストリームから流れてきたデータを受け取るストリーム

- `write(chunk[, encoding][, callback]): boolean` | データを流す

  - `chunk` | 流したいデータ。必須
  - `encoding` | データが文字列の場合に指定できる文字エンコード。デフォルトは UTF-8
  - `callback` | データを処理し終わったタイミングで実行されるコールバック
  - 戻り値は追加のデータを受け入れ可能かを表す`boolean`

- `end([chunk][, encoding][, callback]): this`

  - `chunk`がオプショナルであること以外は`write`と同様
  - 戻り値は`this`（呼び出しストリーム自身）
  -

- 書き込み完了時に`finish`イベントが発行される

```js
const filePath = path.join(__dirname, 'dest.txt')

const writeStream = fs.createWriteStream(filePath)
writeStream.write('Hello\n')
writeStream.write('World\n')
writeStream.end(() => {
	const fin = fs.readFileSync(filePath, 'utf8')
	console.log(fin)
})
// Hello
// World
```

:::info バックプレッシャ
ストリームの下流でのデータの流れがその上流よりも遅い場合「それ以上データを流せない」ことを通知する<br/>
読み取りストリームの`push()`メソッド、書き込みストリームの`write()`では`false`を返す
:::

### 継承して使う

```js
class DelayLogStream extends stream.Writable {
	constructor(options) {
		// データをオブジェクトとして流す
		super({ objectMode: true, ...options })
	}
	_write(chunk, encoding, callback) {
		console.log('_write()')
		const { message, delay } = chunk
		setTimeout(() => {
			console.log(message)
			// バックプレッシャを制御するためのcallback
			callback()
		}, delay)
	}
}
const delayLogStream = new DelayLogStream()
delayLogStream.write({ message: 'Hi', delay: 0 })
delayLogStream.write({ message: 'Thank you', delay: 1000 })
delayLogStream.end({ message: 'Bye', delay: 100 })
```

```zsh title=実行結果
_write()
Hi
_write()
# 1秒待つ
Thank you
_write()
# 0.1秒待つ
Bye
```

:::info オブジェクトモード/バッファモード
`objectMode`プロパティで指定する（デフォルトは`false`でバッファモード）

- オブジェクトモード | オブジェクトをデータとして扱う
- バッファモード | 文字列、`Buffer`、`Unit8Array`しか扱えない

:::

## 二重ストリーム

読み込みと書き込みの両方が可能なストリーム

- **変換ストリーム** | 読み込んだデータを変換して下流に流す（書き込む）ストリーム

```js title=読み込んだデータを暗号化して書き出す
const crypto = require('crypto')

function copyFileWithStream(src, dest, cb) {
	fs.createReadStream(src)
		.pipe(crypto.createHash('sha256'))
		.pipe(fs.createWriteStream(dest))
		.on('finish', cb)
}
```

:::note
`crypto.createHash()`メソッドが変換ストリームを生成している
:::

### 継承して使う

- 二重ストリーム | `stream.Duplex`を継承して、`_read()`と`_write()`をオーバライドする

- 変換ストリーム | `stream.Transform`を継承して、`_tranform()`と`_flush()`をオーバーライドする
  - `_transform()` | `_write()`のインターフェースで、内部的に`_read()`の処理をする
  - `_flush()` | 上流からデータを流し終わったタイミングで実行される

```js title=クラスの実装
class LineTransformStream extends stream.Transform {
	// 改行で区切った余りを保持する
	remaining = ''
	constructor(options) {
		// push()でオブジェクトを渡せるようにする
		super({ readableObjectMode: true, ...options })
	}

	_transform(chunk, encoding, callback) {
		console.log('_transform()')
		const lines = (chunk + this.remaining).split(/\n/)
		this.remaining = lines.pop() // 余りを保持
		for (const line of lines) {
			this.push({ message: line, delay: line.length * 100 })
		}
		callback()
	}

	_flush(callback) {
		console.log('_flush()')
		this.push({
			message: this.remaining,
			delay: this.remaining.length * 100,
		})
		callback()
	}
}
```

:::tip 変換ストリームにおける`push()`の戻り値
**【結論】無視していい**

`false`が返ったとしても上流のストリームにバックプレッシャを伝播する手段がない。。<br/>
そのため以下のような記述は不要となる。

```js
if(!this.push(...)) {
    console.log("読み込み中断")
    return
}
```

:::

:::info コールバックを使う

コールバックの第二引数にデータを渡して流すこともできる（第一引数はエラー）

```js
_flush(callback) {
    console.log("_flush()");
    callback(null, {
        message: this.remaining,
        delay: this.remaining.length * 100,
    });
}
```

:::

```js title=実行
const lineTransformStream = new LineTransformStream()
lineTransformStream.on('readable', () => {
	let chunk
	while ((chunk = lineTransformStream.read()) !== null) {
		console.log(chunk)
	}
})
lineTransformStream.write('foo\nbar') // _transform()が呼ばれる
lineTransformStream.write('baz')
lineTransformStream.end() // _flush()が呼ばれる
```

```zsh title=結果
_transform()
{message: 'foo', delay: 300}
_transform()
_flush()
{message: 'bazbar', delay: 600}
```

:::info ストリームの基底クラスをそのまま使う

単純なユースケースではこちらでも良い。

```js
const myWritable = new stream.Writable({
	write(chunk, encoding, callback) {
		// _writeメソッドの実装
	},
})
```

`read()`、`transform()`も同様
:::

## `pipe()`

- 読み取りストリームのメソッドで、引数に書き込みストリームを取る
  - 二重ストリームは、`pipe()`メソッドを持ち、その引数にすることもできる

### 連結する

1. `HelloReadableStream`でデータを読み込む
2. `LineTransformStream`で`{message: string, delay: number}`のデータ形式に変換する<br/>
   （`DelayLogStream`が受け取れるデータ形式のオブジェクト）
3. `DelayLogStream`で書き出す（表示する）

```js title=これまでのストリームをpipe()で連結する
new HelloReadableStream()
	.pipe(new LineTransformStream())
	.pipe(new DelayLogStream())
	.on('finish', () => console.log('finish'))
```

```zsh title=実行結果
_read()
読み込み完了
_transform()
_write()
_transform()
_transform()
_transform()
_flush()
Hello, JavaScript!
_write()
Hello, Python!
_write()
Hello, Java!
_write()
Hello, C#!
_write()

finish
```

:::info
`pipe()`で連結するだけでバックプレッシャの制御をしてくれる。<br/>
（下流が詰まれば上流を堰き止める、といった具合）
:::

### `pipe()`の戻り値

pipe()メソッドの戻り値は引数に与えられたストリーム自身になる。つまり**チェーン**できる

```js
const ltStream = new LineTransformStream()
const isEqual = ltStream === fs.createReadStream('path/to').pipe(ltStream)
console.log(isEqual)
// true
```

### ストリームの分岐

単一の読み込みストリームに対して`pipe()`を複数回実行すると、ストリームが分岐される

```js title=スクリプトをテキストと暗号化テキストに書き出す
const readableStream = fs.createReadStream('demo.py')

readableStream
	.pipe(fs.createWriteStream('dest.txt'))
	.on('finish', () => console.log('分岐1完了!!!'))

readableStream
	.pipe(crypto.createHash('sha256'))
	.pipe(fs.createWriteStream('dest.cyptro.txt'))
	.on('finish', () => console.log('分岐2完了!!!'))
```

:::info
バックプレッシャは、分岐した一番遅いストリームに合わせて制御される
:::

### エラーハンドリング

- `pipe()`はエラーを伝播しない
- 下流のストリームでエラーが発生した場合、そのストリームは<br/>
  上流のストリームから切り離される（`unpipe()`）が、上流のストリームは**破棄されない**<br/>
  （メモリリークの可能性）

```js title=errorイベントリスナをすり抜ける
fs.createReadStream('no-such-file.txt')
	.pipe(fs.createWriteStream('dest.txt'))
	.on('finish', () => console.log('finish'))
	.on('error', (err) => console.error('ERR_EVENT:', err.message))
// Error: ENOENT: no such file or directory, open 'no-such-file.txt'
```

```js title=読み込みストリームに直接errorイベントを登録する
fs.createReadStream('no-such-file.txt')
	.on('error', (err) => console.error('ERR_EVENT:', err.message))
	.pipe(fs.createWriteStream('dest.txt'))
	.on('finish', () => console.log('finish'))
// ERR_EVENT: ENOENT: no such file or directory, open 'no-such-file.txt'
```

:::caution
Promise の`catch()`のようにはいかない。。
:::

## `stream.pipeline()`

前述のエラーハンドリングに対する解決策

- 2 つ以上のストリームを引数に取り、それらをパイプで連結する
- 最後の引数に渡したコールバックが、エラーを引数に実行される
- エラーが発生しない場合、引数なしでコールバックが実行される
- いずれの場合でも、引数に渡したストリームは全て自動的に破棄される

```js
stream.pipeline(
	fs.createReadStream('no-such-file.txt'),
	fs.createWriteStream('dest.txt'),
	(err) => (err ? console.error('エラー発生', err.message) : console.log('正常終了'))
)
// エラー発生 ENOENT: no such file or directory, open 'no-such-file.txt'
```

### Promise 化する

コールバック規約に準拠しているため、`util.promisify`で Promise 化が可能

```js
;(async () => {
	try {
		await util.promisify(stream.pipeline)(
			fs.createReadStream('no-such-file.txt'),
			fs.createWriteStream('dest.txt')
		)
		console.log('正常終了')
	} catch (err) {
		console.error('エラー発生', err.message)
	}
})()
```

:::info
エラーハンドリングが必要なケースでは`stream.pipeline()`を使う
:::

## `stream.finished()`

`end`、`finish`などのイベントが発行されない場合に、ストリームの終了をハンドリングする<br/>
（HTTP リクエストを途中でやめた場合など）

```js
stream.finished(
	fs.createReadStream('demo.py').on('data', () => {}),
	(err) => (err ? console.error(err.message) : console.log('正常終了'))
)
// 正常終了
```

Promise 化もできる

```js
;(async () => {
	await util
		.promisify(stream.finished)(
			fs.createReadStream('no-such-file.txt').on('data', () => {})
		)
		.then(() => console.log('正常終了'))
		.catch((err) => console.error(err.message))
})()
// ENOENT: no such file or directory, open 'no-such-file.txt'
```

## async を使う

ズバリ読み込みストリームは async イテラブルである。<br/>
つまり、そのまま`for await...of`で反復処理できる

```js
;(async () => {
	const helloReadableStream = new HelloReadableStream().on('end', () =>
		console.log('完了')
	)
	for await (const data of helloReadableStream) {
		console.log('data', data.toString())
	}
})()
// _read()
// 読み込み完了
// 完了
// data Hello, JavaScript!
// Hello, Python!
// Hello, Java!
// Hello, C#!
```

### `stream.Readable.from()`

async イテラブルから読み込みストリームを作る

```js
async function* asyncGenerator() {
	let i = 0
	while (i <= 3) {
		await new Promise((resolve) => setTimeout(resolve, 100))
		yield `${i++}`
	}
}
const asyncIter = asyncGenerator()
const readableAsyncIter = stream.Readable.from(asyncIter)
readableAsyncIter.on('data', console.log).on('end', () => console.log('完了'))
// 0
// 1
// 2
// 3
// 完了
```

:::info

`stream.pipeline()`はイテラブルや async イテラブルをそのまま引数として渡せる

```js
util.promisify(stream.pipeline)(asyncGenerator(), fs.createWriteStream('dest.txt'))
```

0123 と書き込まれた`dest.txt`ファイルができる
:::
