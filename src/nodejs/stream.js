const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const stream = require('stream')

const inputPath = path.join(__dirname, 'memo.md')
const outputPath = path.join(__dirname, 'memo.bk.md')

function copyFile(src, dest, cb) {
	fs.readFile(src, (err, data) => {
		if (err) return cb(err)
		fs.writeFile(dest, data, cb)
	})
}
// copyFile(inputPath, outputPath, (res) => console.log(res))

function copyFileWithStream(src, dest, cb) {
	fs.createReadStream(src)
		.pipe(crypto.createHash('sha256'))
		.pipe(fs.createWriteStream(dest))
		.on('finish', cb)
}
// copyFileWithStream(inputPath, outputPath, (res) => console.log(res))

class HelloReadableStream extends stream.Readable {
	constructor(options) {
		super(options)
		this.languages = ['JavaScript', 'Python', 'Java', 'C#']
	}
	_read(size) {
		console.log('_read()')
		let language
		while ((language = this.languages.shift())) {
			if (!this.push(`Hello, ${language}!\n`)) {
				console.log('読み込み中断')
				return
			}
		}
		console.log('読み込み完了')
		this.push(null)
	}
}
// const helloReadableStream = new HelloReadableStream()
// helloReadableStream
// 	.on('readable', () => {
// 		console.log('readable')
// 		let chunk
// 		while ((chunk = helloReadableStream.read()) !== null) {
// 			console.log(`chunk: ${chunk.toString()}`)
// 		}
// 	})
// 	.on('end', () => console.log('end'))
