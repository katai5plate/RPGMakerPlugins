/// <reference path="../../../_templates/pluginName.js"/>

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
      this.songVolume * (AudioManager.bgmVolume / 100) * WebAudio._masterVolume
    );
  }
  getCalculatedSoundVolume() {
    return (
      this.soundVolume * (AudioManager.seVolume / 100) * WebAudio._masterVolume
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
