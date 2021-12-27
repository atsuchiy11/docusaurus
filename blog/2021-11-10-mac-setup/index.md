---
slug: setup
title: Macセットアップ
authors: [a2-tsuchiya]
tags: [Mac]
---

最低限これぐらいはやっとけ、というような内容です。*Mac*前提です。

## *Mac*本体

### `fn`キーをデフォルトで有効にする

デバッグ時などに`fn`を押すことから解放されます。

`システム環境設定 > キーボード > F1,F2などのキーを...`にチェック

## Homebrew

*Mac*用のパッケージ管理システムです。

1. ターミナルから[公式](https://brew.sh/index_ja)のシェルプロンプトを貼り付け

```bash
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. インストール（体感で 2〜3 分）

3. *PATH*に追加する

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

4. *homebrew-cask*をインストールする（要検証）

このアイコンをドラッグしてください、、みたいな件から解放されます。

```bash
$ brew install alfred
```

この*Homebrew*でガンガン入れていきます。

## iTerm2

ターミナルのほぼ上位互換です。

1. インストール

```bash
$ brew install iterm2 --cask
```

:::tip

いつの間にか`cask`コマンドの使い方が変わってました（汗

```bash title="旧コマンド"
$ brew cask install ***
```

```bash title="新コマンド"
$ brew install *** --cask
```

（2021-11-10 時点）

:::

この辺は好みです。

2. `Ctrl`キー 2 回押しで降臨させる

- *Hotkey*を有効にする
  - `Preferences > Keys > Hotkey > Create a Dedicated Hotkey Window...`
  - `Double-tap key`を`^Control`にする
- *Default Window*を開かないようにする
  - `Preferences > General > Startup`で`Only Restore Hotkey Window`を選択する

3. 背景を透過

- `Preferences > Profiles > Transparency `で設定（50％オススメ）

ターミナルさん、短いお付き合いでしたがありがとうございました m(\_ \_)m

## GitHub アカウント作成

割愛

## SSH Keys 作成

1. 新しいキーペアを作成する

```bash
$ ssh-keygen -C "your_name@prime-x.co.jp"
```

- 保存先はそのまま*Enter*（`~/.ssh`になります）
- パスフレーズは入力しましょう

:::info
パスフレーズは秘密鍵にアクセスするためのパスワードです。  
:::

2. 暗号強度を確認

注）鍵長 2048 以上で暗号化方式が*RSA/ECDSA/Ed25519*であること

```bash
$ ssh-keygen -l -f ~/.ssh/id_rsa.pub
3072 SHA256:************************* a2-tsuchiya@prime-x.co.jp (RSA)
```

3. 公開鍵（id_rsa.pub）をクリップボードにコピー

```bash
$ pbcopy < ~/.ssh/id_rsa.pub
```

4. GitHub に登録

- `右上のSettings > SSH and GPG keys > 右上のNew SSH key`と遷移
- *title*に好きな名前、*Key*にクリップボードの値を貼り付け
- *Add SSH key*をクリック

5. 疎通確認

```bash
$ ssh -T git@github.com
```

- フィンガープリントが表示されて、接続しますか？と聞かれるので（_yes_）
- パスフレーズを入力
- 以下のように表示されれば完了です。

`Hi user_name! You've successfully authenticated, but GitHub does not provide shell access.`

6. *SSH*キーを`ssh-agent`に追加する

毎回パスフレーズを入力するの面倒ですよね？省略しましょう。

```bash
$ ssh-add ~/.ssh/id_rsa
```

- パスフレーズを入力する
- `ssh-add -l`で鍵が登録されていることを確認する

7. リポジトリをクローンしてみる

```bash
$ git clone git@github:[user_name or org_name]/[favorite_repo].git
```

パスフレーズ入力を求められずにクローンできれば成功です。お疲れ様でした。

## VSCode

正直エディタは揃えてもいいかなと思います。。

```bash
$ brew install visual-studio-code --cask
```

### Prettier

1. 拡張機能から`Pretteir`をインストール

2. *Prettier*設定ファイル作成

```bash
$ touch .prettierrc
```

3. 以下のように設定する

```json title="./.prettierrc"
{
  "printWidth": 100,
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "useTabs": true,
  "jsxBracketSameLine": true
}
```

:::info
詳細はプロジェクトごとに決めてください。
:::

4. *VSCode*ユーザ設定ファイル作成

```bash
$ mkdir -p .vscode/settings.json
```

6. 以下のように設定する

既定のフォーマッタを*Prettier*にし、ファイル保存時に自動整形します。

```json title="./.vscode/settings.json"
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

:::info
詳細はプロジェクトごとに決めてください。
:::

:::tip
プロジェクト、組織内のエディタを*VSCode*に統一すれば、設定を共有できます。
:::

## `nvm`

*Node.js*のバージョンマネージャです。

（すでにシェルの設定ファイルがあるかたはスキップしてください）

1. デフォルトシェルを確認

*macOS Cattallina*以降は*zsh*なのでその前提で進めます。

```bash
$ echo $SHELL
/bin/zsh
```

2. 設定ファイルを作成

```bash
$ touch ~/.zshrc
$ ls -a #確認
```

3. `nvm`インストール

念の為[公式](https://github.com/nvm-sh/nvm#install--update-script)でバージョンを確認して、

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.**.0/install.sh | bash
```

4. `.zshrc`に次の行を追加

```bash
$ source ~/.nvm/nvm.sh
```

5. 端末を再起動するか`(exec $SHELL -l)`を実行する

6. インストール確認

```bash
$ nvm -v
0.39.0
```

7. *Node.js*インストール

インストール可能なバージョンを見て、無難に安定版（**_LTS_**）を選びましょう

```bash
$ nvm ls-remote
...
v16.13.0 (Latest LTS: Gallium)
...
```

8. 安定板を選択して、インストール

```bash
$ nvm install v16.13.0
```

9. 使用するバージョンを決める

```bash
$ nvm use v16.13.0
```

:::info
`npm`は今日日の*Node.js*には同梱されているので、以下のコマンドで確認します。

```bash
npm -v
8.1.0
```

:::

10. `yarn`を使いたい方はここでインストール

```bash
npm install -g yarn
```

## `pyenv`

*Python*のバージョンマネージャです。2 系 3 系の切り替えなどに。

1. `pyenv`インストール

```bash
$ brew update
$ brew install pyenv
```

2. *PATH*を通す

```
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
echo 'eval "$(pyenv init --path)"' >> ~/.zshrc
```

3. バージョン確認

```bash
$ pyenv -v
pyenv 2.2.0
```

4. *Python*インストール

```bash
# 全体
$ pyenv global 3.9.7

# ディレクトリのみ
$ pyenv local 3.9.7
```

5. 端末を再起動するか`(exec $SHELL -l)`を実行する

6. バージョン確認

```bash
$ python -V
Python 3.9.6

$ pyenve versions
  system
* 3.9.7 (set by /Users/[user_name]/.pyenv/version)
```

:::caution
3.6 系は **2021 年 12 月**に、3.7 系は **2023 年 6 月**にそれぞれ、  
セキュリティ修正の提供が終了しますのでそれ以降のバージョンを選択しましょう。
:::

## *AWS*環境
