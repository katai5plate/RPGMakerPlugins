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
- `npm run build [mv|mz] [pluginName]`: プラグインのビルド
- `npm run build-all`: すべてのプラグインを一括ビルド
- `npm run gen-list`: プラグインリストを自動生成
- `npm run core-split`: コアスクリプトをクラスごとに分割
  - `./js/src` に出力される

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

- INCLUDE 先の `/// <reference` 行はビルド時は省略される
- INCLUDE 先で `//: コメント ://` というようにコメントを書くと、ビルド時省略される

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

## ゲームプロジェクトの配置方法

1. ツクール MV の新規プロジェクトを作る
2. そのうち、`audio, data, fonts, icon, img, js, movies, Game.rpgproject` を  
   そのままルートディレクトリにコピーする
3. `data` を `data_mv` にリネームする
4. `img/system` の中にある `ButtonSet.png` を `ButtonSet_mv.png` にリネームする
5. `js` の中にある `main.js` を `main_mv.js` にリネームする
6. `js/libs` の中にある `pixi.js` を `pixi_mv.js` にリネームする
7. `js/plugins.js` は適当な名前にリネームしてバックアップを取っておく
8. ツクール MZ の新規プロジェクトを作る
9. そのうち、`audio, css, data, effects, fonts, icon, js, movies, game.rmmzproject` を  
   そのままルートディレクトリにコピーする（上書きはどっちでもいい）

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
