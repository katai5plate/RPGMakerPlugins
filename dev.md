# 俺用ドキュメント

## TODO

- [ ] プラグインの開発環境を構築する
  - [ ] 開発環境のルールに沿って過去のプラグインを全バラする
- [ ] 過去のリポジトリをアーカイブ化してこっちに誘導する
- [ ] Had2Apps.com にプラグインカタログページを増設する
  - GitHub API を使ってこのリポジトリを参照する

## プラグイン開発環境の仕様

### ディレクトリ構成

- `H2A_{PLUGIN_NAME}/`
  - `dist/`
    - `bundle.js`: 自動出力されたプラグイン(カタログページでファイル名を変更してダウンロードされる)
  - `src/`
    - `base.js`: テンプレートとなるコード
    - `{FILE_NAME}.js`: INCLUDE されるコード
    - `help.txt`: `@help` に設定される文章
    - `meta.json`: コメントに変換されるアノテーション情報
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

```json
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

## memo

```
\* @(.*?) (.*?)$
"$1": "$2",
```
