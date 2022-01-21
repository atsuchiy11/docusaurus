---
sidebar_position: 5
---

# Ajax と非同期処理

<span class="theme-doc-version-badge badge badge--secondary">座学:60min／実技:60min</span>

*Ajax*とは（**_Asynchronous JavaScript + XML_**）のことです。  
つまり「***JavaScript*と*XML*を使って非同期に通信を行う**」ための技術の総称です。  
見た方が早いです。

<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.3055455960052!2d139.6854903156845!3d35.69409798019142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ce9f21047b7%3A0xf75f990d7cfae4a4!2z44ix44OX44Op44Kk44Og44Kv44Ot44K5!5e0!3m2!1sja!2sjp!4v1635753589246!5m2!1sja!2sjp" width="600" height="450"></iframe>

スクロールすると新しい地図が部分的に描画されていきますが、画面は遷移していませんよね。。

当たり前じゃん！と思うかもしれませんが、これを実現しているのが*Ajax*と呼ばれる技術です。  
（みなさんが当たり前だと思うくらい今日の Web サイトに普及している、ということです。）

*Ajax*というのは単一の技術ではなく、いくつかの技術や機能が組み合わさったものです。  
既にいくつかは登場しています。。

- JavaScript
- DOM
- XML
- XMLHttpRequest

ここではこれらの技術の一部と、*Ajax*の根幹をなす**非同期処理**について解説します。

## 非同期処理

ここであるコンビニ店員 A くんを紹介します。彼の処理フローは以下です。

0. 客がレジに来る
1. 商品をバーコードリーダーで読む
2. （温めてと言われたら）商品を電子レンジで温める
3. 会計をする
4. 次の客に対して 1.に戻る
5. ...
6. （温めが終わったら）商品を渡す

普通です。（まともな）店員であれば温めが終わるまで待っていませんよね。  
このように「**ある処理の完了を待たずに次の処理に進んでいく処理**」を非同期処理と言います。

人間は感覚的にできますが、実は*JavaScript*もこれに近い感覚で処理を行っています。

### コールバック地獄

*JavaScript*がどうやって非同期処理を実行しているかみていきます。  
みなさん既にご存知の**コールバック関数**を使います。

ここでひとつ関数を紹介します。

```tsx
setTimeout(callback, delay);
```

- `callback`: 実際の処理を記述するコールバック関数
- `delay`: `callback`の実行を`delay`ミリ秒だけ遅延させる

つまり`setTimeout()`は**非同期関数**です。  
この関数を使って処理を書きます。結果としてコンソール表示される順番はどうなるでしょうか？

```tsx
setTimeout(() => {
  try {
    console.log("TaskA: wait 3 seconds");
  } catch (err) {
    throw new Error(err.message);
  }
}, 3000);
setTimeout(() => {
  try {
    console.log("TaskB: wait 2 seconds");
  } catch (err) {
    throw new Error(err.message);
  }
}, 2000);
setTimeout(() => {
  try {
    console.log("TaskC: wait 1 seconds");
  } catch (err) {
    throw new Error(err.message);
  }
}, 1000);
console.log("All tasks finished");
```

<details>
  <summary>正解はコチラ</summary>
  <div>
    <code>
        all tasks finished<br />
        TaskC: wait 1 seconds<br />
        TaskB: wait 2 seconds<br />
        TaskA: wait 3 seconds    
    </code>
  </div>
</details>

最初の処理`TaskA`を、前述の「電子レンジで商品を温める処理」だと思えばピンと来るでしょうか。。  
温めが終わる前に以降の処理を実行しています。これ自体は効率の良い考え方で処理時間は 3 秒です。

もしこれを順番通り（A→B→C の順）に実行させたい場合はどうすればいいでしょうか。

```tsx
// コールバックをネストさせる
setTimeout(() => {
  try {
    console.log("TaskA: wait 3 seconds");
    setTimeout(() => {
      try {
        console.log("TaskB: wait 2 seconds");
        setTimeout(() => {
          try {
            console.log("TaskC: wait 1 seconds");
          } catch (err) {
            throw new Error(err.message);
          }
        }, 1000);
      } catch (err) {
        throw new Error(err.message);
      }
    }, 2000);
  } catch (err) {
    throw new Error(err.message);
  }
}, 3000);
```

カオスな（ネストが深い）上に、処理時間は 6 秒になってしまいます。。

