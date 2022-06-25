/// <reference path="../../../_templates/pluginName.js"/>

import pluginName from "~templates/pluginName"; /***__HIDDEN__***/

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
