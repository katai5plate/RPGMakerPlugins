# プラグインリスト
## mv

### H2A_SSRemoteController

```
H2APG.SSRemote(イベントID,"A/B/C/D",true/false/null);
H2APG.SSRemote("文字列が含まれるイベント名のイベント","A/B/C/D",true/false/null);

第3引数がnullの場合は反転します。

このようにすると自分のセルフスイッチを操作できます。
H2APG.SSRemote(this._eventId,"A/B/C/D",true/false/null);

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/js/plugins/mv/H2A_SSRemoteController/dist/H2A_SSRemoteController.js)

### H2A_SetSwitchOn

```
Load Save IDに存在しないセーブデータIDを入力しないこと。

また、通常のロード時にスイッチはONになりません。

このプラグインはニューゲーム時にスイッチを切り替える時のために作ったプラグインのため、
もしタイトルスキップ関連でもっと高機能なプラグインが必要なら、
トリアコンタン氏の AutoLoad.js を使ったほうがいいかもしれません。


```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/js/plugins/mv/H2A_SetSwitchOn/dist/H2A_SetSwitchOn.js)
## mz

### H2A_AutoSaveAndTransfer

```
同一マップ間移動時に、
データのロードが発生しないようにします。

また、パラメーターで
オートセーブに関する挙動を設定できます。
その場合、「システム1」のオプションで
「オートセーブを有効化」する必要があります。

またプラグインコマンドを使用することで、
オートセーブを呼び出すことができます。

注意:
設定の優先度は以下のようになっています。
コモンイベントのオートセーブ ＞ 禁止スイッチ ＞ オートセーブ設定
禁止スイッチが ON の状態でもコモンイベントからオートセーブが可能で、
禁止スイッチが ON だとオートセーブ設定が all でもセーブされません。

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/js/plugins/mz/H2A_AutoSaveAndTransfer/dist/H2A_AutoSaveAndTransfer.js)

### H2A_DialogLoader

```
ダイアログスクリプトが書かれたテキストファイルを好きなタイミングで開いて実行します。

・使い方
1. プロジェクトの index.html があるフォルダに dialogs フォルダを追加する
2. dialogs フォルダにダイアログスクリプトが書かれたテキストファイルを置く
3. コマンドエディタでダイアログスクリプトを実行したいタイミングでプラグインコマンド「実行」を挿入

より詳しい使い方とリファレンス:
https://github.com/katai5plate/RPGMakerPlugins/blob/main/js/plugins/mz/H2A_DialogLoader/README.md

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/js/plugins/mz/H2A_DialogLoader/dist/H2A_DialogLoader.js)

### H2A_DontPauseWhenBlur

```
ツクール MZ から、ゲームをフォーカスしていない時に
ゲームが一時停止する仕様になりました。
しかしそれだとデバッグ時などで都合が悪いケースがありそうです。
このプラグインでは、その挙動を無効にし、
フォーカスしていない時でもゲームを一時停止しないようにします。

v2.0.0 から、VSCode 拡張の Live Server に対応しました。

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/js/plugins/mz/H2A_DontPauseWhenBlur/dist/H2A_DontPauseWhenBlur.js)

### H2A_ErrorWhenSlowNet

```
ゲーム起動～タイトル画面までの読み込みが指定の時間を越えると、
エラーメッセージを表示してゲームを中断します。
プラグインコマンドから、
読み込みにかかった時間を変数に代入することもできます。

注意:
ブラウザにゲームデータのキャッシュが残っている状態で、
ゲームを起動すると、回線の速さに関係なくロード時間が短縮します。
そのため、リロードするとエラーが表示されなくなることがあります。

参考:
基本的に 1 秒程度でタイトルまで読み込む事ができれば、
特に大きな問題なく快適にプレイすることができるはずです。
光ファイバー等の高速回線であれば 500 ミリ秒も可能だと思います。

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/js/plugins/mz/H2A_ErrorWhenSlowNet/dist/H2A_ErrorWhenSlowNet.js)

### H2A_FitScreenToTile

```
1.5.0 から、タイルサイズを変更できるようになりましたが、
画面のズーム率までは変わらないため、
そのままだと広大なマップにポツンと小さいマップが存在するような見た目になってしまい、
なんかコレジャナイ感があります。それを解決するプラグインです。

現在、17 x 13 のマップのみ対応しています。

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/js/plugins/mz/H2A_FitScreenToTile/dist/H2A_FitScreenToTile.js)

