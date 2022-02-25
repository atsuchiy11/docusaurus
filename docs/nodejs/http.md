---
sidebar_position: 5
---

# HTTP サーバ/クライアント

## `http`モジュール

`http.createServer(callback)`

- `callback`に渡されるリクエスト、レスポンスオブジェクトはそれぞれ読み込み、書き込みストリーム

```js title=server.js
const http = require('http')
const todos = [
	{ id: 1, title: 'ネーム', completed: false },
	{ id: 2, title: '下書き', completed: true },
]

const server = http
	.createServer((req, res) => {
		if (req.url === '/api/todos') {
			if (req.method === 'GET') {
				res.setHeader('Content-Type', 'application/json')
				return res.end(JSON.stringify(todos))
			}
			// 405(Method Not Allowed)
			res.statusCode = 405
		} else {
			// 404(Not Found)
			res.statusCode = 404
		}
		res.end()
	})
	.listen(8080)
```

`http.request(url, options, callback): WriteStream`

- `callback`に渡されるレスポンスオブジェクトは読み込みストリーム
- `request()`は書き込みストリームを返し、`end()`を実行したタイミングで送信される

```js title=client.js
const http = require("http");

http
  .request("http://localhost:8080/api/todos", { method: "POST" }, (res) => {
    let responseData = "";
    console.log("statusCode", res.statusCode);
    res.on("data", (chunk) => (responseData += chunk));
    res.on("end", () => console.log("responseData", JSON.parse(responseData)));
  })
  .end();
});
```

:::note
`http`モジュールは低レベル API なので概念だけで OK
:::

## Express
