# プラグインリスト
## mv

### H2A_FaceTemplate

```
パラメータに登録された顔グラフィックを使用して文章の表示を行うと、<br/>
１行目にキャラクターの名前が表示されるようになります。<br/>
<br/>
最初の１行を占領し、４行目を非表示にするため、<br/>
これを使用した文章は３行までにしてください。

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/plugins/mv/H2A_FaceTemplate/dist/H2A_FaceTemplate.js)

### H2A_PictMaster

```
動作確認：1.5.2<br/>
<br/>
※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※<br/>
※※　！注意！<br/>
※※　プロジェクトデータが一部破損する可能性があるので、<br/>
※※　必ずDataフォルダのバックアップを取ってください！<br/>
※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※<br/>
<br/>
このプラグインはスクリプトからピクチャを使用している人向けです。<br/>
<br/>
１．コンソールを開き、以下のスクリプトを入力し、ツクールを再起動する。<br/>
  H2A_PictMaster.inputCommon(ID);<br/>
　（ID：ピクチャリストを挿入したいコモンイベントID。空のIDを推奨。）<br/>
<br/>
２．指定したコモンイベントIDにリストが登録していれば完了。<br/>
　（これがあることで、「未使用ファイルを含まない」から溢れなくなる。）<br/>
<br/>
３．ピクチャをプリロードしたいタイミングで以下のスクリプトコマンドを実行。<br/>
  H2A_PictMaster.loadAll();

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/plugins/mv/H2A_PictMaster/dist/H2A_PictMaster.js)

### H2A_SetSwitchOn

```
Load Save IDに存在しないセーブデータIDを入力しないこと。<br/>
<br/>
また、通常のロード時にスイッチはONになりません。<br/>
<br/>
このプラグインはニューゲーム時にスイッチを切り替える時のために作ったプラグインのため、<br/>
もしタイトルスキップ関連でもっと高機能なプラグインが必要なら、<br/>
トリアコンタン氏の AutoLoad.js を使ったほうがいいかもしれません。<br/>


```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/plugins/mv/H2A_SetSwitchOn/dist/H2A_SetSwitchOn.js)

### H2A_SSRemoteController

