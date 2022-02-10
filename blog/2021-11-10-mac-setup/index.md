---
slug: setup
title: Macセットアップ
authors: [a2-tsuchiya]
tags: [Mac]
---

~~最低限これぐらいはやっとけ、~~お好みでどうぞ、というような内容です。

## *Mac*本体

### `fn`キーをデフォルトで有効にする

デバッグ時などに`fn`を押すことから解放されます。

`システム環境設定 > キーボード > F1,F2などのキーを...`にチェック

### 基本的なショートカット

- `Command + Space` | Spotlight Search
- `Command + Tab` | 起動しているアプリの切り替え
- `Ctrl + ↑ or ↓` | ウインドウの切り替え
- `(Fn) + F11` | デスクトップを表示/非表示
- `Option + Command + Space` | Finder を表示

## Homebrew

*Mac*用のパッケージ管理システムです。

CUI アプリ(`brew install go`とか)をコマンドからインストールできるようになります。

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

4. *homebrew-cask*をインストールする（任意）

GUI アプリ（Visual Studio とか Google Chrome）もコマンドからインストールできるようになります。

このアイコンをドラッグしてください、、みたいな件から解放されます。

```bash
$ brew install alfred
```

この*Homebrew*でガンガン入れていきます。

### 基本的な操作

- インストール

  ```zsh
  brew install <package>
  ```

- アンインストール

  ```zsh
  brew uninstall <package>
  ```

- インストール済アプリのリスト表示

  ```zsh
  brew list
  ```

## iTerm2

ターミナルのほぼ上位互換です。

1.  インストール

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

3. 背景を透過させる

   - `Preferences > Profiles > Transparency `で設定（50％オススメ）

<br/>

ターミナルさん、短いお付き合いでしたがありがとうございました m(\_ \_)m

### 基本的な操作

- `Command + t` | 新しいタブの作成
- `Command + w (control + d)` | タブの削除
- `Command + ←→ or 数字` | タブの移動
- `Command + f` | 検索
- `Command + +/-` | 拡大/縮小
- `Command + Enter` | フルスクリーン/解除
- `Command + shift + h` | クリップボードの履歴呼び出し

## zsh

*macOS Cattallina*以降は*zsh*なのでその前提で進めます。

### 準備

1. デフォルトシェルを確認

   ```bash
   $ echo $SHELL
   /bin/zsh
   ```

2. （なければ）設定ファイルを作成

   ```bash
   $ touch ~/.zshrc
   $ ls -a #確認
   ```

### 移動系

```bash title="~/.zshrc"
setopt no_beep
setopt auto_pushd
setopt pushd_ignore_dups
setopt auto_cd
```

<br/>

ご存知の方は読み飛ばして下さい。。

#### `auto_cd`

一致するディレクトリに`cd`なしで移動できる

```zsh
% ls ~
Applications Documents    Library      Music        Public
Desktop      Downloads    Movies       Pictures
# 通常は
% cd Documents
# のところを
% Documents
# で済む
```

#### `auto_pushd`

ディレクト移動時に自動で`pushd`する

そもそも、、

- `pushd` | カレントディレクトリへのパスをスタックに積む
- `popd` | スタックからパスを取り出し遷移する

  ```bash
  ~ % cd /tmp/scripts
  /tmp/scripts % pushd #現在のパスをスタックに積む
  /tmp/scripts % cd /path/to
  /path/to % popd #スタックから取り出す
  /tmp/scripts % #取り出したパスに遷移する
  ```

  この挙動を自動化します。

#### `pushd_ignore_dups`

重複するパスをスタックに積まない

### 履歴系

- `hist_ignore_dups` | 直前と同じコマンドは履歴に追加しない
- `share_history` | 他の zsh で履歴を共有する
- `inc_append_history` | 即座に履歴を保存する

  ```zsh title="~/.zshrc"
  setopt hist_ignore_dups
  setopt share_history
  setopt inc_append_history

  export HISTFILE=~/.zsh_history
  export HISTSIZE=10000
  export SAVEHIST=10000
  ```

### 設定を反映する

```bash
source ~/.zshrc
# or
exec zsh
```

### oh my zsh

zsh のプラグインマネージャです。プラグインで拡張したい方向けです。

使いたい方は個別に聞いてください。。

## Vim/NeoVim

*Vim*は最初から入っていますので、*NeoVim*を使いたい方向けです。

