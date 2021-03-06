/*:ja
 * @plugindesc [実験作] MIDI を再生できるようにします
 *
 *   @base smfplayer.min
 *
 *   @base sf2synth.min
 *
 * @target MZ
 * @author Had2Apps
 * @url https://github.com/katai5plate/RPGMakerPlugins
 *
 * @param _fontName
 * @text 使用するサウンドフォント名
 * @type string
 * @default A320U
 *
 * @command play
 * @text 再生
 *
 *   @arg _name
 *   @text 使用する MIDI ファイル名
 *   @type string
 *
 *   @arg _volume
 *   @text 音量
 *   @type number
 *   @min 0
 *   @max 100
 *   @default 90
 *
 * @command stop
 * @text 停止
 *
 * @help
 * ※このプラグインは実験的なものです。
 * 　メモリリークやクラッシュなど、何か問題が発生しても、一切責任を取りません。
 * 　自己責任で使用してください。
 *
 * [使う準備]
 * 1. 前提ライブラリをダウンロードし、js/plugins/ に追加する
 *
 * smfplayer.min.js
 * https://raw.githubusercontent.com/gree/smfplayer.js/5a1124afcf93a65e1e3f5ad9b7d8531a57a895c2/bin/smfplayer.min.js
 * sf2synth.min.js
 * https://raw.githubusercontent.com/gree/sf2synth.js/3c792f42aded69560c0bac8679718ff059e000d7/bin/sf2synth.min.js
 *
 * 2. プラグイン設定で、このプラグインの上に2つの前提ライブラリを設置する
 *
 * 例:
 * [ON] smfplayer.min
 * [ON] sf2synth.min
 * [ON] H2A_MIDIPlayer
 *
 * 3. fonts/ に使いたいサウンドフォントを置く
 *
 * A320U.sf2 がおすすめ。
 * https://github.com/denemo/denemo/tree/master/soundfonts
 *
 * 4. midi/ に使いたい MIDI 素材を置く
 * index.html と同じフォルダに midi/ を追加してその中に入れる。
 * 未使用素材削除機能は使えないので注意。
 *
 * [使い方]
 *
 * プラグインコマンドを使ってください。
 *
 * スクリプトやプラグインから実行したい場合は、
 * $midi というグローバル変数が用意されているので、
 * そこからアクセスしてください。
 *
 * 例:
 * $midi.play(
 *   "戦闘1", // 戦闘1.mid
 *   0.5 // 音量 50%
 * );
 * $midi.stop();
 *
 * [注意]
 *
 * - MIDIを都度読み込んでから再生するため、MIDIの容量に応じて再生に時間がかかります。
 * - メモリリーク対策で次の再生まで 1 秒経ってない場合は再生させない仕様にしてます。
 *
 * [動作サンプル]
 * https://game.nicovideo.jp/atsumaru/games/gm26154
 *
 * Copyright (c) 2022 Had2Apps
 * This software is released under the MIT License.
 *
 * Version: v0.2.1-EXP
 * RPG Maker MZ Version: v1.5.0
 */