```
H2APG.SSRemote(イベントID,"A/B/C/D",true/false/null);<br/>
H2APG.SSRemote("文字列が含まれるイベント名のイベント","A/B/C/D",true/false/null);<br/>
<br/>
第3引数がnullの場合は反転します。<br/>
<br/>
このようにすると自分のセルフスイッチを操作できます。<br/>
H2APG.SSRemote(this._eventId,"A/B/C/D",true/false/null);

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/plugins/mv/H2A_SSRemoteController/dist/H2A_SSRemoteController.js)

### H2A_UserPerspMes

```
主にメッセージウィンドウの読み易さを改善するプラグインです。<br/>
<br/>
----------------------------------------------------------------<br/>
■ OPERABILITY<br/>
主に読み飛ばし防止のための操作性改善を行います。<br/>
通常の「文章の表示」コマンドを対象としています。<br/>
<br/>
・Fast Type<br/>
メッセージウィンドウの連打や長押しによる早送りの挙動を変更します。<br/>
<br/>
通常通り<br/>
　→デフォルトです。<br/>
トリガー入力でページ送り<br/>
　→キーを押しっぱなしで次のページに飛ばないようにします。<br/>
瞬間表示無効<br/>
　→文章を表示し切る前にキーを押しても一気に表示されないようにします。<br/>
瞬間表示無効・トリガーでページ送り<br/>
　→1と2を同時に設定します。一番読み飛ばしの心配がない設定です。<br/>
<br/>
・Fast Type Value ID<br/>
途中でFast Typeを変更したい場合は、<br/>
ここで変数を設定して、設定番号を代入してください。<br/>
（注意：これを設定すると、「Fast Type」は機能しなくなります。）<br/>
<br/>
0：通常通り<br/>
1：トリガー入力でページ送り<br/>
2：瞬間表示無効<br/>
3：瞬間表示無効・トリガーでページ送り<br/>
<br/>
・Pause Speed<br/>
文章が完全に表示し終わった際に、<br/>
次のページを見たり、閉じるなどの操作を受け付けるまでの時間を指定します。<br/>
<br/>
・Fast Key<br/>
他のキー操作によって通常の早送りができるようにします。<br/>
（テキスト欄にリスト外の使用可能なキーコードを入力して使うこともできます。）<br/>
<br/>
----------------------------------------------------------------<br/>
■ MESSAGE DECORATOR<br/>
各行の先頭と最後に、任意の文字列を入れることができます。<br/>
例えば必ず最初の行にキャラクター名を書く場合などに便利です。<br/>
<br/>
・Enable Mes Decorator<br/>
有効にするとこの機能を使う事が出来ます。<br/>
<br/>
・MD Editor<br/>
各行の先頭と最後に、どんな文字列を入れるかを設定します。特殊文字も使用できます。<br/>
1： 1 行目の 先頭<br/>
2： 1 行目の 最後<br/>
3： 2 行目の 先頭<br/>
4： 2 行目の 最後<br/>
5： 3 行目の 先頭<br/>
6： 3 行目の 最後<br/>
7： 4 行目の 先頭<br/>
8： 5 行目の 最後<br/>
「null」とだけ書くことで、空欄として設定することができます。<br/>
要素数が8個以下の場合、他の部分は空欄として処理されます。<br/>
9以降の要素は使われませんので、メモなどに活用するのもOKです。<br/>
<br/>
・上級者向けの使い方<br/>
MD Editorで設定した内容は「H2APG.UserPerspMes.setMesDec」関数で変更できます。<br/>
なので途中で変更したい場合は、<br/>
スクリプトコマンドで以下のように設定することで実現することができます。<br/>
ただし、セーブデータには変更が記録されませんのでご注意ください。<br/>
////////////////////////////////<br/>
H2APG.UserPerspMes.setMesDec([<br/>
  "", // 1 行目の 先頭<br/>
  "", // 1 行目の 最後<br/>
  "", // 2 行目の 先頭<br/>
  "", // 2 行目の 最後<br/>
  "", // 3 行目の 先頭<br/>
  "", // 3 行目の 最後<br/>
  "", // 4 行目の 先頭<br/>
  ""  // 4 行目の 最後<br/>
]);<br/>
////////////////////////////////<br/>
<br/>
プラグインのパラメータ設定画面での設定に戻したい場合は<br/>
////////////////////////////////<br/>
H2APG.UserPerspMes.defMesDec();<br/>
////////////////////////////////<br/>
を実行してください。<br/>
<br/>
また、配列「H2APG.UserPerspMes.mesDecorator」に直接書き込むこともできますが、<br/>
あまり推奨しません。<br/>
<br/>
使い方の例としては、<br/>
台詞用・立て看板用・イベント用など用途別に設定したスクリプトコマンドを<br/>
コモンイベントにそれぞれ登録しておき、<br/>
必要なシーンで会話等が始まる直前に呼び出すといった方法がお勧めです。<br/>


```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/plugins/mv/H2A_UserPerspMes/dist/H2A_UserPerspMes.js),## mz

### H2A_AutoSaveAndTransfer

```
同一マップ間移動時に、<br/>
データのロードが発生しないようにします。<br/>
<br/>
また、パラメーターで<br/>
オートセーブに関する挙動を設定できます。<br/>
その場合、「システム1」のオプションで<br/>
「オートセーブを有効化」する必要があります。<br/>
<br/>
またプラグインコマンドを使用することで、<br/>
オートセーブを呼び出すことができます。<br/>
<br/>
注意:<br/>
設定の優先度は以下のようになっています。<br/>
コモンイベントのオートセーブ ＞ 禁止スイッチ ＞ オートセーブ設定<br/>
禁止スイッチが ON の状態でもコモンイベントからオートセーブが可能で、<br/>
禁止スイッチが ON だとオートセーブ設定が all でもセーブされません。

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/plugins/mz/H2A_AutoSaveAndTransfer/dist/H2A_AutoSaveAndTransfer.js)

