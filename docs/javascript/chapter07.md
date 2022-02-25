---
sidebar_position: 7
---

# jQuery

*JavaScript*のライブラリの一つです。*JavaScript*をより簡潔に簡単に記述できるようになります。  
色々な機能が開発され、サードパーティのライブラリとして公開されています。

- DOM 操作
- イベント
- Ajax と非同期処理

:::info
勘違いしている人が多いですが、既存の*JavaScript*以上のことが出来るわけではありません。  
簡単に記述できるようになるだけです（自動車の*MT*と*AT*みたいなものです）。
:::

:::tip
主に DOM 操作について解説しますが、それ以外の制御構文（*each, ajax*など）もたくさんあります。  
ですが、[ES6(ESMA2015)](https://www.w3schools.com/js/js_es6.asp)以前に流行ったものなので、*ES6*構文の方が利便性がいいですし、  
あえて*jQuery*を使う必要はありません（個人の見解です）。
:::

## *DOM*操作

とりあえず色々やってみます。。(長くてすいません)

```html title="index.html"
<div id="app"></div>
<div id="header-container">
  <div class="container" aria-label="main-contents">
    <h1>title</h1>
    <p>paragraph</p>
  </div>
</div>
<div id="checkbox-container">
  <div class="checkbox">
    <input type="checkbox" value="primary" id="checkbox-primary" />
    <label for="checkbox-primary">primary</label>
  </div>
  <div class="checkbox">
    <input type="checkbox" value="secondary" id="checkbox-primary" />
    <label for="checkbox-primary">primary</label>
  </div>
</div>
<div id="table-container">
  <p class="h3">User Table</p>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">FirstName</th>
        <th scope="col">LastName</th>
        <th scope="col">Email</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Keisuke</td>
        <td>Hase</td>
        <td>k-hase@prime-x.co.jp</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Yuki</td>
        <td>Sonoda</td>
        <td>y-sonoda@prime-x.co.jp</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Hanako</td>
        <td>Kurosawa</td>
        <td>h2-kurosawa@prime-x.co.jp</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 要素の取得

```tsx title="jQuery"
// ()の中身はCSSセレクタです
const $app = $("#app");
const $container = $("#header-container .container");

/**
 * find(CSSセレクタ)
 * 指定した要素の全子要素から、条件に合致するものを選択します
 */
const $tbody = $("#table-container tbody");
const tdList = $tbody.find("tr td");

// 親、子、兄弟要素の取得
console.log($tbody.parent());
console.log($tbody.children());
console.log($tbody.siblings());
```

### 要素の作成、挿入

```tsx title="jQuery"
// 要素をまとめて書けます
const $list = $(`
  <ul class="list">
    <li>item1</li>
    <li>item2</li>
  </ul>
`);
const $title = $(`<h3>リストのタイトル</h3>`);

app.append($list); //末尾に挿入
app.prepend($title); //先頭に挿入

// clone(bool)で要素を複製します。trueにするとイベントもコピーされます。
const replica = $("#template").clone(true);

// replaceWith(el)で要素を置き換えます
const newTitle = $("<h1>New title</h1>");
$(".container h1").replaceWith(newTitle);

// remove()で要素を削除します
$(".container p").remove();

// empty()で子要素を全て削除します
const $tbody = $("#table-container tbody");
$tbody.empty();
```

:::tip
取得されるのは、***jQuery*オブジェクトでラップされた*DOM*要素**です。  
通常の*DOM 要素*と区別するため、変数名の接頭辞に`$`をつけたりします（個人的には推奨）。
:::

### 属性の取得

```tsx title="jQuery"
// attr(attr_name)で属性値を取得します
const ariaLabel = container.attr("aria-label"); //main-contents
// 変更
container.attr("aria-label", "new-label");

// text()でテキストを取得します
const $h1 = $("#header-container .container h1");
console.log($h1.text()); //title
// 変更
$h1.text("new title");

// val()でvalueを取得します
const checkboxes = $(`#checkbox-container input[type="checkbox"]`);
// 変更
$h1.text("new title");

/**
 * jQuery版のforEach文です。インデックスが先に来るのが紛らわしい
 * map,filter等で十分だと思う（個人の見解です）。
 */
$.each(checkboxes, (i, checkbox) => {
  console.log(i, $(checkbox).val());
});
```

### CSS

個人的にはこれがかなり便利です。

```tsx title="jQuery"
const $div = $(`
  <div>
    <p>paragraph</p>
  </div>
`);
$div.attr("id", "id").addClass("component").css({
  color: "red",
  fontSize: "1rem",
  margin: "3px",
});
app.append($div);
```

わぁー今までのは何だったんだっていうぐらい簡単ですね。  
習うより慣れろ、です。機会があればどんどん使ってください。。

:::info
例によってたくさんあるので詳細は[公式](https://api.jquery.com/category/callbacks-object/)もしくは、
[非公式（日本語訳)](http://semooh.jp/jquery/)をご確認ください。
:::

## イベント

`addEventListener`という長ったらしい名前が無くなれば御の字です。

```html title="index.html"
<button id="btn">BUTTON</button>
```

```tsx
/** 厳密な違いはありますが基本的にon()メソッドでいいと思います */
$("#btn").click(() => console.log("event fired"))
$("#btn").on("click", () => console.log("event fired"))

/** kintoneなら作ると同時にイベントを登録することが多いです */
$("<button>NEW BUTTON</button>")
  .css({ margin: "1rem", padding: "1rem" })
  .on("click", () => console.log("event fired"))
```