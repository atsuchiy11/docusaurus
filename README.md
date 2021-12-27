# 打倒 Udemy!!Jamstack で作る JavaScript 学習サイト

## イントロ

[Docusaurus v2](https://docusaurus.io/)で作る静的サイトです。
<br>
Facebook 傘下のチームが開発した静的サイトジェネレータ（_SSG_）で<br>
簡単に言うと、**Markdown + React**で構成された Web サイトです。

- 非エンジニアさんでも、Markdown 記法でドキュメント作成が可能（書けん奴は知らん）<br>
- 凝り性のエンジニアさんは React でゴリゴリにカスタマイズできます w
- `GitHub Pages`ファーストな設計で、で**完全無料**の静的サイトホスティングが可能！

<br><br>

## 内容

固まったら更新予定

<br><br>

## 設定

### インストール

```
$ yarn
```

### 開発サーバ

```
$ yarn start
```

### ビルド

```
$ yarn build
```

### デプロイ

```
$ GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

注）`GitHub Actions`で CI 構築しているので叩くことはないと思います。

<br><br>

## セットアップ

もう終わっているでやる必要はありません。備忘録です。<br>
注）メンテする方は**秘密鍵**の登録が必要です

### 1. `Install`

```
$ npm init docusaurus@latest [your_site_name] classic --typescript
```

注）無論*TypeScript*です。

<br><br>

### 2. `docusaurus.config.js`の設定

プロジェクトディレクトリ直下に生成されているハズです<br>
`GitHub Pages`にデプロイするためのおまじないです。以下 4 つのメタ情報を修正します。

```javascript
const config = {
  // ...
  url: "https://prime-x-co-ltd.github.io",
  baseUrl: "/jamstack-js-tutorial/",
  organizationName: "prime-x-co-ltd", // Usually your GitHub org/user name.
  projectName: "jamstack-js-tutorial", // Usually your repo name.
  // ...
};
```

<br><br>

### 3. SSH 秘密鍵の登録

SSH 接続に関する設定は割愛。[この辺り](https://qiita.com/suthio/items/2760e4cff0e185fe2db9)を見れば分かります。<br>
GitHub のリポジトリ単位で設定します。

- _Repo-Top_ -> _Settings_ -> _Secrets_ -> *New sepository secrets*と遷移
- *Name*は`GH_PAGES_DEPLOY`にする（後で*Scripts*から参照されます）
- *Value*は`/.ssh/id_rsa`をコピペする（`id_rsa.pub`じゃないです、秘密鍵の方です）

注）**秘密鍵**をやりとりするので、不安ならやらない方が無難です。

<br><br>

### 4. `GitHub Actions`の設定

[公式](https://docusaurus.io/docs/deployment)にテンプレートがあるのでそちらを使います。<br>
プロジェクトディレクトリ直下で、<br>

```
$ mkdir -p .github/workflows/
$ vi .github/workflows/documentation.yml
```

あとはコピペです（このリポジトリはちょっとイジってますがコピペでも動きます）。
