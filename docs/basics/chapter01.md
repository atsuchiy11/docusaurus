---
sidebar_position: 1
---

# 基礎編

<span class="theme-doc-version-badge badge badge--secondary">座学:50min／実技:40min</span>

こればっかりは覚えてもらうしかないです。。頑張りましょう。

## 変数: `let`／定数: `const`

`const`または`let`を使います。前者は再代入が不可、後者は可です。

```jsx
const user = "John Doe";
let num = 1;

user = "Tom Brown"; // TypeError: "user" is read-only
num = 5; // OK
```

:::caution
`var`は使ってはいけません（動きますが）  
:::

:::tip
とりあえず`const`で書く、再代入が必要なら`let`に書き換える、という風に考えましょう。  
変わらないということは、それだけで安定を生みます。
:::

## コメント

ソースコードとは関係ない注釈などに使います。

```jsx
// これは１行コメントです

/**
 * これは
 * 複数行コメントです
 */
```

<details>
  <summary>【小ネタ】複数行コメントの書き方</summary>
  <div>
    <code>/* comments... */</code>
    <p>実は複数行コメントはこのようにも書けます。</p>
    <p>
      ですが、<i>Google</i>
      が提唱するスタイルガイドラインというものがあり、今回はそちらに倣っています。
    </p>
    <p>一通り覚えたら目を通してみると良いと思います。。</p>
    <p>
      <a href="https://cou929.nu/data/google_javascript_style_guide/#id63">
        <i>Google JavaScript Style Guide</i>
      </a>
    </p>
  </div>
</details>

## 関数: `Function`

算数に出てくる関数と同じ意味合いです。

`y = f(x)`

**引数(x)**を受け取って**戻り値(y)**を返すものを**関数(f)**と言います。  
関数を定義する方法はいくつかあります。

```jsx
// 関数宣言
function add1(a, b) {
  return a + b;
}

// 関数式
const add2 = function (a, b) {
  return a + b;
};

// 名前付き関数式
const add3 = function addFn(a, b) {
  return a + b;
};

// アロー関数（後述します）
const add4 = (a, b) => a + b;
```

:::tip
関数宣言とアロー関数（後述）を使用するケースが圧倒的に多いです
:::

<details>
  <summary>【小ネタ】なにが違うの？</summary>
  <div>
    <p>
      関数宣言は、宣言の前に参照できます。これを関数の
      <strong>巻き上げ（hoisting）</strong>と言います。
    </p>
    <p>これは試した方が早いです。。</p>
  </div>
</details>

## 変数の命名

今出てきた`addFn`のような名前の付け方です。  
組織やプロジェクトによって様々なので、代表的なものを挙げます。

- キャメルケース: `camelCase`
  - **単語の先頭を大文字**にしてつなぐ命名規則
  - *JavaScript*はまずこれだと思っていいです
- スネークケース: `snake_case`
  - **単語の間をアンダーバー**でつなぐ命名規則
  - *Python*やデータベースはだいたいコレです
- ケバブケース: `kebab-case`
  - **単語の間をハイフン**でつなぐ命名規則
  - *HTML/CSS*はこれが多いです

:::info
キャメルケースは先頭の単語だけは小文字にしますが、  
全ての単語の先頭を大文字にするものを、特に**パスカルケース**と呼ぶことがあります。
:::

## オブジェクト: `Object`

複数の値を持つ変数？みたいなイメージです。  
`key`と`value`の組み合わせを複数持つことができます。`key`のことを**プロパティ**とも呼びます。

```jsx
const obj = {
  name: "John Doe",
  age: 24,
  sex: "male",
};
```

### オブジェクトの参照

`key`を指定することで、`value`を参照することができます。

```jsx
// ドット記法
console.log(obj.name); // John Doe

// ブラケット記法
console.log(obj["age"]); // 24

// オブジェクトごと参照することもできます
console.log(obj); // {name: "John Doe", age: 24, sex: "male"}
```

