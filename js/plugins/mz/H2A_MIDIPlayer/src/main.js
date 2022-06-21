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
