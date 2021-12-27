---
sidebar_position: 3
---

# 補足編

本編を補足する項目を列挙しています。文脈は特にありません。

## `new`演算子

コンストラクタ関数を持つオブジェクトのインスタンスを作成します。

- インスタンス
  - 元のオブジェクトは参照の異なるコピーを作る、程度の理解で*OK*です。
- コンストラクタ
  - インスタンスを生成する際に初期化する関数です。
  - つまりこれがないオブジェクトには`new`演算子が使えません。

```tsx
// リテラルで表記できるものは警告が出ます（エディタの設定次第）
const obj = new Object();
const arr = new Array();
const fn = new Function("console.log('Hello, world')");

// 新しいインスタンスを生成する
const date = new Date();
const promise = new Promise((resolve, reject) => {});
```

:::info
詳細は、_class_（クラス）の説明が必要なので割愛します。  
イメージだけやんわりお伝えします。。

```tsx title="もしインスタンスという概念がなかったらきっとこうなります"
/** 説明用です。こんなコードは存在しません*/
const a = Date();
a.yyyymmdd = "20211001";

const b = Date();
b.yyyymmdd = "20211015";

/** 同じオブジェクトを参照しているので上書きされる */
console.log(a.yyyymmdd); //20211015
```

そこで、

```tsx title="インスタンスという名のコピーを作成する"
const a = new Date(); //元のDateオブジェクトとは別物
a.yyyymmdd = "20211001";

const b = new Date(); //元のDateオブジェクトともaとも別物
b.yyyymmdd = "20211015";

console.log(a.yyyymmdd); //20211001
```

:::

## 日付

## 例外処理

例外（_Exception_）つまりエラーが発生した時の処理を記述するための構文です。

- `try...catch`構文
  - 構文なので丸暗記です。
- `throw`文
  - 意図的に例外を投げることができます。
- `Error`オブジェクト
  - 引数に渡した文字列を`Error.message`プロパティで参照できます。

```tsx
try {
  // ここにエラーが起きるかもしれない処理を書く
  throw new Error("意図的に起こしたエラー");
} catch (err) {
  console.error(err.message); //意図的に起こしたエラー
} finally {
  console.log("エラーが起きても起きなくても実行される");
}
```

:::info
「エラーが起きるかもしれない処理？？全部じゃん！」と思った方へ  
例外処理は、基本的に外部依存するもの（サーバとか API とかネットワークとか）に対して記述します。  
スタンドアロンで起こるエラーはエラーではなく、あなたの書き方が**ヘタクソ**なだけです。
:::

## メソッドチェーン

メソッドを呼び出した戻り値に対して別のメソッドを呼び出すことができます。

```tsx
// 文字列
const str = "123456789";
const convStr = str.replace("123", "abc").toUpperCase();
console.log(convStr); //ABC456789

// 配列
const arr = [1, 2, 3, 4, 5];
const convArr = arr.map((n) => n * n).filter((n) => n % 2 === 0);
console.log(convArr); //[4, 16]
```

:::tip
直感的に分かると思いますが、直前のメソッドの戻り値が次のメソッドを呼び出せる必要があります。
:::

:::info
クラス構文を使うと、割と簡単に自作のメソッドチェーンを作ることができます。
:::

### Promise チェーン

同じ理屈です。`then()`は`Promise`インスタンスに対するメソッドなので、  
`then()`メソッド内のコールバック関数が`Promise`オブジェクトを返す限りチェーンできます。

```tsx
// asyncFunc*がPromiseを返すのであれば、、
asyncFunc1()
  .then(asyncFunc2)
  .then(atyncFunc3)
  .then(asyncFunc3)
  .then(asyncFunc4)
  //...
  .catch((err) => console.error(err));
```

## 即時関数

関数の宣言と実行を同時に行います。主にスコープを作るために使います。

```tsx
(() => {
  const foo = "foo";
  console.log(foo);
})(); //引数も渡せる
console.log(foo); //これはエラー
```