### プロパティの追加、変更、削除

```jsx
// 新しいプロパティを追加
obj.job = "enginner";
console.log(obj.job); // enginner

// 関数もプロパティとして追加できます。
const add = function (a, b) {
  return a + b;
};
obj.fn = add;
console.log(obj); // 実際にやってみてください

// プロパティの値を変更
obj.age = 30;
console.log(obj.age); // 30

// プロパティを削除（滅多に使いません、というか極力使わないようにしましょう）
delete obj.sex;
console.log(obj); // {name: "John Doe", age: 24}

// スプレッド構文でプロパティを追加（後述します）
const newObj = { ...obj, job: "enginner" };
console.log(newObj);
```

:::info
実は関数もオブジェクトです。というか*JavaScript*にあるものは大体オブジェクトです。
:::

## 配列: `Array`

複数の値を 1 つの変数にまとめるためのものです。中身一つ一つを**要素**と言います。

```jsx
// 数値の配列
const nums = [1, 2, 3];

// 数値と文字列の配列
const numsAndStrs = [1, "two", 3, "four"];

/**
 * 数値と文字列とオブジェクトと関数の配列
 * （滅多にやりません、というかやらないでください）
 */
const obj = {
  name: "John Doe",
  age: 24,
  sex: "male",
};

const add = function (a, b) {
  return a + b;
};
const jumble = [1, "two", obj, add];
console.log(jumble); // 実際にやってみてください
```

### 配列の参照

```jsx
const arr = ["a", "b", "c", "d"];

// 配列の長さ
console.log(arr.length); // 4

// インデックスで値を参照する
console.log(arr[1]); // b

// 指定した要素のインデックスを取得（存在しなければ-1）
console.log(arr.indexOf("c")); // 2
console.log(arr.indexOf("z")); // -1

// 要素が配列に含まれるか
console.log(arr.includes("d")); // true
```

:::info
配列に限らず、*JavaScript*のインデックスは**0(ゼロ)**から始まります
:::

### 配列の操作

**ごくごく**一部を紹介します。

```jsx
// 末尾に要素を追加
arr.push("e");
console.log(arr); // ["a", "b", "c", "d", "e"]

// 末尾の要素を削除
arr.pop();
console.log(arr); // ["a", "b", "c", "d"]

// 先頭に要素を追加
arr.unshift("z");
console.log(arr); // ["z", "a", "b", "c", "d"]

// 先頭の要素を削除
arr.shift();
console.log(arr); // ["b", "c", "d"]

// 全要素を引数に渡した文字列で結合
const result = arr.join("-");
console.log(result); // a-b-c-d
```

<details>
  <summary>
    【小ネタ】constで宣言した配列なのに、なんで増えたり減ったりするの？
  </summary>
  <div>
    <p>これが気になった方、センスあります。マジで。。</p>
    <p>
      <a href="https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/const">
        公式
      </a>
      は以下のように解説しています。
    </p>
    <q>
      const
      宣言は、値への読み取り専用の参照を作ります。これは、定数に保持されている値は不変ではなく、その変数の識別子が再代入できないということです。たとえば、定数の中身がオブジェクトの場合、オブジェクトの内容（プロパティなど）は変更可能です。
    </q>
    <hr />
    <p>
      配列を定義すると、メモリ上に領域が確保されますが、配列はメモリ上のアドレス（住所）を参照します。
    </p>
    <p>
      これを<strong>アドレス参照</strong>
      と言ったりしますが、constはこの参照している値が再代入できないということを言っています。
    </p>
    <p>つまり中身は見ていない、ということです。現実に例えると、、</p>
    <p>
      家族構成が変わっても、家の住所は変わらないですよね？だから一緒だよね？というような言い分になります。
    </p>
  </div>
</details>

## 条件分岐

だんだんプログラミング言語っぽくなってきましたね。。

### if 文

条件式の評価結果が`true`ならば`{}`の中身が実行されます。

