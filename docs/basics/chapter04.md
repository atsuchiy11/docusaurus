---
sidebar_position: 4
---

# DOM とイベント

<span class="theme-doc-version-badge badge badge--secondary">座学:40min／実技:60min</span>

**_DOM_**（_Document Object Model_）は、プログラムから*HTML/SVG/HTML*を扱うための**_API_**です。  
API（Application Programming Interface）とは「アプリケーションをプログラミングするための**_インターフェース_**」です。  
そしてインターフェースには「接点、境界面、橋渡し」などの意味があります。  
つまり、アプリケーション同士を繋いてくれるもの総称して**_API_**と言っています。

<br />

WebAPI の普及により今では色々な使われ方をしているのですが、本来はこういう意味です。  
(と、筆者は解釈しています。)

## DOM ツリー

入れ子で表現されている HTML をツリー構造で表現したものです。一つ一つを**_ノード_**と言います。

```jsx title="htmlの入れ子構造"
<html>
  <head>
    <title />
    <meta />
  </head>
  <body>
    <h1></h1>
    <p></p>
  </body>
</html>
```

```tsx title="DOMツリー構造"
html
└ head
│ └ title
│ └ meta
└ body
  └ h1
  └ p
```

## Document オブジェクト

HTML 全体を表す、DOM の最上位ノードです。`document.***`で大体の操作ができます。

## 要素の検索

ID、タグ名、クラス名、[CSS セレクタ](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Selectors)などで要素を検索することができます。

| Method                                   | Description                                           |
| ---------------------------------------- | ----------------------------------------------------- |
| `document.getElementById("id")`          | `<div id="id">`: 指定した ID を持つ要素を取得         |
| `document.getElementsByTagName("h1")`    | `<h1></h1>`: 指定した HTML 要素を取得                 |
| `document.getElementsByClassName("cls")` | `<div class="cls">`: 指定したクラス名を持つを取得     |
| `document.querySelector('#id')`          | `<div id="id">`: CSS セレクタで指定した単一要素を取得 |
| `document.querySelectorAll("p")`         | `<p></p>`: CSS セレクタで指定した複数要素を取得       |

:::tip
経験上、`getElementById`と`querySelector`しか使いません。  
（*jQuery*を使った方が早いということはナイショです）
:::

## 親／子／兄弟ノードの取得

今日の HTML は複雑です。一発で求める要素に辿り着けるとは限りません。。

| Method                    | Description                       | Frequency |
| ------------------------- | --------------------------------- | --------- |
| `element.parentNode`      | `element`の親要素を取得する       | ★☆☆       |
| `element.childNode`       | `element`の子要素を取得する       | ★☆☆       |
| `element.firstChild`      | `element`の最初の子要素を取得する | ★☆☆       |
| `element.lastChild`       | `element`の最後の子要素を取得する | ★☆☆       |
| `element.nextSibling`     | `element`の次の子要素を取得する   | ★☆☆       |
| `element.previousSibling` | `element`の前の子要素を取得する   | ★☆☆       |

:::info
多分知らなくてもなんとかなる。。
:::

## 要素の取得

`document`オブジェクトから取得した要素を掘り下げるときに使います。(取得した`div`要素の中の`p`要素とか)

| Method                           | Description                                  | Frequency |
| -------------------------------- | -------------------------------------------- | --------- |
| `element.children`               | `element`の子要素を全てを取得する            | ★★☆       |
| `element.firstElementChild`      | `element`の最初の子要素を取得する            | ★☆☆       |
| `element.lastElementChild`       | `element`の最後の子要素を取得する            | ★☆☆       |
| `element.nextElementSibling`     | `element`の次の要素（つまり弟）を取得する    | ★☆☆       |
| `element.previousElementSibling` | `element`の前の要素（つまり兄）を取得する    | ★☆☆       |
| `element.querySelecter("#foo")`  | CSS セレクタを指定して単一のノードを取得する | ★★★       |
| `element.querySelecterAll("p")`  | CSS セレクタを指定して複数のノードを取得する | ★★★       |