**NeoVim??**という方は[この辺り](https://zenn.dev/yano/articles/vim_frontend_development_2021)をどうぞ

1. インストール

   ```zsh
   nvim --version
   brew install neovim
   ```

2. エイリアス設定（NeoVim をデフォルトにする）

   ```zsh title="~/.zshrc"
   alias vi="nvim"
   alias vim="nvim"
   alias view="nvim -R
   ```

   - `vi/vim`と叩いても`nvim`を起動する
   - `view`と叩くと`nvim`を読み取りモードで起動する

3. コンフィグ設定

   ＊筆者の好みです、あしからず。

   ```zsh title="~/.config/nvim/init.vim"
   set shell=/bin/zsh              # コマンドはzshを使う
   set shiftwidth=4                # インデント幅
   set tabstop=4                   # タブに変換されるサイズ
   set expandtab                   # タブをスペースに変換する
   set textwidth=0                 # ワードラッピングなし
   set autoindent                  # 自動インデント（:set paste で解除）
   set hlsearch                    # 検索結果のハイライト
   set clipboard=unnamed           # クリップボードへ登録する
   set number                      # 行番号を表示
   inoremap <silent> jj <ESC>      # ESC を jj にする
   ```

### vim-plug

Vim のプラグインマネージャです。プラグインで拡張したい方向けです。

使いたい方は個別に聞いてください。。

## Tmux (terminal multiplexer)

画面分割とセッション管理をいい感じにしてくれます。

![Tmux](/img/blog/tmux-demo.png)

こういう事をやりたい方向けです。

### インストール

```zsh
% tmux -V
% brew install tmux
```

### 構造

- １セッションに複数ウインドウ作れる
- １ウインドウに複数ペイン作れる

:::info
上のイメージは３ウインドウ（_main_, _server_, _aws_）動いていて、<br/>
カレントウインドウで２ペインが動いている状態です。
:::

### 基本操作

- `tmux` | 起動
- `tmux ls` | セッション一覧
- `tmux kill-server` | tmux のシャットダウン
  - `exit`でも良い
- `Ctrl + b d` | デタッチ
- `tmux a (-t [session])` | アタッチ
  - セッションが 1 つならオプション引数は省略可
- `Ctrl + b s` | セッション一覧から選択
- `Ctrl + b t` | 時計を表示

:::tip prefix の変更
**Ctrl+b -> Ctrl+g** に変更（した方が使いやすい）

```zsh title=".tmux.conf"
unbind C-b
set -g prefix C-g
bind C-g send-prefix
```

:::

### ウインドウの操作

Prefix は`g`に変更している前提です。

- `Ctrl + g c` | 新規ウインドウ
- `Ctrl + g n` | 次のウインドウ
- `Ctrl + g p` | 前のウインドウ
- `Ctrl + g [n]` | [n]番目のウィンドウに移動
- `Ctrl + g &` | ウインドウを破棄する
- `Ctrl + g ,` | ウインドウの名前を変える

### ペインの移動

- `Ctrl + g \` | 横（左右）に分ける
  - (default) Ctrl + g %
- `Ctrl + g -` | 縦（上下）に分ける
  - (default) Ctrl + g "
- `Ctrl + g x` | ペイン破棄
  - Ctrl + d (通常の terminal の exit)でも OK
- `Ctrl + g z` | ペインの拡大/縮小
- `Ctrl + g o` | 次のペインに移動
- `Ctrl + g q -> [n]` | ペイン番号の表示から n に移動

:::tip 割り当てキーの変更
`%`と`"`は死ぬほど打ちにくいので、`\`と`-`に割り当てます

```zsh title=".tmux.conf"
bind \\ split-window -h
bind - split-window -v
```

:::

詳細は個別に聞いてください。。

## GitHub アカウント作成

割愛

## SSH Keys 作成

1. 新しいキーペアを作成する

   ```zsh
   $ ssh-keygen -C "your_name@prime-x.co.jp"
   ```

- 保存先はそのまま*Enter*（`~/.ssh`になります）
- パスフレーズは入力しましょう

:::info
パスフレーズは秘密鍵にアクセスするためのパスワードです。
:::

2. 暗号強度を確認

   ```zsh
   $ ssh-keygen -l -f ~/.ssh/id_rsa.pub
   3072 SHA256:************************* a2-tsuchiya@prime-x.co.jp (RSA)
   ```

   注）鍵長 2048 以上で暗号化方式が*RSA/ECDSA/Ed25519*であること

3. 公開鍵（id_rsa.pub）をクリップボードにコピー

   ```bash
   $ pbcopy < ~/.ssh/id_rsa.pub
   ```

4. GitHub に登録

   - `右上のSettings > SSH and GPG keys > 右上のNew SSH key`と遷移
   - *title*に好きな名前、*Key*にクリップボードの値を貼り付け
   - *Add SSH key*をクリック

5. 疎通確認

   ```zsh
   $ ssh -T git@github.com
   ```

   - フィンガープリントが表示されて、接続しますか？と聞かれるので（_yes_）
   - パスフレーズを入力
   - 以下のように表示されれば完了です。

   `Hi user_name! You've successfully authenticated, but GitHub does not provide shell access.`

6. *SSH*キーを`ssh-agent`に追加する

   ```bash
   $ ssh-add ~/.ssh/id_rsa
   ```

   毎回パスフレーズを入力するの面倒ですよね？省略しましょう。

   - パスフレーズを入力する
   - `ssh-add -l`で鍵が登録されていることを確認する

7. リポジトリをクローンしてみる

   ```bash
   $ git clone git@github:[user_name or org_name]/[favorite_repo].git
   ```

   パスフレーズ入力を求められずにクローンできれば成功です。お疲れ様でした。

## VSCode

好きなエディタ使えばいいですが、揃えてもいいかなと思います。。

```zsh
$ brew install visual-studio-code --cask
```

### Prettier

コードのフォーマッターです。

1. 拡張機能から`Pretteir`をインストール

2. *Prettier*設定ファイル作成

   ```zsh
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

   ```zsh
   $ mkdir -p .vscode/settings.json
   ```

5. 以下のように設定する

   ```json title="./.vscode/settings.json"
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode"
   }
   ```

   既定のフォーマッタを*Prettier*にし、ファイル保存時に自動整形します。

:::info
詳細はプロジェクトごとに決めてください。
:::

:::tip
プロジェクト、組織内のエディタを*VSCode*に統一すれば、設定を共有できます。
:::

## `nvm`

*Node.js*のバージョンマネージャです。

（すでにシェルの設定ファイルがある方は 3.までスキップしてください）

1. デフォルトシェルを確認

   ```zsh
   $ echo $SHELL
   /bin/zsh
   ```

2. 設定ファイルを作成

   ```zsh
   $ touch ~/.zshrc
   $ ls -a #確認
   ```

3. `nvm`インストール

   ```zsh
   $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.**.0/install.sh | bash
   ```

   念の為[公式](https://github.com/nvm-sh/nvm#install--update-script)でバージョンを確認してください。

4. `.zshrc`に次の行を追加

   ```zsh
   $ source ~/.nvm/nvm.sh
   ```

5. 端末を再起動するか`(exec $SHELL -l)`を実行する

6. インストール確認

   ```zsh
   $ nvm -v
   0.39.0
   ```

7. *Node.js*インストール

   ```zsh
   $ nvm ls-remote
   ...
   v16.13.0 (Latest LTS: Gallium)
   ...
   ```

:::info
無難に安定版（**_LTS_**）を選びましょう
:::

8. 安定板を選択して、インストール

   ```zsh
   $ nvm install v16.13.0
   ```

9. 使用するバージョンを決める

   ```zsh
   $ nvm use v16.13.0
   ```

:::info
`npm`は今日日の*Node.js*には同梱されているので、以下のコマンドで確認します。

```zsh
npm -v
8.1.0
```

:::

10. `yarn`を使いたい方はここでインストール

    ```zsh
    npm install -g yarn
    ```

## `pyenv`

*Python*のバージョンマネージャです。2 系 3 系の切り替えなどに。

1. `pyenv`インストール

   ```zsh
   $ brew update
   $ brew install pyenv
   ```

2. *PATH*を通す

   ```zsh
   export PYENV_ROOT="$HOME/.pyenv"
   export PATH="$PYENV_ROOT/bin:$PATH"
   echo 'eval "$(pyenv init --path)"' >> ~/.zshrc
   ```

3. バージョン確認

   ```zsh
   $ pyenv -v
   pyenv 2.2.0
   ```

4. *Python*インストール

   ```zsh
   # 全体
   $ pyenv global 3.9.7

   # ディレクトリのみ
   $ pyenv local 3.9.7
   ```

5. 端末を再起動するか`(exec $SHELL -l)`を実行する

6. バージョン確認

   ```zsh
   $ python -V
   Python 3.9.6

   $ pyenv versions
     system
   * 3.9.7 (set by /Users/[user_name]/.pyenv/version)
   ```

:::caution
3.6 系は **2021 年 12 月**に、3.7 系は **2023 年 6 月**にそれぞれ、
セキュリティ修正の提供が終了しますのでそれ以降のバージョンを選択しましょう。
:::

## _AWS CLI_

GUI でポチポチしたい方は不要ですが、CLI 経由じゃないと設定できないことも結構あります。

1. インストール

   ```zsh
   % brew install awscli
   ```

2. インストール確認

   ```zsh
   % which aws
   /opt/homebrew/bin/aws

   % aws --version
   aws-cli/2.4.16 Python/3.9.10 Darwin/21.0.1 source/arm64 prompt/off
   ```

3. 設定

   ```zsh
   % aws configure
   AWS Access Key ID [None]: ****************CQOX
   AWS Secret Access Key [None]: ************************PNrh
   Default region name [None]: ap-northeast-1
   Default output format [None]:
   ```

   - ユーザを使い分ける場合

     ```zsh
     % aws configure --profile your_account
     ```

4. 設定確認

   `~/.aws`に 2 つのファイルができます。

   ```zsh
   % cat ~/.aws/config
   [default]
   region = ap-northeast-1
   [profile your_account]
   region = ap-northeast-1
   ```

   ```
   % cat ~/.aws/credentials
   [default]
   aws_access_key_id = ****************CQOX
   aws_secret_access_key = ************************PNrh
   [your_account]
   aws_access_key_id = ****************CQOX
   aws_secret_access_key = ************************PNrh
   ```

5. 疎通確認

   好きなコマンド叩きましょう。

   ```zsh
   % aws iam list-users --profile your_account
   {
       "Users": [
           {
               "Path": "/",
               "UserName": "your_account",
               "UserId": "AIDAZCFQ3DAUNBVZ3XRFZ",
               "Arn": "arn:aws:iam::****4113****:user/your_account",
               "CreateDate": "2019-1-21T11:12:17+00:00"
           }
       ]
   }
   ```
