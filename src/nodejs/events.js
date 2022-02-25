const events = require('events')

function createFizzBuzzEventEmitter(until) {
	const eventEmitter = new events.EventEmitter()
	// _emitFizzBuzz(eventEmitter, until)
	// イベントの発行を常に非同期にする
	// process.nextTick(() => _emitFizzBuzz(eventEmitter, until))
	Promise.resolve().then(() => _emitFizzBuzz(eventEmitter, until))
	return eventEmitter
}

async function _emitFizzBuzz(eventEmitter, until) {
	eventEmitter.emit('start') // 1.イベント発行
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

// createFizzBuzzEventEmitter(40)
// 	// リスナ登録より先にイベントが発行されているので実行されない
// 	.on('start', startListener) // 2.リスナ登録
// 	.on('Fizz', fizzListener)
// 	.once('Buzz', buzzListener)
// 	.on('FizzBuzz', fizzBuzzListener)
// 	.on('end', endListener)

// 登録されたリスナは常に同期的に実行される
// const fooEvenEmitter = new events.EventEmitter()
// // 登録と同時に実行
// fooEvenEmitter.on('foo', () => console.log('イベントリスナの実行'))
// console.log('fooイベントの発行', fooEvenEmitter.emit('foo'))

// リスナはガベージコレクション対象にならない
// const barEventEmitter = new events.EventEmitter()
// barEventEmitter.setMaxListeners(100)
// for (let i = 0; i < 11; i++) {
// barEventEmitter.on('bar', () => console.log('bar'))
// }

// const messageEventEmitter = new events.EventEmitter()
// const listener = () => console.log('Hello')
// messageEventEmitter.on('message', listener)

// const listeners = messageEventEmitter.listeners('message')
// console.info(listeners)

// try {
// 	new events.EventEmitter()
// 		.on('error', (err) => console.log('errorイベント'))
// 		.emit('error', () => new Error('エラー'))
// } catch (err) {
// 	console.log('catch')
// }

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

// new FizzBuzzEventEmitter()
// 	.on('start', startListener)
// 	.on('Fizz', fizzListener)
// 	.once('Buzz', buzzListener)
// 	.on('FizzBuzz', fizzBuzzListener)
// 	.on('end', endListener)
// 	.start(20)

// ;(async () => {
// 	const eventAEmitter = new events.EventEmitter()
// 	const eventAIterable = events.on(eventAEmitter, 'eventA')
// 	console.log(eventAEmitter.listeners('eventA'))

// 	eventAEmitter.emit('eventA', 'hello')
// 	eventAEmitter.emit('eventA', 'hello', 'world')
// 	eventAEmitter.emit('eventA', 'end')

// 	for await (const a of eventAIterable) {
// 		if (a[0] === 'end') {
// 			break
// 		}
// 		console.log('eventA', a)
// 	}
// 	// eventAEmitter.emit('error', () => new Error('ERR::'))
// 	console.log(eventAEmitter.listeners('eventA'))
// })()

const eventBEmitter = new events.EventEmitter()
const eventBPromise = events.once(eventBEmitter, 'eventB')
eventBPromise.then((arg) => console.log('eventB発生', arg))
eventBEmitter.emit('eventB', 'hello', 'world')