### H2A_DialogLoader

```
ダイアログスクリプトが書かれたテキストファイルを好きなタイミングで開いて実行します。<br/>
<br/>
・使い方<br/>
1. プロジェクトの index.html があるフォルダに dialogs フォルダを追加する<br/>
2. dialogs フォルダにダイアログスクリプトが書かれたテキストファイルを置く<br/>
3. コマンドエディタでダイアログスクリプトを実行したいタイミングでプラグインコマンド「実行」を挿入<br/>
<br/>
より詳しい使い方とリファレンスはプラグインのホームページを確認してください。

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/plugins/mz/H2A_DialogLoader/dist/H2A_DialogLoader.js)

### H2A_DontPauseWhenBlur

```
ツクール MZ から、ゲームをフォーカスしていない時に<br/>
ゲームが一時停止する仕様になりました。<br/>
しかしそれだとデバッグ時などで都合が悪いケースがありそうです。<br/>
このプラグインでは、その挙動を無効にし、<br/>
フォーカスしていない時でもゲームを一時停止しないようにします。<br/>
<br/>
v2.0.0 から、VSCode 拡張の Live Server に対応しました。

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/plugins/mz/H2A_DontPauseWhenBlur/dist/H2A_DontPauseWhenBlur.js)

### H2A_ErrorWhenSlowNet

```
ゲーム起動～タイトル画面までの読み込みが指定の時間を越えると、<br/>
エラーメッセージを表示してゲームを中断します。<br/>
プラグインコマンドから、<br/>
読み込みにかかった時間を変数に代入することもできます。<br/>
<br/>
注意:<br/>
ブラウザにゲームデータのキャッシュが残っている状態で、<br/>
ゲームを起動すると、回線の速さに関係なくロード時間が短縮します。<br/>
そのため、リロードするとエラーが表示されなくなることがあります。<br/>
<br/>
参考:<br/>
基本的に 1 秒程度でタイトルまで読み込む事ができれば、<br/>
特に大きな問題なく快適にプレイすることができるはずです。<br/>
光ファイバー等の高速回線であれば 500 ミリ秒も可能だと思います。

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/plugins/mz/H2A_ErrorWhenSlowNet/dist/H2A_ErrorWhenSlowNet.js)

### H2A_ImageToPicture

```
[使い方]<br/>
1. 画像を設定せずに「ピクチャの表示」を設定する<br/>
2. その処理の直後にプラグインコマンド「ピクチャ変更」を実行<br/>
3. 指定した画像がピクチャとして変更される<br/>
<br/>
[顔グラフィックを使用する例]<br/>
◆ピクチャの表示：#1, なし, 左上 (0,0), (100%,100%), 255, 通常<br/>
◆プラグインコマンド：H2A_ImageToPicture, ピクチャ変更<br/>
：　　　　　　　　　：番号 = 1<br/>
：　　　　　　　　　：画像 = faces/Nature<br/>
：　　　　　　　　　：インデックス = 4<br/>
：　　　　　　　　　：横分割 = 4<br/>
：　　　　　　　　　：縦分割 = 2<br/>
<br/>
[Tips]<br/>
・すでに表示中のピクチャであっても変更可能です。

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/plugins/mz/H2A_ImageToPicture/dist/H2A_ImageToPicture.js)

### H2A_JapaneseErrors