```tsx
if (条件式A) {
  条件式Aを満たす場合に実行される文;
} else if (条件式B) {
  （条件式Aを満たさず）条件式Bを満たす場合に実行される文;
} else {
  いずれの条件式も満たさない場合に実行される文;
}
```

```tsx
const x = 5;
if (x < 0) {
  console.log("xは0より小さいです");
} else if (x % 2 === 0) {
  console.log("xは偶数です");
} else {
  console.log("xは0以上で、奇数です");
}
```

`true`になる場合よりも、`false`になる場合の方が少ないので、そちらを覚えた方が早いです。

- `false`
- `undefined`
- `null`
- `0`
- `0n`
- `NaN`
- `""`(空の文字列)

```tsx
// 実行されないパターン
if (false) {
  console.log("実行されません");
} else if (undefined) {
  console.log("実行されません");
} else if (0) {
  console.log("実行されません");
} else if (0n) {
  console.log("実行されません");
} else if (NaN) {
  console.log("実行されません");
} else if ("") {
  console.log("実行されません");
} else {
  console.log("上の条件式は全てfalseです");
}
```

### 複数の条件式

世の中そんな単純じゃないですよね。。

```tsx
const x = 5;
// AND: AかつB
if (x >= 0 && x < 10) {
  console.log("xは0以上かつ10未満です");
}
// OR: AもしくはB
if (x < 0 || x <= 5) {
  console.log("xは0未満もしくは5以下です");
}
// NOT: Aではない
if (!(x > 5)) {
  console.log("xは5より大きくないです");
}
```

<details>
  <summary>if文は面倒くさがりです。</summary>
  <div>
    <p>
      評価結果がtrueだと確定した時点で、それ以降の評価をやめてしまいます。。
    </p>
    <code>
      let x = 5;
      <br />
      if (x++) console.log(x); // 6
      <br />
      if (x > 0 || x++) console.log(x); // 6 ←えっ、７じゃないの？
    </code>
    <p>横着ですよね。。</p>
  </div>
</details>

### switch 文

式の評価結果が指定した値である場合に行う処理を並べて書きます。

```tsx
switch (式) {
  case ラベルA:
    式の評価結果がラベルAと一致した場合に実行される文;
    break;
  case ラベルB:
    式の評価結果がラベルAと一致した場合に実行される文;
    break;
  default:
    どのcaseにも該当しない場合に実行される文;
    break;
}
```

```tsx
const fruit = "apple";
switch (fruit) {
  case "apple":
    console.log("赤いですよね");
    break;
  case "pineapple":
    console.log("黄色いですよね");
    break;
  default:
    console.log("何色なんでしょう");
    break;
}
```

:::info
`break`を外すとどうなるかやってみましょう(付け忘れがちなので)
:::

条件式も使えます

```tsx
const x = 5;
switch (true) {
  case x >= 0 && x < 5:
    console.log("xは0以上5未満です");
    break;
  case x >= 5 && x < 10:
    console.log("xは5以上10未満です");
    break;
  default:
    console.log("xは10以上です");
    break;
}
```

:::tip
switch 文で条件式を使うのは控えましょう。なぜなら if 文で記述できるからです。  
試しに書き換えてみてください。。
:::

## 文と式

これまでにもしれっと使っていましたが、ちゃんと意味があります。

- 文（_Statement_）
  - 処理の 1 ステップ。`if`とか`switch`とか名前がついているものはおおよそ文です。
  - 前述の`function`も文、後述の`for`も文です。
- 式（_Expression_）
  - 値を生成し、変数に代入できるもの
  - 式は評価することができ、結果の値を**_評価値_**と言います。

:::info
知らなくてもコードは書けますが、世の中にはこういうことを言ってくる人もいるので、  
そんな時のための武装だと思って、フワッと頭の片隅に置いておいてください。
:::

## ループと反復処理

### for 文

繰り返す範囲を指定した反復処理です。

```tsx
for (初期化式; 条件式; 増分式) {
  実行する文;
}
```