(() => {
  /*========== ../../../_templates/pluginName.js ==========*/
  const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

  /*========== ./main.js ==========*/

  const { _fontName } = PluginManager.parameters(pluginName);

  // sf2synth でエラーになるので抑制
  const setValueAtTime = AudioParam.prototype.setValueAtTime;
  AudioParam.prototype.setValueAtTime = function () {
    try {
      return setValueAtTime.apply(this, arguments);
    } catch (error) {}
  };
  Object.defineProperty(window.PannerNode.prototype, "panningModel", {
    get: function () {
      return this.panningModel;
    },
    set: function (value) {
      try {
        this.panningModel = value;
      } catch (error) {}
    },
  });
  BiquadFilterNode.prototype.LOWPASS = "lowpass";

  // メイン処理
  class H2A_MidiPlayer {
    constructor(sf2name) {
      try {
        this.player = new SMF.Player();
        this.player.setLoop(true);
        this.player.setCC111Loop(true);
        // .webMidiLink
        this.player.b = {
          contentWindow: {
            postMessage: this.setMidiMessage.bind(this),
          },
        };
        this.link = new SoundFont.WebMidiLink();
        this.link.setLoadCallback(console.log);
        this.loadSF2(sf2name).then(() => this.setPlayerReady(true));
      } catch (error) {
        SceneManager.onError(
          new Error(
            "H2A_MidiPlayer の初期化に失敗しました。あなたの環境は対応していない可能性があります。" +
              navigator.userAgent
          )
        );
      }
    }
    setPlayerReady(isReady) {
      // .ready
      this.player.h = isReady;
    }
    getPlayerReady() {
      return this.player.h;
    }
    async loadSF2(sf2name) {
      const sf2file = new Uint8Array(
        await (await fetch("./fonts/" + sf2name + ".sf2")).arrayBuffer()
      );
      this.link.loadSoundFont(sf2file);
      console.debug("LOADED", sf2name);
      $midi.link.w.a.style.display = "none";
    }
    async play(midiname, volume = 0.5) {
      if (volume < 0 || volume > 1) {
        throw new Error("音量は 0.0 ～ 1.0 の実数で指定してください");
      }
      if (this.playingMIDIName === midiname) {
        console.debug("同じBGMが指定されました");
        return;
      }
      if (Date.now() - this.prevPlayTime < 1000) {
        console.warn("呼び出し感覚が短すぎます");
        return;
      }
      if (AudioManager._bgmBuffer) {
        AudioManager.stopBgm();
      }
      this.localVolume = volume;
      const midifile = new Uint8Array(
        await (await fetch("./midi/" + midiname + ".mid")).arrayBuffer()
      );
      this.player.loadMidiFile(midifile);
      console.debug("LOADED", midiname);
      this.setVolume(this.localVolume);
      this.player.play();
      this.playingMIDIName = midiname;
      this.prevPlayTime = Date.now();
    }
    stop() {
      this.player.stop();
      this.playingMIDIName = undefined;
    }
    setMidiMessage(message) {
      this.link.onmessage({ data: message });
    }
    setVolume(volume) {
      if (!this.getPlayerReady()) return;
      const setMasterVolume = (v) => {
        const audioVolume =
          (AudioManager.bgmVolume / 100) * WebAudio._masterVolume;
        this.player.setMasterVolume(Math.floor(v * audioVolume * 16383));
      };
      if (volume === undefined) {
        setMasterVolume(this.localVolume);
      } else {
        if (volume < 0 || volume > 1) {
          throw new Error("音量は 0.0 ～ 1.0 の実数で指定してください");
        }
        setMasterVolume(volume);
      }
    }
  }
  window.$midi = new H2A_MidiPlayer(_fontName);

  // プラグインコマンド
  PluginManager.registerCommand(
    pluginName,
    "play",
    function ({ _name, _volume }) {
      window.$midi.play(_name, +_volume / 100);
    }
  );
  PluginManager.registerCommand(pluginName, "stop", function () {
    window.$midi.stop();
  });

  // BGMをオフったら、こっちもオフるようにする
  const stopBgm = AudioManager.stopBgm;
  AudioManager.stopBgm = function () {
    stopBgm.apply(this);
    $midi.stop();
  };
  // BGMが設定されたら、こっちを消すようにする
  const playBgm = AudioManager.playBgm;
  AudioManager.playBgm = function () {
    $midi.stop();
    playBgm.apply(this, arguments);
  };
  // BGM音量が変更されたらMIDI側も更新する
  const resetWebAudioVolume = WebAudio._resetVolume;
  WebAudio._resetVolume = function () {
    resetWebAudioVolume.apply(this);
    $midi.setVolume();
  };
  const updateBgmParameters = AudioManager.updateBgmParameters;
  AudioManager.updateBgmParameters = function (bgm) {
    updateBgmParameters.apply(this, arguments);
    $midi.setVolume();
  };
})();
