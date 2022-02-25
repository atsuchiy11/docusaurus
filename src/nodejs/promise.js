/** Promise.all() */
// const allResolved = Promise.all([1, Promise.resolve('foo'), Promise.resolve(true)])
// allResolved.then(console.log)

/** Promise.race() */
// function withTimeout(promise, timeout) {
// 	return Promise.race([
// 		promise,
// 		new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout)),
// 	])
// }
// const promise = new Promise((resolve) => setTimeout(() => resolve(1), 20))
// const shouldBeResolved = withTimeout(promise, 30)
// const sholdBeRejected = withTimeout(promise, 10)

// shouldBeResolved.then(console.log)
// sholdBeRejected.then(console.log)

/** Promise.allSettled() */
// const allSettled = Promise.allSettled([
// 	1,
// 	Promise.resolve('foo'),
// 	Promise.reject(new Error('ERR::')),
// 	Promise.resolve(true),
// ])
// allSettled.then(console.log)

/** Promise.any() */
// const anyFulfilled = Promise.any([
// 	Promise.reject(new Error('ERR::')),
// 	Promise.reject(new Error('ERR::')),
// 	1,
// 	Promise.resolve(true),
// ])
// anyFulfilled.then(console.log)

/* const fs = require('fs') */
/* const util = require('util') */

/* const readdir = util.promisify(fs.readdir) */
/* readdir('./').then(console.log) */
/* fs.promises.readdir('./').then(console.log) */

/** pendingを経ず、fulfilledまたはrejectedなPromiseインスタンスを生成する */

// コンストラクタ
const resolved1 = new Promise((resolve) => resolve({ foo: 1 }))
const rejected1 = new Promise((_, reject) => reject(new Error('エラー')))
resolved1.then(console.log)
rejected1.catch(console.error)

// メソッド
const resolved2 = Promise.resolve({ foo: 1 })
const rejected2 = Promise.reject(new Error('エラー'))
resolved2.then(console.log)
rejected2.catch(console.error)
