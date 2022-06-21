/*:ja
 * @plugindesc [実験作] MIDI を再生できるようにします
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
 *   @default 50
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
 * 4. audio/midi/ に使いたい MIDI 素材を置く
 *
 * [使い方]
 *
 * プラグインコマンドを使ってください。
 *
 * [注意]
 *
 * - MIDIを都度読み込んでから再生するため、MIDIの容量に応じて再生に時間がかかります。
 *
 * Copyright (c) 2022 Had2Apps
 * This software is released under the MIT License.
 *
 * Version: vEXP-0.1.0
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
    }
    test() {
      return this.link.w;
    }
    setPlayerReady(isReady) {
      // .ready
      this.player.h = isReady;
    }
    async loadSF2(sf2name) {
      const sf2file = new Uint8Array(
        await (await fetch("./fonts/" + sf2name + ".sf2")).arrayBuffer()
      );
      this.link.loadSoundFont(sf2file);
      console.log("LOADED", sf2name);
      $midi.link.w.a.style.display = "none";
    }
    async play(midiname, volume = 0.5) {
      if (volume < 0 || volume > 1) {
        throw new Error("volume is 0-1 range float.");
      }
      if (Date.now() - this.prevPlayTime < 1000) {
        console.warn("呼び出し感覚が短すぎます");
        return;
      }
      const midifile = new Uint8Array(
        await (await fetch("./audio/midi/" + midiname + ".mid")).arrayBuffer()
      );
      this.player.loadMidiFile(midifile);
      console.log("LOADED", midiname);
      this.player.setMasterVolume(Math.floor(volume * 16383));
      this.player.play();
      this.prevPlayTime = Date.now();
    }
    stop() {
      this.player.stop();
    }
    setMidiMessage(message) {
      this.link.onmessage({ data: message });
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
})();
