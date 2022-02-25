const fs = require('fs')
const cache = {}

function parseJSONAsync(json, callback) {
	setTimeout(() => {
		try {
			callback(null, JSON.parse(json))
		} catch (err) {
			callback(err)
		}
	}, 1000)
}

parseJSONAsync('{"foo": "bar"}', (err, result) => {
	console.log('Result:', err, result)
})
parseJSONAsync('不正なJSON', (err, result) => {
	console.log('Result:', err, result)
})
console.log('fin')

function parseJSONAsyncWithCache(json, callback) {
	const cached = cache[json]
	if (cached) {
		// setTimeoutはイベントループの次のフェーズが回ってこないと実行されない
		// setTimeout(() => callback(cached.err, cached.result), 0)
		// [Node.js環境]nextTickは特定のフェーズを持たない
		// process.nextTick(() => callback(cached.err, cached.result))
		// ブラウザでも動かす場合
		// queueMicrotask(() => callback(cached.err, cached.result))
		// Promiseを使う
		Promise.resolve().then(() => callback(cached.err, cached.result))
		return
	}
	parseJSONAsync(json, (err, result) => {
		cache[json] = { err, result }
		callback(err, result)
	})
}

// parseJSONAsyncWithCache('{"message":"hello"}', (err, result) => {
// 	console.log('1st result:', err, result)
// 	parseJSONAsyncWithCache('{"message":"hello"}', (err, result) => {
// 		console.log('2nd result:', err, result)
// 	})
// 	console.info('2nd finished')
// })
// console.info('1st finished')