注意）Frequency（=頻度）は筆者の主観です。あしからず。

:::tip
たぶん`querySelector`と`querySelectorAll`で全部表現できます。。  
（クエリという時点で、任意の条件を指定できるということなので）
:::

## 要素の作成/挿入/削除/置換

これだけ知っていればいいと思います。。

- 作成
  - `document.creaeElement("h1")`
- 挿入
  - **末尾**に挿入
    - `element.append(ノードオブジェクト or テキスト)`
    - `element.appendChild(ノードオブジェクト)`
  - **先頭**に挿入
    - `element.prepend(ノードオブジェクト or テキスト)`
    - `element.insertBerore(ノードオブジェクト)`
- 削除
  - `document.removeChild(element)`
- 置換
  - `document.replaceChild(newElement, oldElement)`

```tsx
const app = document.getElementById("app");
const h1 = document.createElement("h1");
const h2 = document.createElement("h2");

/** appendとappenChildの違い */
app.append(h1); //OK
app.appendChild(h2); //OK

app.append("Hello, world"); //OK
app.appendChild("Hello, world"); //NG

app.prepend("app要素の先頭に挿入される");
```

## DOM 操作

:::caution
DOM に関するプロパティ、メソッドはとても多いのでここではあまり区別していません。  
また`element`と`HTMLElement`なども厳密に区別していません。  
それらを覚えるよりもコードを書いてパターンを覚えた方が早いです。。
:::

### 属性の取得

よく使う（であろう）ものだけ紹介します。

| Property            | Description                                      |
| ------------------- | ------------------------------------------------ |
| `element.id`        | 要素の ID を取得する                             |
| `element.className` | 要素のクラスを取得する                           |
| `element.innerHTML` | 要素の HTML/XML を取得する。                     |
| `element.innerText` | 要素の（レンダリングされた）テキストを取得する。 |
| `element.value`     | 要素の`value`属性を取得する。                    |
| `element.checked`   | 要素の`checked`属性を取得する。                  |
| `element.style`     | 要素のスタイル（CSS）を取得する。                |

これらは**プロパティ**なので、参照、代入が出来ます。

```tsx
const app = document.getElementById("app");
console.log(app.id); // id
app.className = "cls"; // クラス名clsが追加される

console.log(app.innerText); // Hello, world
app.innerText = "Hello, JavaScript"; // 要素のテキストが変更される
console.log(app.innerText); // Hello, JavaScript

const input = document.getElementById("input");
input.value = "hoge"; // テキストボックスなどに値を代入

const checkbox = document.getElementById("checkbox");
console.log(checkbox.checked); // チェックされていればtrue

app.style.marginTop = "1rem"; //　スタイル名はキャメルコード
console.log(app.style); // 中身を見たい方はコンソール表示してみて
```

### 属性の書き換え

| Method                              | Description                                     |
| ----------------------------------- | ----------------------------------------------- |
| `element.classList.add("cls cls2")` | 要素にクラスを付与する: `<div class="cls cls2>` |
| `element.classList.remove("cls")`   | 要素からクラスを除去する: `<div class="cls2>`   |
| `element.getAttribute(name)`        | 要素の`name`属性の値を取得する                  |
| `element.setAttribute(name, value)` | 要素の`name`属性に`value`を追加または変更する   |
| `element.removeAttribute(name)`     | 要素の`name`属性を除去する                      |

