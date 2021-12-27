---
sidebar_position: 2
---

# 中級編

<span class="theme-doc-version-badge badge badge--secondary">座学:60min／実技:60min</span>

ここでは少し進んだ*JavaScript*の書き方を解説していきます。  
別にこれまでの文法でも大抵のプログラムは書けます。ですが実務においては、、

「**自力で書くより、誰かのコードを参考にして書くことの方が多い**」  
つまり「**他人の書いたコードを読み解く必要がある**」  
そして「**これから解説する書き方をしている人の方が圧倒的に多い**」

という現実があります。。  
全部を覚える必要はありません。広く浅く頭の片隅に置いておけばいいんです。  
それらを必要なときに取り出せて、気に入ったものがあったらそのときに深く掘り下げればいいんです。

また*JavaScript*には、**_ES6（ECMA2015）_**という大幅なアップデートがありました。  
これまでの書き方を代替するものも多数出てきますので、都度ご紹介していきます。  
（ご参考程度に<span class="theme-doc-version-badge badge badge--primary">ES6</span>というマークを付けています。）

色々言いましたが、つまるところ**簡潔に記述する**ことが最大のテーマです。  
(*JavaScript*は上手く記述しないと、読みづらく、コード量も多くなりやすい言語です。)

## 覚書

- 配列・オブジェクト操作（map, filter, reduce, ...）
- JSON の扱い
- 例外処理
- 日付の扱い（ライブラリ固定の方が早いかも）
- 破壊的／非破壊的メソッド
- ECMA モジュール（import/export）

## 省略記法いろいろ

### `if`文

`{}`書くの面倒ですよね。。

```tsx
// 単一式であれば{}はいらない
if (true) console.log("true");

// 分岐しても同様
if (true) console.log("true");
else console.log("false");
```

きっと無意識に使っていましたが真偽値も省略できます。

```tsx
let a;
if (a === true) console.log("true");

if (a) console.log("true");
if (!a) console.log("false");
```

### 三項演算子

`if`の代替として便利です。これからちょくちょく登場します。

```tsx
条件式 ? trueのとき処理する式 : falseのとき処理する式;
```

```tsx
const x = 5;
const answer = x > 5 ? "xは5より大きい" : "xは5以下";
console.log(answer); //xは5以下
```

## アロー関数

<span class="theme-doc-version-badge badge badge--primary">ES6</span>

関数を、`function`キーワードや`return`文なしで記述できます。

```tsx
/** 関数宣言 */
function add1(a, b) {
  return a + b;
}

/** アロー関数 */
const add2 = (a, b) => {
  return a + b;
};

/** アロー関数（省略形） */
const add3 = (a, b) => a + b;
```

何でもかんでも省略できるわけではありません。

- 戻り値が単一の式であれば、`return {}`を省略できる
- 引数が一つであれば、引数の`()`を省略できる
  - エディタの設定次第では不可。個人的にも非推奨
- 戻り値がオブジェクトの時は、そのオブジェクトを`()`で囲む。

```js
/** オブジェクトを返すときは()で囲む */
const person = (firstName, lastName) => ({
  first: firstName,
  last: lastName,
});
```

理由は簡単ですよね。。  
`{}`が関数ブロックなのかオブジェクトのブロックなのか判断できないからですね。

:::tip
コード量がかなり減るので積極的に使っていきましょう。  
以降の解説は基本的にアロー関数で記述します（あー面倒くさかった）。
:::

## デフォルト引数

<span class="theme-doc-version-badge badge badge--primary">ES6</span>

関数の引数に初期値を設定できます。しれっと使っていたかも知れません。。

```tsx
const multiply = (a = 5) => a * a;
console.log(multiply()); //25
```

:::info
*C++*や*Python*には最初からあったのに。。
:::

## テンプレート文字列

<span class="theme-doc-version-badge badge badge--primary">ES6</span>

\`\`(バッククォート)で囲むと`${}`で変数を展開することができます。

```tsx
const person = {
  firstName: "John",
  lastName: "Doe",
};
// 文字列連結
console.log("Hello, " + person.firstName + " " + person.lastName);
// テンプレート文字列
console.log(`Hello, ${person.firstName} ${person.lastName}`);
```

改行も反映されます。

```tsx
document.body.innerHTML = `
<section>
  <header>
    <h1>Hello, JavaScript</h1>
  </header>
  <article></article>
  <footer></footer>
</section>
`;
```

## 分割代入

<span class="theme-doc-version-badge badge badge--primary">ES6</span>

配列やオブジェクトを個別の変数に代入できます。

```tsx
const arr = ["one", "two", "three", "four"];
const [first] = arr;
const [, , third] = arr;

console.log(first); //one
console.log(third); //three
```

個人的にはオブジェクトの方が使い勝手がいいです。

```tsx
const person = {
  firstName: "John",
  lastName: "Doe",
};

const { firstName, lastName } = person;
console.log(firstName, lastName); //John Doe

/** 関数の引数にも使えます */
const helloPerson = ({ firstName, lastName }) => {
  console.log(`Hello, ${firstName} ${lastName}`); //Hello, John Doe
};
helloPerson(person);
```

## スプレッド構文

<span class="theme-doc-version-badge badge badge--primary">ES6</span>

`...`で記述します。いくつか用途があり、前述の分割代入と併用することが多いです。

### 配列の展開

```tsx
const arr = ["one", "two", "three", "four"];

// 展開する
console.log(...arr); //one two three four

// 「残り全部」にする
const [first, ...others] = arr;
console.log(first); //one
console.log(others); //["two", "three", "four"]
```

### 配列の結合

```tsx
// 配列を結合する
const arr1 = ["one", "two"];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2];
console.log(combined); //["one", "two", 3, 4]