### H2A_ImageToPicture

```
[使い方]
1. 画像を設定せずに「ピクチャの表示」を設定する
2. その処理の直後にプラグインコマンド「ピクチャ変更」を実行
3. 指定した画像がピクチャとして変更される

[顔グラフィックを使用する例]
◆ピクチャの表示：#1, なし, 左上 (0,0), (100%,100%), 255, 通常
◆プラグインコマンド：H2A_ImageToPicture, ピクチャ変更
：　　　　　　　　　：番号 = 1
：　　　　　　　　　：画像 = faces/Nature
：　　　　　　　　　：インデックス = 4
：　　　　　　　　　：横分割 = 4
：　　　　　　　　　：縦分割 = 2

[Tips]
・すでに表示中のピクチャであっても変更可能です。

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/js/plugins/mz/H2A_ImageToPicture/dist/H2A_ImageToPicture.js)

### H2A_JapaneseErrors

```
window.Error を書き換え、特定のエラー文字列を日本語化します。
Error を実行するとスタックトレースの先頭行に
このプラグインが占有するのでご注意ください。
また、pixi.js などのコアスクリプト以外のエラーメッセージは翻訳されません。

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/js/plugins/mz/H2A_JapaneseErrors/dist/H2A_JapaneseErrors.js)

### H2A_RegionWalker

```
キャラクターがリージョンに沿って移動します。
真後ろには移動せず、前方から見て前・左・右にのみ動きます。

・「厳格モード」では、通行を妨げるタイルがあったり、
　ランダム歩行が無効なのに一本道ではない場合に、
　コンソールに警告を出したり、エラーでゲームを強制終了します。
・「ランダム歩行」では、一本道でない道に来た時、
　ランダムで方角を決定します。
・通常、行き止まりに到達して立ち止まった時は、
　終端のリージョンを踏んでいる状態になります。
　そのため、到達時にリージョンの外まで歩かせたい場合は
　「到着したら一歩前進」を有効化してください。
・プラグインコマンドの「スクリプト」は、上級者向け機能です。
  `ROUTE_MOVE_DOWN` `ROUTE_WAIT 60`
  `ROUTE_CHANGE_IMAGE "Actor1" 3`
  `ROUTE_PLAY_SE {"name":"Dog","pan":0,"pitch":100,"volume":90}`
  のように記述します。 (ROUTE_? arg1 arg2)
  ROUTE_ で始まる文は、rmmz_objects.js の
  processMoveCommand の定義を参照してください。
  ROUTE_ は省略しても構いません。 例: `WAIT 60`
  スペースで区切り、2 塊目からは JSON で値が評価されます。
  ROUTE_PLAY_SE のように JSON を引数に渡す場合はスペースを省いてください。

[注意]
・「移動完了まで待つ」場合、
　経路の途中に通行を妨げるキャライベント等があると、
　そのままゲームが先に進まなくなる可能性があります。

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/js/plugins/mz/H2A_RegionWalker/dist/H2A_RegionWalker.js)

### H2A_SkipTitle

```
タイトルをスキップし、
ニューゲームかコンティニューします。

モード説明:

- オートセーブ含む直前のセーブ ＞ ニューゲーム
オートセーブ含む全セーブデータのうち最新のものがロードされます。
セーブデータが見つからない場合はニューゲームになります。

- 直前の手動セーブ ＞ オートセーブ ＞ ニューゲーム
直前にユーザー操作によりセーブしたデータが見つかればそれがロードされます。
見つからない場合、オートセーブがロードされ、
それもなければニューゲームになります。

- オートセーブ ＞ 直前の手動セーブ ＞ ニューゲーム
オートセーブされたデータがあればそれがロードされます。
なければ、直前にユーザー操作によりセーブしたデータをロードします。
それもなければニューゲームになります

- オートセーブ ＞ ニューゲーム
オートセーブされたデータがあればそれがロードされます。
なければニューゲームになります。

- ニューゲーム
単純にニューゲームになります。

- 直前のセーブ
オートセーブ含む全セーブデータのうち最新のものがロードされます。
セーブデータが存在しない場合、エラーになります。

- 直前の手動セーブ
ユーザー操作によりセーブしたデータが見つかればそれがロードされます。
存在しない場合、エラーになります。

- オートセーブ
オートセーブされたデータがあればそれがロードされます。
存在しない場合、エラーになります。

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/js/plugins/mz/H2A_SkipTitle/dist/H2A_SkipTitle.js)