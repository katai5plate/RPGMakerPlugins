/*:ja
 * @plugindesc [実験作] 音楽と効果音を ZzFX で鳴らします
 *
 *   @base zzfx
 *
 *   @base zzfxm.min
 *
 * @target MZ
 * @author Had2Apps
 * @url https://github.com/katai5plate/RPGMakerPlugins
 *
 * @param _volumeBoost
 * @text 音量ブースト
 * @desc 音量が全体的に小さい時や大きい時に調節する％
 * @type number
 * @min 0
 * @max 500
 * @default 100
 *
 * @param _staticSe
 * @text システムSE設定
 * @type struct<ss>
 * @default {"_cursor":"[2.63,,107,,.01,.01,3,.21,,,,,.18,,390,,.36,.61,.01]","_decision":"[1.15,,1190,.02,.06,.13,1,1.32,,1.1,-219,.01,.01,,,,,.65,,.13]","_cancel":"[2.36,,391,.01,.02,.03,1,1.94,4.9,.6,,,,,26,.1,.11,.6,.02]","_buzzer":"[,,881,.02,.05,.13,1,.5,9.5,2.9,-26,.05,,,48,,,.45,.03,.05]","_equip":"[1.55,,313,.01,.06,.19,1,.01,,,615,.1,,,,.1,.03,.8,.01,.18]","_save":"[,,1600,.01,.04,.19,2,1.34,,,240,.04,,,,,,.86,.04]","_load":"[,,1600,.01,.04,.19,2,1.34,,,240,.04,,,,,,.86,.04]","_battle":"[1.02,,7,.07,.07,.42,2,1.27,8.3,.7,,,,,12,.1,,.65,.07,.18]","_run":"[,,414,.01,.08,.05,4,.45,-9.7,-1.3,,,,.5,-101,.2,.25,.7,.08]","_enemyAttack":"[1.95,,345,.01,.07,,3,1.4,-1.7,,,,.18,1.8,,,.13,.52,.07]","_enemyDamage":"[,,457,.02,.03,.19,3,1.37,-9.6,,,,,1.2,-8.5,.2,,.87,.05,.07]","_enemyCollapse":"[2,,490,.02,.09,.07,3,1.25,-4.9,-0.7,,,,,,.3,.18,.65,.02,.27]","_bossCollapse1":"[1.09,,204,,1,1,4,.43,.1,.8,,,,,,.3,,.44,.04,.31]","_bossCollapse2":"[1.01,,271,.01,1,1,,.53,-3.2,,,,,1,126,.4,,.78,.06,.27]","_partyDamage":"[1.39,,308,.01,.06,.06,4,2.51,.6,,,,.1,1.6,310,,.08,.94,.09]","_partyCollapse":"[2.04,,767,.04,.2,.06,2,.43,,,-370,.2,.26,,,,.45,.86,.14,.38]","_recovery":"[1.22,,574,.1,.18,.01,3,2.58,8.5,,,,.18,,,,.02,.95,.03,.3]"}
 *
 * @command playSongFromFile
 * @text BGMを再生
 *
 *   @arg _name
 *   @text 使用する JS ファイル名
 *   @type string
 *
 *   @arg _isLoop
 *   @text ループするか
 *   @type boolean
 *   @default true
 *
 *   @arg _volume
 *   @text 音量
 *   @type number
 *   @min 0
 *   @max 100
 *   @default 90
 *
 * @command playSoundFromFile
 * @text SEを再生
 *
 *   @arg _name
 *   @text sounds.json に設定された、使用する音の名前
 *   @type string
 *
 *   @arg _volume
 *   @text 音量
 *   @type number
 *   @min 0
 *   @max 100
 *   @default 90
 *
 * @help
 * ※このプラグインは実験的なものです。
 * 　メモリリークやクラッシュなど、何か問題が発生しても、一切責任を取りません。
 * 　自己責任で使用してください。
 *
 * [使う準備]
 * 1. 前提ライブラリをダウンロードし、js/plugins/ に追加する
 *
 * zzfx.js
 * https://raw.githubusercontent.com/keithclark/ZzFXM/cb07fa9ca36aefd67a0c8c656d2958b62f8ed9fe/zzfx.js
 * zzfxm.min.js
 * https://raw.githubusercontent.com/keithclark/ZzFXM/cb07fa9ca36aefd67a0c8c656d2958b62f8ed9fe/zzfxm.min.js
 *
 * 2. プラグイン設定で、このプラグインの上に2つの前提ライブラリを設置する
 *
 * 例:
 * [ON] zzfx
 * [ON] zzfxm.min
 * [ON] H2A_ZzFXPlayer
 *
 * 3. 音楽作りと音作りをする
 *
 * 音楽作りはこのサイトで行う
 * https://keithclark.github.io/ZzFXM/tracker/
 * 作った音楽は左上の File -> Save にて JS ファイルでダウンロードできる。
 *
 * 音作りはこのサイトで行う。
 * https://killedbyapixel.github.io/ZzFX/
 * 作った音は画面下部の「ZzFX JavaScript (Use this code to play the sound)」の部分に
 * コードが生成されるので、[] で囲まれた部分を使用する。
 *
 * 4. zzfx/ に ZzFXM Tracker で作った曲の JS ファイルを置く
 * index.html と同じフォルダに zzfx/ を追加してその中に入れる。
 * 未使用素材削除機能は使えないので注意。
 *
 * 5. zzfx/sound.json にサウンドボードを置く
 * zzfx/ フォルダの中に JSON ファイルを置き、以下のように書く。
 * {
 *   "音の名前1": "[,,126,,.05,.08,1,.07,-13,-2.6,,,,,,,,.73,.06]",
 *   "音の名前2": "[1.32,,118,.11,.18,.02,3,.41,25,40,,,.09,,,,.19,,.03]",
 *   "音の名前3": "[,,441,.02,.14,.3,,.47,,.6,-195,.05,.09,,,.1,,.66,.1]"
 * }
 *
 * [使い方]
 *
 * プラグインコマンドを使ってください。
 * 曲を止めたい時は BGM の時と同様に BGM を無音にしてください。
 *
 * スクリプトやプラグインから実行したい場合は、
 * $zfx というグローバル変数が用意されているので、
 * そこからアクセスしてください。
 *
 * 例:
 * $zfx.playSound(
 *   // 音データ
 *   [,,126,,.05,.08,1,.07,-13,-2.6,,,,,,,,.73,.06],
 *   // 音量 50%
 *   0.5
 * )
 * $zfx.playSoundFromFile(
 *   // zzfx/sounds.json の音名
 *   "音の名前1",
 *   // 音量 50%
 *   0.5
 * )
 * $zfx.stopSound()
 * $zfx.playSong(
 *   // 譜面データ
 *   songData,
 *   // ループするか
 *   true,
 *   // 音量 50%
 *   0.5
 * )
 * $zfx.playSongFromFile(
 *   // ファイル名(拡張子抜き)
 *   "MyNewSong",
 *   // ループするか
 *   true,
 *   // 音量 50%
 *   0.5
 * )
 * $zfx.stopSong()
 *
 * [プラグインパラメーター:システムSE設定]
 *
 * データベース -> システム1 -> 効果音 にて設定が OFF になっている効果音は、
 * ここで設定した音に置き換わります。
 *
 * [Tips]
 *
 * - 音データ単体で音量を変更したい場合は、配列の最初の値を変更すれば変えられます。
 * 例1: [1.23,,107,,.01,.01,3,.21,,,,,.18,,390,,.36,.61,.01]
 *        ↓
 *      [2.34,,107,,.01,.01,3,.21,,,,,.18,,390,,.36,.61,.01]
 * 例2: [,,107,,.01,.01,3,.21,,,,,.18,,390,,.36,.61,.01]
 *        ↓
 *      [1.23,,107,,.01,.01,3,.21,,,,,.18,,390,,.36,.61,.01]
 *
 * Copyright (c) 2022 Had2Apps
 * This software is released under the MIT License.
 *
 * Version: v0.2.0-EXP
 * RPG Maker MZ Version: v1.5.0
 */
