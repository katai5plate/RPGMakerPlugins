# 開発者向け

## プラグイン開発環境の仕様

### コマンド

- `npm run create [mv|mz] [pluginName]`: プラグインの新規作成
- `npm run watch [mv|mz] [pluginName]`: プラグイン開発モード
  - ファイルが保存されると自動でビルドが走る。
- `npm run watch-fm [mv|mz] [pluginName]`: プラグイン開発フラットモード
  - `plugins/js` に `*.ignore.js` としてビルド結果がコピーされる
  - プラグイン選択画面でフォルダが使えない MV 用
- `npm run clean-fm`: watch-fm で散らかったコピーを一掃する
- `npm run dev-mv [pluginName]`: MV 開発モード。
  - `protect` `watch-fm` が起動する
- `npm run dev-mz`: MZ 開発モード
  - `protect` が起動し、ファイルが変更されると `build-all` が走る
- `npm run protect`: `package.json` が書き換えられるのを防ぐ
- `npm run update`: 変更後にするべきビルド処理を一括実行
- `npm run build [mv|mz] [pluginName]`: プラグインのビルド
- `npm run build-all`: すべてのプラグインを一括ビルド
- `npm run gen-list`: プラグインリストを自動生成
- `npm run gen-api`: カタログページ用の JSON ファイルを出力する
- `npm run core-split`: コアスクリプトをクラスごとに分割
  - `./js/src` に出力される
  - VSCode 上で検索する場合は「含めるファイル」に `src/**` と入力する
- `npm run snap-pg [get|set] [name]`: `js/plugins.js` のスナップショットを撮る
  - `get` で取得、 `set` で適用。`{name}.snapshot.plugins.js` という名前で保存される
- `npm test`: CI 上で行われるテストが実行される
- `npm run dev-init`: 開発環境の構築に使う
- `npm run serve`: ポート 3333 でサーバーを立てる

### git-hooks

- コミット時...
  - package.json がツクールエディタによって上書きされているとエラー
- プッシュ時...
  - ビルドしたうえで dist 内のファイルが 2 つ以上あるとエラー
  - プラグインリストに変更があるのにコミットがないとエラー

### ディレクトリ構成

- `H2A_{PLUGIN_NAME}/`
  - `dist/`
    - `bundle.js`: 自動出力されたプラグイン(カタログページでファイル名を変更してダウンロードされる)
  - `src/`
    - `base.js`: テンプレートとなるコード
    - `{FILE_NAME}.js`: INCLUDE されるコード
    - `help.txt`: `@help` に設定される文章
    - `{LANGUAGE_NAME}.txt`: 各言語用の `@help` 文章
    - `meta.json`: コメントに変換されるアノテーション情報
    - `{LANGUAGE_NAME}.json`: 各言語用にマージされるアノテーション情報
  - `README.md`: カタログページで使用されるページ（なければカタログ側で自動生成）

### `index.js` の書き方

- INCLUDE 先で特定の書き方をした行は省略される
  - `/// <reference`
  - `//: コメント ://`
  - 行末尾に `/***__HIDDEN__***/`
  - `/***__HIDDEN-BEGIN__***/` ～ `/***__HIDDEN-END__***/`

```js
(function () {
  // このように書くことで、src/main.js の内容が挿入される。
  /***__INCLUDE="./main.js"__***/
})();
```

### `meta.json` の書き方

- デフォルトで付与されるアノテーション（上書き可）
  - `author`: Had2Apps
  - `target`: mz
  - `url`: このリポジトリの README かカタログページ

```
@help 末尾に対応バージョン情報とコピーライト文章が付与される

Copyright (c) {YEAR} {AUTHOR}
This software is released under the {LICENSE_NAME} License.
```