:::tip
[kintone](https://kintone.cybozu.co.jp/)は基本的に即時関数を使います。スコープを切りたいんでしょうね。  
詳細は[公式](https://developer.cybozu.io/hc/ja/articles/201793484)をご確認ください。
:::

## JSON

_**JSON**_（_JavaScript Object Notation_）の略で、*JavaScript*オブジェクトのデータ構造（のような）**文字列**です。  
*JavaScript*オブジェクトと*JSON*は**相互変換**が可能であり、近年データのやり取りによく使われています。

```tsx title="JavaScriptオブジェクト"
const obj = {
  name: "John Doe",
  age: 24,
  sex: "male",
};
```

```bash title="JSON"
{"name":"John Doe","age":24,"sex":"male"}
```

変換方法さえ知っていれば大丈夫です。

```tsx title="オブジェクト→JSON"
JSON.stringify(obj);
```

```tsx title="JSON→オブジェクト"
JSON.parse(json);
```

## *ES*モジュール

今まで単一の JS ファイルで全てのコードを記述してきましたが、いくつか気になることがあります。

- 可読性
  - 1 つのファイルに何百行も書いてたら読むのが大変です。
  - [MVC](https://e-words.jp/w/MVC.html#:~:text=MVC%E3%81%A8%E3%81%AF%E3%80%81%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E3%81%AE,%E3%81%A6%E5%87%A6%E7%90%86%E3%82%92%E9%80%B2%E3%82%81%E3%82%8B%E6%96%B9%E5%BC%8F%E3%80%82)的にどうなの。。
- グローバル汚染
  - 常に変数名が重複していないか気にしないといけない。
  - 名前空間という名のオブジェクト、即時関数など回避策はあるけれど。。
  - 外部ライブラリとか使い出したらカオスなことになりそう。
- 再利用性
  - ある関数を他でも使いたくなったらどうします？都度コピペですか？

というように、1 つのファイルに全てを収めようなんて無理な話なのです。。  
どうすればいいか、、、答えは簡単です。ファイルを分割すればいいのです。  
そして、それを実現しているのが**_ES モジュール_**という概念です。

### 名前付きエクスポート／インポート

- `export {}`でエクスポートします。**何個でも**OK です。
- `import {}`でインポートします。

```tsx title="./src/module.js"
const foo = "foo";
const bar = "bar";
export { foo, bar };
```

```tsx title="./src/index.js"
import { foo, bar } from "./module.js";
console.log(foo); //foo
console.log(bar); //bar
```

### エイリアス

インポートするときに別名をつけます。別々のファイルからインポートして名前が重複した時などに使います。

```tsx title="./src/index.js"
import { foo as bar } from "./module";
console.log(bar); //foo
```

### デフォルトエクスポート／インポート

- `export default`でエクスポートします。**1 つ／１ファイル**です。
- `import`の後に**任意の名前**をつけてインポートできます。

```tsx title="./src/module.js"
const bar = "bar";
export default bar;
```

```tsx title="./src/index.js"
import bar from "./module.js";
console.log(bar); //bar
```

無名関数をエクスポートした場合（だから任意なんですね）

```tsx title="./src/module.js"
export default function () {
  console.log("Hello, world");
}
// 余談ですがこれはできません。
// export default const = () => {}
```

```tsx title="./src/index.js"
import sayHello from "./module";
sayHello(); //Hello, world
```

関数等の機能単位でエクスポート／インポートするのが主流です。

```tsx title="./src/module.js"
const calc = {
  add: (m, n) => m + n,
  sub: (m, n) => m - n,
  multiply: (m, n) => m * n,
  square: (n) => n ** 2,
};
export default calc;
```

```tsx title="./src/index.js"
import calc from "./module";

console.log(calc.add(1, 2)); //3
console.log(calc.sub(5, 3)); //2
console.log(calc.multiply(2, 3)); //6
console.log(calc.square(3)); //9
```

:::tip
*Node.js*の頁で*CommonJS*という似たようなモジュールシステムが出てきます。  
現在では*Node.js*でも*ES モジュール*が利用出来るので、極力*ES モジュール*で記述します。
:::

## *Strict*モード

構文上エラーではないが、よろしくない記述を検知してくれます。

- 代入だけでグローバル変数を作成できない
- 予約されたキーワードを変数名として使用できない
- *with*文は文法エラー

など

:::tip
[_kintone_](https://developer.cybozu.io/hc/ja/articles/201919400)も推奨しています。とりあえず書いておきましょう。  
詳細が知りたい方は[公式](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Strict_mode)をご覧ください。
:::

## `this`

状況によってころころ姿を変えるカメレオンみたいな奴です。

- `this`は関数を呼び出したときの`.`(ドット)の前についているオブジェクトになる。
- `.`が省略された場合はグローバルオブジェクトになる（*Strict*モードでは`undefined`）。

```tsx
"use strict";

function WhatIsThis() {
  console.log(this);
}

/** ドットはないのでthisはグローバルオブジェクト */
WhatIsThis(); //undefined

/** オブジェクトに入れると、thisはそのオブジェクトになる */
const name = "John Doe";
const obj = { name, WhatIsThis };
obj.WhatIsThis(); //{ name:"John Doe", WhatIsThis:f }
```

もうこの時点でイラッとしますよね。。  
次に`function`文をアロー関数にしてみます。

```tsx
"use strict";

const WhatIsThis = () => console.log(this);

WhatIsThis(); //undefined

const name = "John Doe";
const obj = { name, WhatIsThis };
obj.WhatIsThis(); //undefined ←？？？
```

これはアロー関数が、宣言時の`this`で固定されるからです（つまりグローバル）。  
（アロー関数は`this`について独自のスコープを持たない、と言い換えることも出来ます）

:::info
この話を掘り下げるとディープなので、この辺で割愛します。  
ちなみに`this`を束縛する`bind()`と言う関数がありますが、アロー関数には使えません。

```tsx
const WhatIsThis = () => console.log(this);

const obj = {};
const thisBind = WhatIsThis.bind(obj);
thisBind(); //undefined（つまりbindは無視される）
```

:::

:::tip
とにかくアロー関数に`this`と言う概念は存在しないということ。  
:::

:::caution
`this`は後述するクラス以外での使用を禁止しているチーム、組織が多いです（個人的にも非推奨）。  
（*ESLint*には`no-invalid-this`というルールがあり、多分デフォルトで有効です。）
:::

## クラス: `class`

:::note
*kintone*でそこまで複雑な構造体が必要だとは思えないので、ざっくり解説です。  
（筆者がそこまで極めていないというものありますが）  
必要になったらそのときに考えましょう。。
:::

- クラスとは、**動作**や**状態**を定義した**構造**です。
- クラスは`new`演算子で、**インスタンス**と呼ばれるオブジェクトを作成できます。
- インスタンスは、クラスで定義した動作を継承し、状態は動作によって変化します。
- クラスは必ず**コンストラクタ**を持ちます。
- コンストラクタは、クラスをインスタンス化したときに自動的に呼び出されます。

まぁ書いてみましょう。`class {}`構文を使います。

```tsx
// クラス名は大文字で始める
class Calc {
  // コンストラクタ（インスタンス作成時に呼ばれる）
  constructor(num) {
    this.num = num;
  }
  // クラスメソッド
  add(n) {
    this.num += n;
    return this;
  }
  sub(n) {
    this.num -= n;
    return this;
  }
  multiply(n) {
    this.num *= n;
    return this;
  }
  square() {
    this.num **= 2;
    return this;
  }
  // 静的メソッド（インスタンス化しなくても使える）
  static sayHello() {
    console.log("hello, JavaScript");
  }
  // promiseもasync/awaitも使えます
  getUser(user) {
    return new Promise((resolve, reject) => {
      const url = `https://api.github.com/users/${user}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}

Calc.sayHello(); //hello, JavaScript

// new演算子でインスタンスを作成する
const calc = new Calc(4);

// 非同期処理も普通に書けます
calc
  .getUser("a2-tsuchiya")
  .then(console.log)
  .catch((err) => console.error(err.message));
```

個人的に思う*class*の用途の一つです。ずばり「**メソッドチェーンを作る**」です。

```tsx
const calc = new Calc(4);
calc.add(2).sub(3).multiply(4).square();
console.log(calc.num); //144 = ((4 + 2 - 3) * 4)^2
```

最もメソッドが非同期処理だったりすると上手く行かなかったりするので、用途は限られます。  
上手い書き方知っていたら教えてください w  
（あ、プロミスチェーン作れば出来るかも。。）

<br />

### 【おまけ】

:::note
なんかできないと癪なので考えてみただけです（実用性は保証しません）。
:::

どうしても非同期メソッドをチェーンしたい方へ。。（暫定版です。ノークレームノーリターン）

- メソッドが*Promise*を返すとチェーンできない（`then()`じゃないと受け取れない）
- コンストラクタで*Promise*チェーンの起点を定義する（\_は内部変数という意味）
- 非同期メソッドは即実行するのではなくキューに積んでいく（*Promise*で繋いでいく）
- コールバック関数を登録するメソッドを作る（これは任意）
- 実行用のメソッドにだけ async/await を使い、キューのタスクを順番に実行していく

```tsx
class AsyncChain {
  constructor() {
    this.message = "";
    this._promise = Promise.resolve();
  }
  asyncTask(msg) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          this.message += msg;
          resolve();
        } catch (err) {
          reject(err);
        }
      }, 1000);
    });
  }
  taskA() {
    this._promise = this._promise.then(() => this.asyncTask("taskA"));
    return this;
  }
  taskB() {
    this._promise = this._promise.then(() => this.asyncTask("taskB"));
    return this;
  }
  callback(fn) {
    this._promise = this._promise.then(fn);
    return this;
  }
  async run() {
    return new Promise((resolve, reject) => {
      this._promise
        .then(() => resolve())
        .catch((err) => console.error(err.message));
    });
  }
}

(async () => {
  const chain = new AsyncChain();
  await chain
    .taskA()
    .taskB()
    .callback(() => console.log("tasks finished"))
    .run();
  console.log(chain.message); //taskAtaskB
})();
```