/*~struct~ss:ja
 * @param _cursor
 * @desc カーソル
 * @type string
 *
 * @param _decision
 * @desc 決定
 * @type string
 *
 * @param _cancel
 * @desc キャンセル
 * @type string
 *
 * @param _buzzer
 * @desc ブザー
 * @type string
 *
 * @param _equip
 * @desc 装備
 * @type string
 *
 * @param _save
 * @desc セーブ
 * @type string
 *
 * @param _load
 * @desc ロード
 * @type string
 *
 * @param _battle
 * @desc 戦闘開始
 * @type string
 *
 * @param _run
 * @desc 逃走
 * @type string
 *
 * @param _enemyAttack
 * @desc 敵攻撃
 * @type string
 *
 * @param _enemyDamage
 * @desc 敵ダメージ
 * @type string
 *
 * @param _enemyCollapse
 * @desc 敵消滅
 * @type string
 *
 * @param _bossCollapse1
 * @desc ボス消滅1
 * @type string
 *
 * @param _bossCollapse2
 * @desc ボス消滅2
 * @type string
 *
 * @param _partyDamage
 * @desc 味方ダメージ
 * @type string
 *
 * @param _partyCollapse
 * @desc 味方戦闘不能
 * @type string
 *
 * @param _recovery
 * @desc 回復
 * @type string
 *
 */
