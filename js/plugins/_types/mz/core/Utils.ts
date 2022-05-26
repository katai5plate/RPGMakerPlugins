export declare class Utils {
  static checkRMVersion(version: string): boolean;
  static isOptionValid(name: string): boolean;
  static isNwjs(): boolean;
  static isMobileDevice(): boolean;
  static isMobileSafari(): boolean;
  static isAndroidChrome(): boolean;
  static isLocal(): boolean;
  static canUseWebGL(): boolean;
  static canUseWebAudioAPI(): boolean;
  static canUseCssFontLoading(): boolean;
  static canUseIndexedDB(): boolean;
  static canPlayOgg(): boolean;
  static canPlayWebm(): boolean;
  static encodeURI(str: string): string;
  static extractFileName(filename: string): string;
  static escapeHtml(str: string): string;
  static containsArabic(str: string): boolean;
  static setEncryptionInfo(
    hasImages: boolean,
    hasAudio: boolean,
    key: string
  ): void;
  static hasEncryptedImages(): boolean;
  static hasEncryptedAudio(): boolean;
  static decryptArrayBuffer(source: ArrayBuffer): ArrayBuffer;

  static RPGMAKER_NAME: "MZ";
  static RPGMAKER_VERSION: string;
  static _audioElement: HTMLAudioElement;
  static _videoElement: HTMLVideoElement;
  public _encryptionKey: string;
  public _hasEncryptedAudio: boolean;
  public _hasEncryptedImages: boolean;
}