:::tip
[DOM 操作](https://developer.mozilla.org/ja/docs/Web/API/Element)の詳細は自分で覚えてください m(\_ \_)m
:::

## CSS セレクタ

CSS を指定するための記法（？）です。`element.querySelector("この部分がCSSセレクタ")`です。  
こちらもたくさんあるので使いそうなやつだけです。。（名称はぶっちゃけどうでもいいです）

| Selector        | Name                | Description                                                 |
| --------------- | ------------------- | ----------------------------------------------------------- |
| `#id`           | ID セレクタ         | `id`という ID を持つ要素                                    |
| `.cls`          | クラスセレクタ      | `cls`というクラス持つ要素                                   |
| `input`         | 要素セレクタ        | `<input>`要素                                               |
| `p.cls`         | 要素+クラスセレクタ | `<p class="cls">`要素(セレクタというか CSS そのもの)        |
| `[name="name"]` | 属性セレクタ        | `name`という`name`属性を持つ要素                            |
| `#id .cls`      | 子孫結合子          | `id`という ID を持つ要素の中の、`cls`というクラスを持つ要素 |
| `ul > li`       | 子結合子            | `<ul>`の直接の子要素である`<li>`要素                        |
| `p ~ span`      | 一般兄弟結合子      | `<p>`の後にある全ての`<span>`要素                           |
| `p + span`      | 隣接兄弟結合子      | `<p>`の**直後**にある全ての`<span>`要素                     |

:::tip
[CSS セレクタ](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Selectors)の詳細は自分で覚えてください m(\_ \_)m
:::

:::info
余談ですが、今日日のプログラミングは**７割**が調べものだと言われています。  
今回のように、知っているかどうかが全ての操作系は覚えておくより都度調べた方が効率が良かったりします。  
(異論は認めますが)プログラミングの本質はそういうことではないのです。。
:::

## イベント

ブラウザ上では、クリックした、カーソルを合わせた、何かを入力した、などの**イベント**が頻繁に発生します。  
それらイベントに応じてコードを記述していくことを**イベント駆動型モデル**と言ったりします。  
*JavaScript*におけるイベントは、

- どの要素で
- どんなイベントを
- どのハンドラー／リスナーに

ということを定義する必要があります。  
構文は以下のようになります。

```tsx
target.addEventListenr(type, calback);
```

- _target_
  - `element`、`document`、`window`などのオブジェクト。「**どの要素**」の部分。
- _type_
  - `click`、`blur`、`focus`など。「**どんなイベント**」の部分。
  - いっぱいあるので詳細は[コチラ](https://developer.mozilla.org/ja/docs/Web/Events)をどうぞ
- _callback_
  - 特定のイベントが発生するたびに呼ばれる関数。実際の処理はここに書きます。
  - このように、ある関数を呼び出すときに、引数に指定する別の関数を**コールバック関数**と言います。
  - 今後マジで**頻出**します。令和の*JavaScript*では避けて通れません。
- _addEventListener_
  - イベントリスナーを設定するメソッド。「**どのリスナー**」の部分。

やってみるのが早いです。

```html title="demo.html"
<button id="demo-btn">Demo</button>
```

```tsx title="demo.js"
const demoButton = document.getElementById("demo-btn");

/** 取得したbutton要素にイベントリスナーを登録し、クリック時に発火させる */
demoButton.addEventListener("click", function () {
  window.alert("event fired !!");
});
```

:::info
あれ？イベントハンドラーは？？  
知らなくてもいいです。本カリキュラムでは基本的にインベントリスナーを使います。  
ご参考程度に紹介しますと、、

```tsx
/** イベントハンドラーの例 */
demoButton.onclick = function () {
  window.alert("event fired !!");
};
```

イベントハンドラーは「**同一の要素やイベントに対して複数のイベントハンドラーを登録できない**」です。  
（構文から自明ですね、関数が再代入されるだけです。。）  
:::

:::caution
少し先の話ですが[kintone](https://developer.cybozu.io/hc/ja/articles/201941954)は独自のイベント駆動で動いています。  
（筆者は勝手に**kintone イベントドリブン**と呼んでいます。。）  
ブラウザベースのイベント駆動に慣れてしまうと、後々混乱してしまう可能性があるので  
イベントに関しては簡単にしか説明してません。ご了承ください m(\_ \_)m
:::