(() => {
  /*========== ../../../_templates/pluginName.js ==========*/
  const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

  /*========== ./main.js ==========*/

  const { _staticSe, _volumeBoost } = PluginManager.parameters(pluginName);

  const STATICS_KEYS = [
    "_cursor",
    "_decision",
    "_cancel",
    "_buzzer",
    "_equip",
    "_save",
    "_load",
    "_battle",
    "_run",
    "_enemyAttack",
    "_enemyDamage",
    "_enemyCollapse",
    "_bossCollapse1",
    "_bossCollapse2",
    "_partyDamage",
    "_partyCollapse",
    "_recovery",
  ];

  class H2A_ZzFX {
    constructor() {
      this.bgmBuffer = null;
      this.soundGainNode = this.getContext().createGain();
      this.soundGainNode.connect(this.getContext().destination);
      this.songGainNode = this.getContext().createGain();
      this.songGainNode.connect(this.getContext().destination);
      this.soundVolume = 1;
      this.songVolume = 1;
      this.staticSounds = STATICS_KEYS.map((key) => {
        const value = JSON.parse(_staticSe)[key];
        if (!this.checkSoundText(value)) {
          console.warn("読み取れないパラメーターがあります:", key, value);
          return "null";
        }
        return value;
      });
      this.soundboard = {};
      this.volumeBoost = (+_volumeBoost || 100) / 100;
    }
    checkSoundText(code) {
      return !/^\[[\d.,]+$\]/.test(code);
    }
    getStaticSounds(i) {
      return eval(this.staticSounds[i]);
    }
    getContext() {
      return window.zzfxX;
    }
    setSongVolume(volume) {
      this.songVolume = volume;
      this.updateGain();
    }
    setSoundVolume(volume) {
      this.soundVolume = volume;
      this.updateGain();
    }
    getCalculatedSongVolume() {
      return (
        this.songVolume *
        (AudioManager.bgmVolume / 100) *
        WebAudio._masterVolume
      );
    }
    getCalculatedSoundVolume() {
      return (
        this.soundVolume *
        (AudioManager.seVolume / 100) *
        WebAudio._masterVolume
      );
    }
    updateGain() {
      // 元の音量値が 0 のため、-1 が消音値, this.volumeBoost が最大
      this.songGainNode.gain.value =
        -1 + this.getCalculatedSongVolume() * this.volumeBoost;
      this.soundGainNode.gain.value =
        -1 + this.getCalculatedSoundVolume() * this.volumeBoost;
    }
    playSong(songData, isLoop, volume = this.songVolume || window.zzfxV) {
      if (this.bgmBuffer) {
        this.stopSong();
      }
      this.setSongVolume(volume);
      this.bgmBuffer = window.zzfxM(...songData);
      this.bgmNode = window.zzfxP(...this.bgmBuffer);
      this.bgmNode.loop = !!isLoop;
      this.bgmNode.connect(this.songGainNode);
    }
    async playSongFromFile(fileName, isLoop, volume) {
      try {
        this.playSong(
          eval(await (await fetch("./zzfx/" + fileName + ".js")).text()),
          isLoop,
          volume
        );
      } catch (error) {
        console.warn("ファイルが見つかりません:", fileName);
      }
    }
    playSound(soundData, volume = this.soundVolume || window.zzfxV) {
      if (soundData === null) return;
      const [dataVolume = 1, ...rest] = soundData;
      this.setSoundVolume((dataVolume * volume) / dataVolume);
      this.seBuffer = window.zzfxG(
        ...[this.getCalculatedSoundVolume() * this.volumeBoost, ...rest]
      );
      this.seNode = window.zzfxP(this.seBuffer);
      this.seNode.connect(this.soundGainNode);
    }
    async playSoundFromFile(soundName, volume) {
      if (Object.keys(this.soundboard).length === 0) {
        this.soundboard = await (await fetch("./zzfx/sounds.json")).json();
      }
      const text = this.soundboard[soundName];
      if (this.checkSoundText(text)) {
        this.playSound(eval(text), volume);
      } else {
        console.warn("読み取れないパラメーターがあります:", soundName, text);
      }
    }
    stopSong() {
      this.bgmNode?.stop();
      this.bgmBuffer = null;
    }
    stopSound() {
      this.seNode?.stop();
      this.seBuffer = null;
    }
  }
  $zfx = new H2A_ZzFX();

  // オフったら、こっちもオフるようにする
  const stopBgm = AudioManager.stopBgm;
  AudioManager.stopBgm = function () {
    stopBgm.apply(this);
    $zfx.stopSong();
  };
  const stopSe = AudioManager.stopSe;
  AudioManager.stopSe = function () {
    stopSe.apply(this);
    $zfx.stopSound();
  };
  // BGM設定されたら、こっちを消すようにする
  const playBgm = AudioManager.playBgm;
  AudioManager.playBgm = function () {
    $zfx.stopSong();
    playBgm.apply(this, arguments);
  };
  // 音量設定が変更されたらSong側も更新する
  const resetWebAudioVolume = WebAudio._resetVolume;
  WebAudio._resetVolume = function () {
    resetWebAudioVolume.apply(this);
    $zfx.updateGain();
  };
  const updateBgmParameters = AudioManager.updateBgmParameters;
  AudioManager.updateBgmParameters = function (bgm) {
    updateBgmParameters.apply(this, arguments);
    $zfx.updateGain();
  };
  const updateSeParameters = AudioManager.updateSeParameters;
  AudioManager.updateSeParameters = function (se) {
    updateSeParameters.apply(this, arguments);
    $zfx.updateGain();
  };
  // DB効果音設定を置換する
  SoundManager.playSystemSound = function (n) {
    if ($dataSystem) {
      if ($dataSystem.sounds[n].name) {
        AudioManager.playStaticSe($dataSystem.sounds[n]);
      } else {
        $zfx.playSound($zfx.getStaticSounds(n));
      }
    }
  };

  // プラグインコマンド
  PluginManager.registerCommand(
    pluginName,
    "playSongFromFile",
    function ({ _name, _isLoop, _volume }) {
      $zfx.playSongFromFile(_name, _isLoop === "true", +_volume / 100);
    }
  );
  PluginManager.registerCommand(
    pluginName,
    "playSoundFromFile",
    function ({ _name, _volume }) {
      $zfx.playSoundFromFile(_name, +_volume / 100);
    }
  );
})();