// (参考)旧来の書き方
console.log(arr1.concat(arr2));
```

### 残余引数（レストパラメータ）

関数の引数にスプレッド構文を使えます。  
これを*可変長引数*と解説するところもありますが、原文は「_Rest parameters_」なのでこの呼称にしてます。

```tsx
const favoriteFruits = (name, ...fruits) => {
  console.log(`${name}が好きな果物は、${fruits.join(",")}です。`);
};
favoriteFruits("John Doe", "Apple", "Lemon", "Orange");

// John Doeが好きな果物は、Apple,Lemon,Orangeです。
```

## オブジェクトリテラルの改善

<span class="theme-doc-version-badge badge badge--primary">ES6</span>

ちょっと（いやかなり）マニアックな内容です。読み飛ばしても構いません。。

### プロパティ名の省略

変数をオブジェクトのプロパティ値として記述する場合、プロパティ名を省略できます。

```tsx
const firstName = "John";
const lastName = "Doe";

// プロパティ名を省略できる
const person = { firstName, lastName };
console.log(person); //{firstName: "John", lastName: "Doe"}

// 旧来の書き方
const _person = {
  firstName: firstName,
  lastName: lastName,
};
console.log(_person);

// 関数もOK
const print = function () {
  console.log(`${this.firstName} ${this.lastName}`);
};
const newPerson = { ...person, print };
newPerson.print(); //John Doe
```

:::note
最後の例はサラッと書いていますが、色んなコトが盛り込まれています。  
（あまりに素晴らしい例だったので書いてしまいました w）  
ポイントは、、

- `this`の参照
- なぜアロー関数を使わなかったのか？
- `newPerson`オブジェクトの生成

です。時間があったら掘り下げてみたください（中級者以上かな）。
:::

## 配列の反復処理

### `Array.forEach`

知らなくていいです。

```tsx

```

:::info
知らなくてもなんとかなります。他で代替できます。
:::

<br />

===  
ここから**超重要**です。ここを扱えるか否かが初心者と中級者の境目といっても過言ではありません。  
逆に覚えてしまうと**超便利**です。`for`文とか書く気がなくなると思います。。

### 共通すること

- 配列を受け取り、新しい配列（もしくは値）を返す関数です。
- 引数に**コールバック関数**を取ります。

、、、とりあえず見てみましょうか。

### `Array.map`

配列全体を加工して、新しい配列を作成します。  
コールバック関数は、配列の各要素が引数として渡され、戻り値が新しい配列に追加されます。  
結果として、**元の配列と同じサイズの配列**が作成されます。

```tsx
const numbers = [1, 2, 3, 4, 5];

const squareNumbers = numbers.map((n) => n * n);
console.log(squareNumbers); //[1, 4, 9, 16, 25]

// 省略しないver（まずこんな書き方はしませんが）
const _squareNumbers = numbers.map(function (n) {
  return n * n;
});

// for文とかカオス
let result = [];
for (let i = 0; i < numbers.length; i++) {
  result.push(numbers[i] * numbers[i]);
}
```

### `Array.filter`

配列から特定の要素だけを取り出し、新しい配列を作成します。  
引数となるコールバック関数は、配列の要素を引数に取り、真偽値を返す関数になります。  
（特に*predicate*と言ったりします）

配列の各要素ごとにコールバック関数が呼ばれ、戻り値が`true`であれば新しい配列に追加されます。

```tsx
const numbers = [1, 2, 3, 4, 5];

const evenNumbers = numbers.filter((n) => n % 2 === 0);
console.log(evenNumbers); //[2, 4]

// 省略しないver
const _evenNumbers = numbers.filter(function (n) {
  if (n % 2 === 0) {
    return true;
  } else {
    return false;
  }
});
```

### `Array.reduce`

配列から単一の値を取得します。  
コールバック関数の引数が二つになり、それぞれ**累積値**と**要素**になります。  
それとは別に**初期値**を引数として取ります。

構文的にはこんな感じです。。

```tsx
Array.reduce(callback(accumulator, value), initialValue);
```

やってみた方が早いです。

```tsx
const numbers = [1, 2, 3, 4, 5];

const maxNumber = numbers.reduce((max, n) => (n > max ? n : max), 0);
console.log(maxNumber); //5

// 省略しないver
const _maxNumbers = numbers.reduce(function (max, n) {
  if (n > max) {
    return n;
  } else {
    return max;
  }
}, 0);
console.log(_maxNumbers);

// [余談]この程度ならMathオブジェクトを使った方が楽
const maximum = Math.max(...numbers); //そう、スプレッド構文です
console.log(maximum); //5
```

:::tip
単一の値とは、数値や文字列の他に、オブジェクト、関数などの参照値も含みます。
:::

### その他

他にも[色々](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array)ありますが全て上記パターンのどれかです。
需要がありそうなのは以下です。

| Method              | Description                                                   |
| ------------------- | ------------------------------------------------------------- |
| `Array.find()`      | 条件を満たす**最初の要素**の**値**を返す                      |
| `Array.findIndex()` | 条件を満たす**最初の要素**の**インデックス**を返す            |
| `Array.some()`      | 条件を満たす要素があれば`true`なければ`false`を返す           |
| `Array.every()`     | 全ての要素が条件を満たせば`true`ひとつでも違えば`false`を返す |
| `Array.sort()`      | 要素を条件で並び替える（初期値は*UTF-16*昇順）                |

:::tip
`Array.sort()`は知っていた方がいいかも..
:::
