function* generatorFunc() {
	yield 1
	yield 2
	yield 3
	return 'ジェネレータ終わり'
}
// const generator = generatorFunc()
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())

// while (true) {
// 	const v = generator.next()
// 	console.log(v)
// 	if (v.done) break
// }

// for (const value of generator) {
// 	console.log(value)
// }

function* resetableGenerator() {
	let count = 0
	while (true) {
		if (yield count++) {
			count = 0
		}
	}
}
// const gen = resetableGenerator()
// console.log(gen.next())
// console.log(gen.next())
// console.log(gen.next())
// console.log(gen.next())
// console.log(gen.next(true))

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
// const gen = tryCatchGenerator()
// console.log(gen.next())
// console.log(gen.next())
// console.log(gen.next())
// console.log(gen.next())
// gen.throw(new Error('エラーを渡す'))

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
// const toBeFullfilled = parseJSONAsync('{"foo":1}')
// toBeFullfilled.then(console.log)

function* parseJSONAsyncGenerator(json) {
	try {
		const result = yield parseJSONAsync(json)
		console.log('Result:', result)
	} catch (err) {
		console.error('ERR::', err)
	}
}
/** 正常系 */
// // ジェネレータを生成
// const genOK = parseJSONAsyncGenerator('{"foo":1}')
// // ジェネレータからPromiseインスタンスを取得する
// const promiseOK = genOK.next().value
// // Promiseインスタンスが解決された結果をnext()でジェネレータに渡す
// promiseOK.then((result) => genOK.next(result))

/** 異常系 */
// const genNG = parseJSONAsyncGenerator('不正なJSON')
// const promiseNG = genNG.next().value
// promiseNG.catch((err) => genNG.throw(err))

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
// handleAsyncWithGenerator(parseJSONAsyncGenerator('{"foo":1}'))
// handleAsyncWithGenerator(parseJSONAsyncGenerator('不正なJSON'))

async function asyncFunc(json) {
	try {
		const result = await parseJSONAsync(json)
		console.log('Result:', result)
	} catch (err) {
		console.log('ERR::', err)
	}
}
// asyncFunc('{"foo":1}')
// asyncFunc('不正なJSON')

async function asyncReturnFoo() {
	return 'foo'
}
// asyncReturnFoo().then(console.log)

async function asyncThrowError() {
	throw new Error('エラー')
}
// asyncThrowError().catch(console.error)

async function pauseAndResume(pausePeriod) {
	console.log('start')
	await new Promise((resolve) => setTimeout(resolve, pausePeriod))
	console.log('restart')
}
// pauseAndResume(1000)
// console.log('この処理は待たない')

async function* asyncGenerator() {
	let i = 0
	while (i <= 3) {
		await new Promise((resolve) => setTimeout(resolve, 100))
		yield i++
	}
}
;(async (gen) => {
	for await (const element of gen()) {
		console.log(element)
	}
})(asyncGenerator)