```
window.Error を書き換え、特定のエラー文字列を日本語化します。<br/>
Error を実行するとスタックトレースの先頭行に<br/>
このプラグインが占有するのでご注意ください。<br/>
また、pixi.js などのコアスクリプト以外のエラーメッセージは翻訳されません。

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/plugins/mz/H2A_JapaneseErrors/dist/H2A_JapaneseErrors.js)

### H2A_RegionWalker

```
キャラクターがリージョンに沿って移動します。<br/>
真後ろには移動せず、前方から見て前・左・右にのみ動きます。<br/>
<br/>
・「厳格モード」では、通行を妨げるタイルがあったり、<br/>
　ランダム歩行が無効なのに一本道ではない場合に、<br/>
　コンソールに警告を出したり、エラーでゲームを強制終了します。<br/>
・「ランダム歩行」では、一本道でない道に来た時、<br/>
　ランダムで方角を決定します。<br/>
・通常、行き止まりに到達して立ち止まった時は、<br/>
　終端のリージョンを踏んでいる状態になります。<br/>
　そのため、到達時にリージョンの外まで歩かせたい場合は<br/>
　「到着したら一歩前進」を有効化してください。<br/>
・プラグインコマンドの「スクリプト」は、上級者向け機能です。<br/>
  `ROUTE_MOVE_DOWN` `ROUTE_WAIT 60`<br/>
  `ROUTE_CHANGE_IMAGE "Actor1" 3`<br/>
  `ROUTE_PLAY_SE {"name":"Dog","pan":0,"pitch":100,"volume":90}`<br/>
  のように記述します。 (ROUTE_? arg1 arg2)<br/>
  ROUTE_ で始まる文は、rmmz_objects.js の<br/>
  processMoveCommand の定義を参照してください。<br/>
  ROUTE_ は省略しても構いません。 例: `WAIT 60`<br/>
  スペースで区切り、2 塊目からは JSON で値が評価されます。<br/>
  ROUTE_PLAY_SE のように JSON を引数に渡す場合はスペースを省いてください。<br/>
<br/>
[注意]<br/>
・「移動完了まで待つ」場合、<br/>
　経路の途中に通行を妨げるキャライベント等があると、<br/>
　そのままゲームが先に進まなくなる可能性があります。

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/plugins/mz/H2A_RegionWalker/dist/H2A_RegionWalker.js)

### H2A_SkipTitle

```
タイトルをスキップし、<br/>
ニューゲームかコンティニューします。<br/>
<br/>
モード説明:<br/>
<br/>
- オートセーブ含む直前のセーブ ＞ ニューゲーム<br/>
オートセーブ含む全セーブデータのうち最新のものがロードされます。<br/>
セーブデータが見つからない場合はニューゲームになります。<br/>
<br/>
- 直前の手動セーブ ＞ オートセーブ ＞ ニューゲーム<br/>
直前にユーザー操作によりセーブしたデータが見つかればそれがロードされます。<br/>
見つからない場合、オートセーブがロードされ、<br/>
それもなければニューゲームになります。<br/>
<br/>
- オートセーブ ＞ 直前の手動セーブ ＞ ニューゲーム<br/>
オートセーブされたデータがあればそれがロードされます。<br/>
なければ、直前にユーザー操作によりセーブしたデータをロードします。<br/>
それもなければニューゲームになります<br/>
<br/>
- オートセーブ ＞ ニューゲーム<br/>
オートセーブされたデータがあればそれがロードされます。<br/>
なければニューゲームになります。<br/>
<br/>
- ニューゲーム<br/>
単純にニューゲームになります。<br/>
<br/>
- 直前のセーブ<br/>
オートセーブ含む全セーブデータのうち最新のものがロードされます。<br/>
セーブデータが存在しない場合、エラーになります。<br/>
<br/>
- 直前の手動セーブ<br/>
ユーザー操作によりセーブしたデータが見つかればそれがロードされます。<br/>
存在しない場合、エラーになります。<br/>
<br/>
- オートセーブ<br/>
オートセーブされたデータがあればそれがロードされます。<br/>
存在しない場合、エラーになります。

```
- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/plugins/mz/H2A_SkipTitle/dist/H2A_SkipTitle.js)