:::caution
この例のように、コールバック関数の中にコールバック関数がネストしている状態を**コールバック地獄**と呼び、  
*JavaScript*におけるアンチパターン（やってはいけない書き方）の一つとして知られています。
:::

:::info
こと[kintone](https://kintone.cybozu.co.jp/)おいては、順番通りに実行したいパターンの方が多いです。  
（あるデータを取得して、そのデータから別のデータを取得して、その結果を、、、みたいな）
:::

<br />

コールバック地獄は関数的なアプローチをとることで回避できます。

```tsx
const taskA = (resolved, rejected) => {
  setTimeout(() => {
    try {
      console.log("TaskA: wait 3 seconds");
      taskB(resolved, rejected);
    } catch (err) {
      rejected(err);
    }
  }, 3000);
};

const taskB = (resolved, rejected) => {
  setTimeout(() => {
    try {
      console.log("TaskB: wait 2 seconds");
      taskC(resolved, rejected);
    } catch (err) {
      rejected(err);
    }
  }, 2000);
};

const taskC = (resolved, rejected) => {
  setTimeout(() => {
    try {
      console.log("TaskC: wait 1 seconds");
      resolved();
    } catch (err) {
      rejected(err);
    }
  }, 1000);
};

taskA(
  () => console.log("All tasks finished"), //全て完了したら実行される
  (err) => console.log(err.message) //エラーが発生したら実行される
);
```

マシになりましたね。。少なくともネストは解消されました。  
ですが現実はこんな単純な処理ではないです。**例外処理**の冗長な書き方も気になります。  
わたしたちは、同期的な処理と同じぐらいシンプルに書きたいのです。。

```tsx
// もし同期処理だったら。。
taskA();
taskB();
taskC();
console.log("All tasks finished");
```

上記のようなコードで非同期処理を書くことを、本項の目標とします。必要な要素は、、

- `Promise`
- `then()、catch()、finally()`
- `async/await`

です。

<!-- です。
ただいつまでも`setTimeout()`関数ではしょぼいので、先に外部との通信の話をしたいと思います。 -->

:::tip
ちらっと処理時間のことに触れましたが、同期処理は基本的に処理時間を**犠牲**にします。  
（理由は簡単ですよね、先に遅い処理があったらそれを待たないといけないから。）  
非同期処理の制御を覚えると、何でもかんでも同期的に記述したがる人が多いですが、  
ケースバイケースです。必要な時に必要な箇所を同期的に制御しましょう。。（先の話ですが）
:::

<details>
  <summary>同期処理はダメなのか？</summary>
  <div>
    別に同期処理が遅いわけではありません。JavaScriptにおける同期処理がノロマだと言っています。<br/>
    それは、JavaScriptが<strong>シングルスレッド</strong>で動作するからです（コンビニ店員が一人の状態）。<br/>
    同期処理でも複数の店員がいれば（<strong>マルチスレッド</strong>と言います）期待されるパフォーマンスは出ます。
  </div>
</details>

### `Promise`

<span class="theme-doc-version-badge badge badge--primary">ES6</span>

`Promise`とは「**非同期処理の結果を表現するオブジェクト**」です。以下のような特性を持ちます。

<br />
<span class="theme-doc-version-badge badge badge--secondary">Promise の特性 ①</span>

次の三つの状態を持ち、必ず*fulfilled*(解決)もしくは*rejected*(未決)することが保証されています。

- _pending_
  - 非同期処理がまだ完了していない（初期状態）
- _fulfilled_
  - 非同期処理が成功した
- _rejected_
  - 非同期処理が失敗した（エラーが発生した）

<span class="theme-doc-version-badge badge badge--secondary">Promise の特性 ②</span>

`resolve`、`reject`という関数を引数に取ります。これらは`Promise`の状態を遷移させます。

- `resolve([処理結果])`
  - 処理が成功した時に呼び出し、状態が*fulfilled*になる
  - 処理結果を引数に渡すことができる（必須ではない）
- `reject(Error)`
  - 処理が失敗した時に呼び出し、状態が*rejected*になる
  - 通常`Error`オブジェクトを渡す（必須ではない）
  - `throw`を投げても*rejected*に遷移する

<span class="theme-doc-version-badge badge badge--secondary">Promise の特性 ③</span>

- *fulfilled*状態になると、*onFulfilled*というコールバック関数が呼ばれる
- *rejected*状態になると、*onRejected*というコールバック関数が呼ばれる

<span class="theme-doc-version-badge badge badge--secondary">Promise の特性 ④</span>

処理結果を受け取るには、`then()`メソッドを使います。  
`then()`は Promise インスタンスの状態が*fulfilled*または*rejected*になった時に  
実行するコールバック関数（_onFulfilled_, _onRejected_）を登録するメソッドです。

```tsx
Promise.then([onFulfilled], [onRejected]);
```

では実際に書いてみましょう。。

```tsx
const asyncFn = () => {
  // ②Promiseインスタンスを生成（初期はpending状態）
  return new Promise((resolve, reject) => {
    try {
      // ③エラーが起こるかもしれない処理を実行する
      // ④fulfilled状態にする（解決）
      resolve("success");
    } catch (err) {
      // ④'rejected状態にする（未決）
      reject(err); //通常Errorオブジェクトを返す
    }
  });
};

// ①非同期関数を実行する
asyncFn().then(
  // ⑤onFulfilled: fulfilled時に呼ばれるコールバック関数
  (result) => console.log(result), //success
  // ⑤'onRejected: rejected時に呼ばれるコールバック関数
  (err) => console.log(err.message)
);
```

*rejected*時のコールバック関数を`then()`の第二引数に記述するほかに、  
`catch()`メソッドを記述することもできます。  
エラーハンドリングを 1 箇所に集約できるのでこちらの方が主流です。

```tsx
Promise.then([onFulfilled]).catch([onRejected]);
```

:::info

- `Promise.then([onFulfilled], [onRejected]);`
- `Promise.then([onFulfilled]).catch([onRejected]);`

このようにある構文を別の記法で記述できるようにしたものを、  
**糖文糖衣（Syntax Sugar: シンタックスシュガー）**
と言います。知ってるとドヤれるかも。
:::

以上を踏まえ、前述の例を`Promise`オブジェクトを使って書き換えるとこうなります。

```tsx
const taskA = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        console.log("TaskA: wait 3 seconds");
        resolve(); //処理が成功したので解決にする
      } catch (err) {
        reject(err); //処理が失敗したので未決にする
      }
    }, 3000);
  });
};

const taskB = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        console.log("TaskB: wait 2 seconds");
        resolve();
      } catch (err) {
        reject(err);
      }
    }, 2000);
  });
};

const taskC = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        console.log("TaskC: wait 1 seconds");
        resolve();
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};

/**
 * taskA→B→Cの順に実行する
 * 全て完了したら完了通知する
 * 途中でエラーが発生したらエラーメッセージをアラートする
 */
taskA()
  .then(taskB)
  .then(taskC)
  .then(() => console.log("All tasks finished"))
  .catch((err) => console.error(err.message));
```

かなりシンプルになりましたね。。各関数の結合度が低く、エラー処理も集約されています。  
このパターンは`Promise`の基本形なので、丸暗記してもいいと思います。

が、しかし、、

当初の目標には及びませんね。

### `async/await`

**最終兵器**です。今日これより簡潔に非同期処理を同期的に記述する術はありません。。  
（ジェネレータとか使えばできるかもしれませんが、それ自体を作るのが大変です）

- `async`: 必ず`Promise`を返す関数を定義する
- `await`: 式の右辺の`Promise`が*fulfilled*または*rejected*になるまで待機する
- `async`の中でのみ`await`は使える

```tsx
// asyncで定義した関数は必ずPromiseを返す
const asyncFn = async () => 10;

// thenはPromise解決時のコールバック関数を定義するメソッドなのでこうなる
asyncFn().then(console.log); //10

// awaitはasyncの中でしか使えない
const main = async () => {
  const result = await asyncFn();
  console.log(result);
  console.log("fin");
};
main();
// 10
// fin
```

さぁ、ファイナルアンサーです。  
先ほどの関数はそのまま、実行部分だけを書き換えてます。

```tsx
// await式を使いたいので即時関数を定義する
(async () => {
  try {
    // taskA(B,C)はPromiseを返す関数で、awaitはPromiseが解決/未決するまで待機する
    // つまり順番に（同期的に）実行される
    await taskA();
    await taskB();
    await taskC();
    console.log("All tasks finished");
  } catch (err) {
    // taskA,B,Cのいずれかエラーが発生したらここでキャッチする
    console.error(err.message);
  }
})();
```

はい、証明終了です。（_Q.E.D_）

実務では、`Promise`と`async/await`を組み合わせて使うことが多いので、どちらも*MUST*で覚えましょう。。

:::tip
今回はアロー関数で`async`を使いましたが、`function`文だとこうなります。

```tsx
async funcion() {
  // 処理
}
```

:::

<br /><br />

さて、何の話をしていたんでしたっけ。。そう**_Ajax_**です。  
「**非同期な通信**」の"**非同期**"の部分はこれで*OK*なので、次は"**通信**"の部分をやっていきます。

<br />

## HTTP リクエスト

*HTTP*というプロトコルを用いて Web サーバなど外部から情報を取得することです。  
これだけで一冊の本（で収まるかも定かでない）になるような内容なのでもちろん割愛します。  
興味がある方は、[RFC（和訳）](https://triple-underscore.github.io/RFC7231-ja.html)というドキュメントがあるのでそちらをご覧ください。

### 四大要素

どの Web API を使っても大体これらの要素が登場します。頭の片隅に置いておいてください。  
(GET リクエスト時のボディはない場合があるかも。。)

- メソッドとパス
- ヘッダー
- ボディ
- ステータス

:::warning
今から*GitHub API*を使いますが、必要以上にリクエストしないでください。上限に達します。  
ブラウザ系のエディタを使用していると、オートリロード機能で知らずにコールしてしまうことがあります。  
用法、用量を守ってお行儀よく利用することは、Web に関わる人間として最低限のマナーです。  
遊び半分で自分勝手に API 叩く人は ○○ します、マジで。。
:::

### XMLHttpRequest

冒頭で出てきましたが、*JavaScript*で HTTP リクエストを行うためのオブジェクトです。  
ざっくり言うとプログラムの外からデータを取ってきたり、送ったりできる機能です。

最近は「**API を叩く**」などと言いますが「**HTTP リクエストを送る**」とほぼ同義で使われています。

ページを再読み込みすることなく、指定した URL からデータを取得することができます。  
（冒頭の Google Map を実現しているのはこの技術なわけです。）

```tsx title="GitHub APIを利用してユーザ情報を取得する例"
const fetchData = (user) => {
  const url = `https://api.github.com/users/${user}`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url); //メソッドとパス
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); //ヘッダー
  xhr.onload = () => {
    if (xhr.status === 200) {
      //ステータス
      console.log(JSON.parse(xhr.responseText));
      // もし同期的に処理するのであればこの中にコードを書いていく
    } else {
      console.log(JSON.parse(xhr.responseText));
    }
  };
  xhr.send();
};
fetchData("your_github_account");
```

もうわかると思いますが`fetchData`は非同期関数です。  
コールバック地獄にハマっていく未来しか見えないですね。。

:::info
この例はレガシーなコードなので覚えなくても大丈夫です（筆者も数年ぶりに書きました）
:::

### Fetch

- `XMLHttpRequest`より簡潔かつ柔軟
- `Promise`を返す

そう`Promise`です。この件のために延々と説明してきたんです。。

```tsx title="GitHub APIを利用してユーザ情報を取得する例"
const fetchData = (user) => {
  const url = `https://api.github.com/users/${user}`;
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error(response.statusText);
      })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

fetchData("your_github_account")
  .then((resp) => console.log(resp))
  .catch((err) => console.error(err.message));
```

もちろん`async/await`を使っても書けます。

```tsx
const fetchData = async (user) => {
  const url = `https://api.github.com/users/${user}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

(async () => {
  try {
    const userData = await fetchData("your_github_account");
    console.log(userData);
  } catch (err) {
    console.error(err.message);
  }
})();
```

:::info
詳しく知りたい方は[公式](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch)をご覧ください。  
:::

### HTTP 補足

メソッドは他にもいっぱいあります。*GET, POST, PUT, DELETE*さえ知っておけば **95%**くらいは賄えます。  
また kintone は[kintone REST API](https://developer.cybozu.io/hc/ja/articles/360000313406-kintone-REST-API%E4%B8%80%E8%A6%A7)という独自の WebAPI を提供しています。  
こちらベースで覚えていただければいいと思うので、他のメソッドについては割愛します。

:::info
稀に*OPTION, PATCH*といったメソッドを使うことがありますが kintone じゃいらないです。。  
（プリフライトとかでググるとちょっと幸せになれるかもしれません。）
:::