```js
{
  // ライセンステンプレート名（省略の場合はWTFPL）
  "_license": "MIT",
  // プラグインバージョン（省略・""の場合は無視）
  "_version": "",
  // 動作確認したコアバージョン（省略・""の場合は無視）
  "_support": "",
  // 指定した名前の txt, json があると、各外国語別に設定をマージする
  //（省略・[]の場合は無視）
  "_languages": ["en"],
  // _**, author, params, structs, help 以外は
  // ほとんど精査せずにそのまんまアノテーションにパースされる
  // 例: "key": "value" -> "@key value"
  "plugindesc": "プラグイン説明",
  "author": "作者名", // 省略した場合は Had2Apps となる
  "params": [
    // 以下はほとんど精査せずにそのまんまアノテーションにパースされる
    // 文字列型以外の値が入っている場合は JSON.stringify される
    {
      "param": "",
      "type": "",
      "desc": "",
      // "..." をキーにしても同じような事ができる(再起)
      "...": [
        { "option": "", "value": "" },
        { "option": "", "value": "" }
      ]
    }
  ],
  // commands は params とパース方法自体は同じだが、
  // ビルド時は params の後に組み込まれる
  "commands": [],
  "structs": {
    // ~struct~構造体名
    "構造体名": [
      // 以下はほとんど精査せずにそのまんまアノテーションにパースされる
      // 文字列型以外の値が入っている場合は JSON.stringify される
      {
        "param": "",
        "desc": "",
        "type": "",
        "default": ""
      }
    ]
  }
}
```

## 開発環境の構築方法

- 必要なもの
  - Git
  - Node.js
  - RPG ツクール MZ
  - RPG ツクール MV
  - コマンドプロンプトまたは VSCode
- 必要な知識
  - Git の使い方
  - GitHub の使い方
  - コマンドプロンプトの使い方
  - VSCode の使い方

1. まずこのリポジトリをクローンする
2. コマンドプロンプトでプロジェクトを開く
3. `npm i` を実行

### ゲームプロジェクトの配置方法

#### 自動で行う

1. ツクール MV とツクール MZ それぞれで新規作成プロジェクトを作る
2. `./_init/mv` に MV のプロジェクトの中身を  
   `.gitkeep` と同じ場所に `index.html` がある状態になるように置く。
3. `./_init/mz` に MZ のプロジェクトの中身を  
   `.gitkeep` と同じ場所に `index.html` がある状態になるように置く。
4. `npm run dev-init` を実行

#### 手動で行う

1. ツクール MV とツクール MZ それぞれで新規作成プロジェクトを作る
2. MV のプロジェクトのうち、`audio, data, fonts, icon, img, js, movies, Game.rpgproject` を  
   そのままルートディレクトリにコピーする
3. `data` を `data_mv` にリネームする
4. `img/system` の中にある `ButtonSet.png` を `ButtonSet_mv.png` にリネームする
5. `js` の中にある `main.js` を `main_mv.js` にリネームする
6. `js/libs` の中にある `pixi.js` を `pixi_mv.js` にリネームする
7. `js/plugins.js` は適当な名前にリネームしてバックアップを取っておく
8. MZ のプロジェクトのうち、`audio, css, data, effects, fonts, icon, img, js, movies, game.rmmzproject` を  
   そのままルートディレクトリにコピーする（上書きはどっちでもいい）

### 開発の始め方

詳しい説明は上述の「コマンド」を参照

- エディタを使う際は `npm run protect` を行い、package.json を守る
- プラグインを新規に作るときは `npm run create` を使う
- MV プラグインを開発するときは `npm run watch-fm` を使う
- MZ プラグインを開発するときは `npm run watch` を使う
- プラグイン設定のバックアップを取りたいときは `npm run snap-pg` を使う

## 俺用 TODO

- [x] プラグインの開発環境を構築する
  - [x] 開発環境のルールに沿って過去のプラグインを全バラする
- [x] 過去のリポジトリをアーカイブ化してこっちに誘導する
- [ ] Had2Apps.com にプラグインカタログページを増設する
  - GitHub API を使ってこのリポジトリを参照する

## 俺用 memo

```
\* @(.*?) (.*?)$
"$1": "$2",
```

## 俺用 LINK

- [型コンバーター](https://katai5plate.github.io/RPGMakerPlugins/tools/conv.html)

