/*:
 * @target MZ
 * @plugindesc ツクール側のエラーを日本語化します。
 * @author Had2Apps
 * @url https://github.com/katai5plate/RPGMZ-Plugins
 *
 * @help
 * window.Error を書き換え、特定のエラー文字列を日本語化します。
 * Error を実行するとスタックトレースの先頭行に
 * このプラグインが占有するのでご注意ください。
 * また、pixi.js などのコアスクリプト以外のエラーメッセージは翻訳されません。
 *
 * Copyright (c) 2021 Had2Apps
 * This software is released under the MIT License.
 *
 * 動作確認済コアバージョン: v1.3.2
 * プラグインバージョン: v2.0.0
 *
 */
(() => {
  window.Error = class extends Error {
    constructor() {
      const [errorMessage, ...rest] = arguments;
      const errorPattern = [
        {
          regex: /^This is a static class$/,
          after: "静的クラスを実行しています。",
        },
        {
          regex: /^Decryption error$/,
          after: "復号できませんでした。",
        },
        {
          regex: /^Object too deep$/,
          after: "オブジェクトが深すぎます。",
        },
        {
          regex: /^Your browser does not support (.*?)\.$/,
          after:
            "お使いのブラウザは ?? に非対応のため、ゲームを起動できませんでした。",
        },
        {
          regex: /^Failed to initialize graphics\.$/,
          after:
            "グラフィックの初期化に失敗しました。お使いのブラウザの ハードウェアアクセラレーション を ON にしていただくと解決する場合があります。",
        },
        {
          regex: /^Failed to load: (.*?)$/,
          after: "ロードに失敗しました: ??",
        },
        {
          regex: /^The map data is not available$/,
          after: "マップデータがありません。",
        },
        {
          regex: /^Common event calls exceeded the limit$/,
          after: "イベントの呼び出しが上限を超えています。",
        },
        {
          regex: /^ButtonSet image is too small$/,
          after: "ボタンセット画像が小さすぎます。",
        },
        {
          regex: /^Argument must be an? (.*?)$/,
          after: "引数は ?? でなければなりません。",
        },
        {
          regex: /^Player's starting position is not set$/,
          after: "プレイヤーの初期位置を設定してください。",
        },
        {
          regex: /^Method not found: (.*?)$/,
          after: "メソッドが見つかりません: ??",
        },
        {
          regex: /^Savefile not found$/,
          after: "セーブデータがありません。",
        },
      ].find(({ regex }) => regex.test(errorMessage));
      if (!errorPattern) return super(...arguments);
      const { regex, after } = errorPattern;
      const translatedErrorMessage = after.replace(
        "??",
        errorMessage.match(regex)[1]
      );
      return super(translatedErrorMessage, ...rest);
    }
  };
})();