実行フローはこんな感じです。

1. `初期化式`で変数宣言
2. `条件式`の評価結果が`true`なら次のステップへ、`false`なら終了
3. `実行する文`を実行
4. `増分式`で変数を更新
5. ステップ 2 へ戻る

やってみた方が早いです。

```tsx
let total = 0;
for (let i = 0; i < 10; i++) {
  console.log(`${i}回目の反復処理です`);
  total += i;
}
console.log(total); // 45
```

ループの途中で抜けることもできます。

```tsx
let total = 0;
for (let i = 0; i < 1000000000; i++) {
  // iが10以上ならばループを抜ける
  if (i >= 10) break;
  total += i;
}
console.log(total); // 45
```

:::info
この「**_途中で抜ける_**」というのはとても大切です。反復処理というのはコンピュータに負荷を掛けるので、  
本当に最後まで反復する必要があるのか？ということを常に考えるようにしましょう。
:::

:::tip
for 文は色んなパターンがありますが、上記だけ知っていればいいです。  
なぜならば、慣れてくると**_あんま書かなくなる_**からです。  
*JavaScript*には、もっと便利で楽な書き方がたくさんあるのです。お楽しみに w
:::

### while 文

条件式が`true`である限り、反復処理を行います。

```tsx
while (条件式) {
  実行する文;
}
```

実行フローは以下。

1. `条件式`の評価結果が`true`なら次のステップへ、`false`なら終了
2. `実行する文`を実行
3. ステップ 1 へ戻る

これもやってみた方が早いです。

```tsx
let x = 0;
while (x < 10) {
  console.log(`${x}回目の反復処理です`);
  x += 1;
}
```

注意）**_無限ループ_**という終わらない反復処理を作ってしまう事があります。

```tsx
let x = 1;
// 永久に終わりません。。
while (x > 0) {
  console.log(`${x}回目の反復処理です`);
  x += 1;
}
```

:::tip
無限ループを恐れて`for`文を使う人が多いような気がしますが、`while`文の方が需要あります。  
プログラミング言語を書く人なら一度はやらかすものなので、恐れずに使っていきましょう。
:::

## スコープ

それなりに構文を覚えて、それなりのコード量を書くようになったら、意識した方がいい内容です。

### スコープ

変数や関数などの参照できる範囲を決めるものです。いくつかあります。

- グローバルスコープ
  - どこからでも参照できるスコープ
- 関数スコープ
  - `function`内でのみ参照できるスコープ
- ブロックスコープ
  - `{}`内でのみ(if,for など)参照できるスコープ

実際に見てみましょう。

```tsx title="src/index.js"
/** グローバルスコープ: ここから */
const global = "global";

/** 関数スコープ: ここから */
function fn() {
  // globalはどこからでも参照できる
  console.log(global);

  // localはfn関数の中でだけ参照できる
  const local = "local";
  console.log(local);

  /** ブロックスコープ: ここから */
  for (let i = 0; i < 10; i++) {
    // iはfor文の中だけで参照できる
    console.log(i);
  }
  /** ブロックスコープ: ここまで */
}
/** 関数スコープ: ここまで */

fn();
/** グローバルスコープ: ここまで */
```

### `let`と`const`

実は`let`と`const`はブロックスコープです。

```tsx
for (let i = 0; i < 10; i++) {
  console.log(i);
}
for (let i = 10; i > 0; i--) {
  console.log(i);
}
```

上記のコードが成り立つということが、`let`（と`const`）がブロックスコープだということを証明しています。  
試しに`let`を`var`に書き換えてみてください（`var`は関数スコープです）。エラーになるはずです。

:::caution
つまり`var`は使うなということ。
:::

この話を掘り下げるとディープな世界に入っていくので、現時点ではこの辺にしときます。。

## 武器は配った。いざ戦場へ。。

こんだけ？と思ったかもしれませんが、これで十分プログラミングできます。  
どんどんコード書いていきましょう！
