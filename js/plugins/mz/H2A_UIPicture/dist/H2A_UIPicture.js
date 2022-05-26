/*:ja
 * @plugindesc
 *
 * @target MZ
 * @author Had2Apps
 * @url https://github.com/katai5plate/RPGMakerPlugins
 *
 * @param debugMode
 * @text デバッグモード
 * @desc テストプレイ中はデバッグモードにする
 * @type boolean
 *
 * @command setupPictures
 * @text UIピクチャ設定
 *
 *   @arg list
 *   @type struct<Setup>[]
 *
 *   @arg enableLoadingWait
 *   @text 画像をロードするまで待つ
 *   @desc 省略・不備の場合はOFFになります
 *   @type boolean
 *   @default false
 *
 * @command disable
 * @text 無効化
 *
 *   @arg pictureIds
 *   @text ピクチャID
 *   @type number[]
 *   @min 1
 *   @max 100
 *
 * @command enable
 * @text 有効化
 *
 *   @arg pictureIds
 *   @text ピクチャID
 *   @type number[]
 *   @min 1
 *   @max 100
 *
 * @help
 *
 *
 * Copyright (c) 2021 Had2Apps
 * This software is released under the MIT License.
 *
 * Version: v0.0.1
 * RPG Maker MZ Version: v1.3.3
 */
/*~struct~P:ja
 * @param x
 * @text 横軸座標
 * @type number
 * @max 9007199254740991
 * @min -9007199254740991
 *
 * @param y
 * @text 縦軸座標
 * @type number
 * @max 9007199254740991
 * @min -9007199254740991
 *
 */
/*~struct~R:ja
 * @param x
 * @text 左上X
 * @type number
 * @min 0
 *
 * @param y
 * @text 左上Y
 * @type number
 * @min 0
 *
 * @param width
 * @text 幅
 * @type number
 * @min 1
 *
 * @param height
 * @text 高さ
 * @type number
 * @min 1
 *
 */
/*~struct~WH:ja
 * @param width
 * @text 幅
 * @type number
 * @min 1
 *
 * @param height
 * @text 高さ
 * @type number
 * @min 1
 *
 */
/*~struct~M:ja
 * @param left
 * @text 左から
 * @type number
 * @min 0
 *
 * @param right
 * @text 右から
 * @type number
 * @min 0
 *
 * @param top
 * @text 上から
 * @type number
 * @min 1
 *
 * @param bottom
 * @text 下から
 * @type number
 * @min 1
 *
 */
/*~struct~C:ja
 * @param r
 * @type number
 * @text 赤
 * @min -255
 * @max 255
 * @default 0
 *
 * @param g
 * @type number
 * @text 緑
 * @min -255
 * @max 255
 * @default 0
 *
 * @param b
 * @type number
 * @text 青
 * @min -255
 * @max 255
 * @default 0
 *
 * @param s
 * @type number
 * @text グレー
 * @min 0
 * @max 255
 * @default 0
 *
 * @param a
 * @type number
 * @text 不透明度
 * @min 0
 * @max 255
 * @default 255
 *
 */
/*~struct~Setup:ja
 * @param pictureId
 * @text ピクチャID
 * @type number
 * @min 1
 * @max 100
 *
 * @param collision
 * @text 当たり判定
 * @desc 省略・不備の場合は画像サイズがそのまま設定されます
 * @type struct<R>
 *
 * @param callbackConfig
 * @type struct<CallbackConfig>
 * @text コールバック設定
 * @desc 省略・不備の場合は機能しません
 *
 * @param textConfig
 * @text 文字列設定
 * @desc 省略・不備の場合は文字列は表示されません
 * @type struct<TextConfig>
 *
 * @param colorConfig
 * @text 色調設定
 * @desc 省略・不備の場合は色調は変化しないか、通常時と同じになります
 * @type struct<ColorConfig>
 *
 * @param dragConfig
 * @text ドラッグ設定
 * @desc 省略・不備の場合はドラッグ無効になります
 * @type struct<DragConfig>
 *
 * @param pisition
 * @text 座標上書き
 * @desc 設定すると表示座標を上書きできます
 * @type struct<P>
 *
 * @param advancedConfig
 * @text 上級者向け設定
 * @desc 取り扱い注意
 * @type struct<AdvancedConfig>
 *
 */
/*~struct~DragConfig:ja
 * @param range
 * @type struct<R>
 * @text ドラッグ範囲
 * @desc ドラッグが可能な範囲。省略・不備の場合はドラッグ無効になります
 *
 * @param move
 * @type select
 * @text 移動方向
 * @desc 移動方向の制限。省略・不備の場合は自由移動になります
 *
 *   @option 横
 *   @value horizontal
 *
 *   @option 縦
 *   @value vertical
 *
 * @param type
 * @type select
 * @text 代入設定
 * @desc 変数に位置情報を代入するタイプ。省略・不備の場合は代入されません
 *
 *   @option 比率(0 - 100)
 *   @value perint
 *
 *   @option 比率(0.0 - 1.0)
 *   @value perflo
 *
 *   @option 差分座標
 *   @value local
 *
 *   @option 画面座標
 *   @value global
 *
 * @param variableX
 * @type variable
 * @text X位置代入先
 * @desc 横軸の位置情報を代入する変数。省略・不備の場合は代入されません
 *
 * @param variableY
 * @type variable
 * @text Y位置代入先
 * @desc 縦軸の位置情報を代入する変数。省略・不備の場合は代入されません
 *
 * @param disDraggableWhenDisabled
 * @type boolean
 * @text 無効中は移動しない
 * @desc 省略・不備の場合はOFF扱いです
 *
 */
/*~struct~TextConfig:ja
 * @param text
 * @type multiline_string
 * @text 文字列
 * @desc \v[] などの文字列が使用できます。文字列が長すぎるとはみ出ます
 *
 * @param align
 * @type select
 * @text 文字揃え
 * @desc 省略・不備の場合は中央になります
 *
 *   @option 左揃え
 *   @value left
 *
 *   @option 右揃え
 *   @value right
 *
 * @param offset
 * @type struct<P>
 * @text オフセット
 * @desc 省略・不備の場合は(0,0)にします
 *
 */
/*~struct~ColorConfig:ja
 * @param duration
 * @type number
 * @text 時間
 * @desc フレーム指定(1/60秒)。省略・不備の場合は一瞬で変化します
 * @min 1
 *
 * @param off
 * @type struct<C>
 * @text 通常
 * @desc 省略・不備の場合は変化しません
 *
 * @param onOver
 * @type struct<C>
 * @text 接触開始時
 * @desc 省略・不備の場合は通常と同じになります
 *
 * @param onPress
 * @type struct<C>
 * @text タップ開始時
 * @desc 省略・不備の場合は通常と同じになります
 *
 * @param onDisable
 * @type struct<C>
 * @text 無効時
 * @desc 省略・不備の場合は通常と同じになります
 *
 */
/*~struct~CallbackConfig:ja
 * @param commonEventId
 * @type common_event
 * @text コモンイベントID
 * @desc 操作時に呼び出されるコモンイベントID。省略・不備の場合は機能しません
 *
 * @param onOver
 * @type string
 * @text 接触開始時
 * @desc ラベル名。省略・不備の場合は機能しません
 *
 * @param onOut
 * @type string
 * @text 接触終了時
 * @desc ラベル名。省略・不備の場合は機能しません
 *
 * @param onPress
 * @type string
 * @text タップ開始時
 * @desc ラベル名。省略・不備の場合は機能しません
 *
 * @param onRelease
 * @type string
 * @text タップ終了時
 * @desc ラベル名。省略・不備の場合は機能しません
 *
 * @param onDragEnd
 * @type string
 * @text ドラッグ終了時
 * @desc ラベル名。省略・不備の場合は機能しません
 *
 */
/*~struct~debugConfig:ja
 * @param forceTransform
 * @type struct<R>
 * @text 画像サイズの強制変更
 * @desc WHで画像サイズを別個設定。画像なしで使用する時など向け
 *
 */
(() => {
  /*========== ../../../_templates/pluginName.js ==========*/
  const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

  /*========== ../../../_templates/parsePluginParams.js ==========*/
  const parsePluginParams = (paramText) =>
    JSON.parse(
      JSON.stringify(paramText, (_, v) => {
        if (/^".*?"$/.test(v)) return v;
        try {
          const p = JSON.parse(v);
          return null === p ? v : p;
        } catch (__) {
          return v === "" ? null : v;
        }
      })
    );

  /*========== ../../../_templates/resolveTypeAs.js ==========*/
  /**
   * @template T
   * @param {(type: T) => any} def
   * @param {unknown} from
   * @returns {T}
   */
  const resolveTypeAs = (def, from) => from;

  /*========== ./calc.js ==========*/

  class P extends PIXI.Point {
    /**
     * @param {ConstructorParameters<typeof PIXI.Point>[0]} [x]
     * @param {ConstructorParameters<typeof PIXI.Point>[1]} [y]
     */
    constructor(x, y) {
      super(x, y);
    }
    get isSafe() {
      return [this.x, this.y].every(
        (v) =>
          Number.isFinite(v) &&
          v >= Number.MIN_SAFE_INTEGER &&
          v <= Number.MAX_SAFE_INTEGER
      );
    }
    /** @param {PIXI.Rectangle} rect */
    hit(rect) {
      return (
        rect.left <= this.x &&
        this.x <= rect.right &&
        rect.top <= this.y &&
        this.y <= rect.bottom
      );
    }
    /**
     * @param {number} xmin
     * @param {number} xmax
     * @param {number} ymin
     * @param {number} ymax
     */
    mapping(xmin, xmax, ymin, ymax) {
      xmin > this.x && (this.x = xmin);
      xmax < this.x && (this.x = xmax);
      ymin > this.y && (this.y = ymin);
      ymax < this.y && (this.y = ymax);
      return this;
    }
    /**
     * @param {"add"|"sub"|"mul"|"div"|"mod"} op
     * @param {number} x
     * @param {number} [y]
     */
    calc(op, x, y = x) {
      if (op === "add") {
        (this.x += x), (this.y += y);
      } else if (op === "sub") {
        (this.x -= x), (this.y -= y);
      } else if (op === "mul") {
        (this.x *= x), (this.y *= y);
      } else if (op === "div") {
        (this.x /= x), (this.y /= y);
      } else if (op === "mod") {
        (this.x %= x), (this.y %= y);
      }
      return this;
    }
    /**
     * @param {Parameters<typeof this.calc>[0]} op
     * @param {P|{x:number,y:number}} p
     */
    calcP(op, p) {
      return this.calc(op, p.x, p.y);
    }
    /**
     * @param {{x?:number,y?:number}} _
     * @param {{x?:number,y?:number}} whenNaN
     * @returns
     */
    static from({ x, y } = {}, whenNaN) {
      const s = (a, b) =>
        Number.isFinite(a) ? a : undefined !== whenNaN?.[b] ? whenNaN[b] : a;
      return new this(s(x, "x"), s(y, "y"));
    }
    toString() {
      const [x, y] = [this.x, this.y].map(Math.floor);
      return `P(${x}, ${y})`;
    }
  }

  class R extends PIXI.Rectangle {
    /**
     * @param {ConstructorParameters<typeof PIXI.Rectangle>[0]} [x]
     * @param {ConstructorParameters<typeof PIXI.Rectangle>[1]} [y]
     * @param {ConstructorParameters<typeof PIXI.Rectangle>[2]} [w]
     * @param {ConstructorParameters<typeof PIXI.Rectangle>[3]} [h]
     */
    constructor(x, y, w, h) {
      super(x, y, w, h);
    }
    get isSafe() {
      return (
        [this.x, this.y, this.width, this.height].every(
          (v) => Number.isFinite(v) && 0 <= v && v <= Number.MAX_SAFE_INTEGER
        ) && [this.width, this.height].every((v) => 0 < v)
      );
    }
    /** @param {PIXI.Point} point */
    hit(point) {
      return (
        this.left <= point.x &&
        point.x <= this.right &&
        this.top <= point.y &&
        point.y <= this.bottom
      );
    }
    /**
     * @param {"add"|"sub"|"mul"|"div"|"mod"} op
     * @param {number} x
     * @param {number} [y]
     * @param {number} [w]
     * @param {number} [h]
     */
    calc(op, x, y = NaN, w = NaN, h = NaN) {
      let _y = y,
        _w = w,
        _h = h;
      Number.isNaN(y) && (_y = x);
      Number.isNaN(w) && Number.isNaN(h) && ((_w = x), (_h = _y));
      if (op === "add") {
        (this.x += x), (this.y += _y), (this.width += _w), (this.height += _h);
      } else if (op === "sub") {
        (this.x -= x), (this.y -= _y), (this.width -= _w), (this.height -= _h);
      } else if (op === "mul") {
        (this.x *= x), (this.y *= _y), (this.width *= _w), (this.height *= _h);
      } else if (op === "div") {
        (this.x /= x), (this.y /= _y), (this.width /= _w), (this.height /= _h);
      } else if (op === "mod") {
        (this.x %= x), (this.y %= _y), (this.width %= _w), (this.height %= _h);
      }
      return this;
    }
    /**
     * @param {Parameters<typeof this.calc>[0]} op
     * @param {P|{x:number,y:number}} p
     */
    calcP(op, p) {
      return this.calc(op, p.x, p.y);
    }
    /**
     * @param {Parameters<typeof this.calc>[0]} op
     * @param {R|{x:number,y:number,width:number,height:number}} r
     */
    calcR(op, r) {
      return this.calc(op, r.x, r.y, r.width, r.height);
    }
    /** @param {PIXI.Rectangle} rect */
    containsRect(rect) {
      return (
        Math.abs(this.x - rect.x) < this.width / 2 + rect.width / 2 &&
        Math.abs(this.y - rect.y) < this.height / 2 + rect.height / 2
      );
    }
    /**
     * @param {{x?:number,y?:number,width?:number,height?:number}} _
     * @param {{x?:number,y?:number,width?:number,height?:number}} [whenNaN]
     * @returns
     */
    static from({ x, y, width, height } = {}, whenNaN) {
      const s = (a, b) =>
        Number.isFinite(a) ? a : undefined !== whenNaN?.[b] ? whenNaN[b] : a;
      return new this(
        s(x, "x"),
        s(y, "y"),
        s(width, "width"),
        s(height, "height")
      );
    }
    /** P(x,y) -> R(x,y,0,0)
     * @param {P|{x?:number,y?:number}} _
     * @param {{x?:number,y?:number}} [whenNaN]
     * @returns
     */
    static fromP({ x, y } = {}, whenNaN) {
      const s = (a, b) =>
        Number.isFinite(a) ? a : undefined !== whenNaN?.[b] ? whenNaN[b] : a;
      return new this(s(x, "x"), s(y, "y"), 0, 0);
    }
    toString() {
      const [x, y, width, height] = [
        this.x,
        this.y,
        this.width,
        this.height,
      ].map(Math.floor);
      return `R(${x}, ${y}, ${width}, ${height})`;
    }
  }

  class Color {
    constructor(r = 0, g = 0, b = 0, s = 0, a = 0) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.s = s;
      this.a = a;
    }
    /** @type {[number,number,number,number]} */
    get TintColor() {
      return [this.r, this.g, this.b, this.s];
    }
    get opacity() {
      return this.a;
    }
    /**
     * @param {{r?:number,g?:number,b?:number,s?:number,a?:number}} _
     * @param {{r?:number,g?:number,b?:number,s?:number,a?:number}} [whenNaN]
     * @returns
     */
    static from({ r, g, b, s, a } = {}, whenNaN) {
      const f = (a, b) =>
        Number.isFinite(a) ? a : undefined !== whenNaN?.[b] ? whenNaN[b] : a;
      return new this(f(r, "r"), f(g, "g"), f(b, "b"), f(s, "s"), f(a, "a"));
    }
  }

  globalThis.P = P;
  globalThis.R = R;

  /*========== ./components/UIPicture.js ==========*/

  class UIPicture {
    /** @type {DebugSprite} */
    static _debugSprite = null;
    static initialize() {
      const isDebugMode =
        parsePluginParams(PluginManager.parameters(pluginName)).debugMode &&
        Utils.isOptionValid("test");
      if (isDebugMode) {
        UIPicture._debugSprite = new DebugSprite();
        SceneManager._scene._spriteset.addChild(UIPicture._debugSprite);
      }
    }
    /** convertEscapeCharacters 呼び出し用
     *  @return {Window_Base} */
    static get baseWindow() {
      return resolveTypeAs(
        /** @param {Window_Base | null} _ */ (_) => _,
        SceneManager._scene._windowLayer?.children.find(
          (x) => x instanceof Window_Base
        )
      );
    }
    static pictures() {
      return resolveTypeAs(
        /** @param {Game_UIPicture[]} _ */ (_) => _,
        ($gameScreen?._pictures || []).slice(1)
      );
    }
    static sprites() {
      return resolveTypeAs(
        /** @param {Sprite_UIPicture[]} _ */ (_) => _,
        SceneManager._scene?._spriteset?._pictureContainer?.children || []
      );
    }
    /** @returns {Sprite | null} */
    static spriteParent() {
      return SceneManager._scene?._spriteset?._pictureContainer || null;
    }
    static picture(pictureId) {
      return resolveTypeAs(
        /** @param {Game_UIPicture | null} _ */ (_) => _,
        $gameScreen.picture(pictureId)
      );
    }
    static sprite(pictureId) {
      return resolveTypeAs(
        /** @param {Sprite_UIPicture | null} _ */ (_) => _,
        SceneManager._scene?._spriteset?._pictureContainer?.children?.[
          pictureId - 1
        ]
      );
    }
    static spriteIsUI(sprite) {
      return (
        sprite instanceof Sprite_UIPicture ||
        sprite instanceof Sprite_UIPictureLabel
      );
    }
    static spriteIsUIById(pictureId) {
      /** @type {*} */
      const sprite = this.sprite(pictureId);
      return this.spriteIsUI(sprite);
    }
    static replaceSprite(pictureId, sprite) {
      const parent = this.spriteParent();
      if (!parent) return;
      const before = parent.children[pictureId - 1];
      const beforeIndex = parent.getChildIndex(before);
      parent.removeChild(before);
      parent.addChild(sprite);
      parent.setChildIndex(sprite, beforeIndex);
    }
    static isPressed(pictureId) {
      const picture = this.picture(pictureId);
      return (
        picture._isUI &&
        picture._isPressed &&
        !picture.isAutoMoving &&
        !picture._isDisabled
      );
    }
    static isTriggered(pictureId) {
      const picture = this.picture(pictureId);
      return (
        picture._isUI &&
        picture._pressCount === 0 &&
        !picture.isAutoMoving &&
        !picture._isDisabled
      );
    }
    static isDisabled(pictureId) {
      return this.picture(pictureId)._isDisabled;
    }
    static showPicture(
      pictureId,
      name,
      origin,
      x,
      y,
      scaleX,
      scaleY,
      opacity,
      blendMode
    ) {
      this.replaceSprite(pictureId, new Sprite_UIPicture(pictureId));
      const realPictureId = $gameScreen.realPictureId(pictureId);
      const picture = new Game_UIPicture(pictureId);
      picture.show(name, origin, x, y, scaleX, scaleY, opacity, blendMode);
      $gameScreen._pictures[realPictureId] = picture;
      console.log("done", picture);
    }
    static _updateWait() {
      const pictures = resolveTypeAs(
        /** @param {Game_UIPicture[] | null} _ */ (_) => _,
        $gameScreen._pictures
      );
      let waiting = false;
      for (let pic of pictures.slice(1)) {
        if (!this.spriteIsUIById(pic._pictureId)) {
          waiting = false;
        } else if (pic._enableLoadingWait && !pic._loaded) {
          waiting = true;
        }
      }
      return waiting;
    }
  }
  globalThis.UIPicture = UIPicture;

  const start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function () {
    start.apply(this, arguments);
    UIPicture.initialize();
  };

  const isMapTouchOk = Scene_Map.prototype.isMapTouchOk;
  Scene_Map.prototype.isMapTouchOk = function () {
    return (
      isMapTouchOk.apply(this, arguments) &&
      !UIPicture.pictures().find((b) => {
        if (UIPicture.spriteIsUI(b)) {
          return b.isBeingTouched;
        }
      })
    );
  };

  const updateWait = Game_Interpreter.prototype.updateWait;
  Game_Interpreter.prototype.updateWait = function () {
    return UIPicture._updateWait() || updateWait.apply(this, arguments);
  };

  /*========== ./components/CanvasSprite.js ==========*/

  class CanvasSprite extends PIXI.Sprite {
    #context;
    #backupTransform;
    /**
     * @param {number} width
     * @param {number} height
     */
    constructor(width = 1, height = 1) {
      super();
      this.width = width;
      this.height = height;
      this.createCanvas();
    }
    createCanvas() {
      const canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      this.texture = new PIXI.Texture(PIXI.BaseTexture.from(canvas));
      this.#context = canvas.getContext("2d");
    }
    /** @type {CanvasRenderingContext2D} */
    get ctx() {
      return this.#context;
    }
    flip() {
      this.texture.update();
    }
    /** @param {(ctx:CanvasRenderingContext2D)=>void} fn */
    draw(fn, refresh = false) {
      refresh && this.ctx.clearRect(0, 0, this.width, this.height);
      fn(this.ctx);
      this.flip();
    }
    update() {
      //
    }
  }
  globalThis.CanvasSprite = CanvasSprite;

  /*========== ./components/DebugSprite.js ==========*/

  class DebugSprite extends CanvasSprite {
    constructor() {
      super(Graphics.boxWidth, Graphics.boxHeight);
    }
    update() {
      this.draw((ctx) => {
        for (let picture of UIPicture.pictures()) {
          if (!(picture instanceof Game_UIPicture)) return;
          const sprite = UIPicture.sprite(picture._pictureId);
          ctx.strokeStyle = ctx.fillStyle = "#ff0000aa";
          const icol = new R(
            sprite.x + picture.imageCollision.x,
            sprite.y + picture.imageCollision.y,
            picture.imageCollision.width,
            picture.imageCollision.height
          );
          ctx.strokeRect(icol.x, icol.y, icol.width, icol.height);
          ctx.fillText(icol.toString(), icol.x, icol.y);

          ctx.strokeStyle = ctx.fillStyle = "#ff00ffaa";
          const col = new R(
            sprite.x + picture.collision.x,
            sprite.y + picture.collision.y,
            picture.collision.width,
            picture.collision.height
          );
          ctx.strokeRect(col.x, col.y, col.width, col.height);
          ctx.fillText(col.toString(), col.x, col.y);

          ctx.strokeStyle = ctx.fillStyle = "#ffff00aa";
          const area = new R(
            picture._dragRange.x,
            picture._dragRange.y,
            picture._dragRange.width,
            picture._dragRange.height
          );
          ctx.strokeRect(area.x, area.y, area.width, area.height);
          ctx.fillText(area.toString(), area.x, area.y);
        }
        ctx.fillStyle = "#ffffffaa";
        ctx.fillText(
          `(${TouchInput.x}, ${TouchInput.y})`,
          TouchInput.x,
          TouchInput.y
        );
      }, true);
    }
  }

  globalThis.DebugSprite = DebugSprite;

  /*========== ./components/Sprite_UIPictureLabel.js ==========*/

  class Sprite_UIPictureLabel extends CanvasSprite {
    /** @type {number} */
    pictureId;
    /** @param {number} pictureId */
    constructor(pictureId) {
      super();
      this.pictureId = pictureId;
      this.width = this.picture._width;
      this.height = this.picture._height;
      this.createCanvas();
      console.log(this);
    }
    get picture() {
      return resolveTypeAs(
        /** @param {Game_UIPicture} _ */ (_) => _,
        $gameScreen.picture(this.pictureId)
      );
    }
    updateText() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      if (!UIPicture.baseWindow) return;
      const base = UIPicture.baseWindow;
      const text = `${this.picture._labelText}`;
      const convertedText = base.convertEscapeCharacters(text);
      const convertedLines = convertedText.split("\n").map((text, i, s) => ({
        text,
        height:
          base.maxFontSizeInLine(text) +
          (i === s.length - 1
            ? 0
            : base.lineHeight() - $gameSystem.mainFontSize()),
      }));
      const convertedTextHeight = convertedLines.reduce(
        (p, c) => p + c.height,
        0
      );
      const align = this.picture._textAlign;
      const drawPos = new P(
        align === "start" || align === "left"
          ? this.x
          : align === "end" || align === "right"
          ? this.width
          : this.width / 2, // center
        this.height / 2 - convertedTextHeight / 2
      ).calcP("add", this.picture._textOffset);
      this.ctx.textAlign = align;
      this.ctx.font = `${$gameSystem.mainFontSize()}px ${$gameSystem.mainFontFace()}`;
      this.ctx.textBaseline = "top";
      convertedLines.forEach(({ text, height }) => {
        // outline
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 3;
        this.ctx.lineJoin = "round";
        this.ctx.strokeText(text, drawPos.x, drawPos.y);
        // body
        this.ctx.fillStyle = "white";
        this.ctx.fillText(text, drawPos.x, drawPos.y);
        drawPos.calc("add", 0, height);
      });
      this.flip();
    }
    update() {
      this.updateText();
      if (this.picture.origin() === 0) {
        this.anchor.set(0, 0);
      } else {
        this.anchor.set(0.5, 0.5);
      }
    }
  }

  /*========== ./components/Sprite_UIPicture.js ==========*/

  class Sprite_UIPicture extends Sprite_Picture {
    constructor(pictureId) {
      super(pictureId);
    }
    /** @param {Bitmap} bitmapLoaded */
    _onBitmapLoad(bitmapLoaded) {
      const picture = resolveTypeAs(
        /** @param {Game_UIPicture} _ */ (_) => _,
        this.picture()
      );
      picture._width = bitmapLoaded.width;
      picture._height = bitmapLoaded.height;
      picture._loaded = true;
      console.log("_onBitmapLoad", picture._pictureId, bitmapLoaded);
      this._labelSprite = new Sprite_UIPictureLabel(this._pictureId);
      this.addChild(
        resolveTypeAs(
          /** @param {PIXI.DisplayObject} _ */ (_) => _,
          this._labelSprite
        )
      );
      return super._onBitmapLoad(bitmapLoaded);
    }
    update() {
      super.update();
    }
  }

  /*========== ./components/Game_UIPicture.js ==========*/

  class Game_UIPicture extends Game_Picture {
    /** @type {number} */
    _width;
    /** @type {number} */
    _height;
    /** @type {boolean} */
    _loaded = false;
    /** @type {boolean} */
    _isDragging = false;
    /** @type {P} */
    _dragPosition = new P();
    /** @type {boolean} */
    _isDraggable = true;
    /** @type {Sprite_UIPictureLabel} */
    _labelSprite;
    /** @type {number} */
    _pressCount = 0;

    /** @type {boolean} */
    _isUI = false;
    /** @type {boolean} */
    _enableLoadingWait = false;
    /** @type {*} */
    _callbackInterpreter = null;

    /** @type {number} */
    _pictureId;
    /** @type {R} */
    _collision = new R(NaN, NaN, NaN, NaN);

    /** @type {R} */
    _dragRange = new R(NaN, NaN, NaN, NaN);
    /** @type {P} */
    _movableDirection = new P(1, 1);
    /** @type {null|"perint"|"perflo"|"local"|"global"} */
    _variableType = null;
    /** @type {P} */
    _variableIds = new P(0, 0);
    /** @type {boolean} */
    _disDraggableWhenDisabled = false;

    /** @type {string} */
    _labelText = "";
    /** @type {CanvasTextAlign} */
    _textAlign = "center";
    /** @type {P} */
    _textOffset = new P(0, 0);

    /** @type {number} */
    _colorDuration = 1;
    /** @type {Color} */
    _colorNormal = new Color(0, 0, 0, 0, 255);
    /** @type {Color} */
    _colorOnOver = new Color(0, 0, 0, 0, 255);
    /** @type {Color} */
    _colorOnPress = new Color(0, 0, 0, 0, 255);
    /** @type {Color} */
    _colorOnDisable = new Color(0, 0, 0, 0, 255);
    /** @type {number} */
    _opacityDuration = 0;

    /** @type {boolean} */
    _isDisabled = false;

    /** @type {number} */
    _callbackCommonEventId = NaN;
    /** @type {string} */
    _callbackCommonEventLabelOnOver = "";
    /** @type {string} */
    _callbackCommonEventLabelOnOut = "";
    /** @type {string} */
    _callbackCommonEventLabelOnPress = "";
    /** @type {string} */
    _callbackCommonEventLabelOnRelease = "";
    /** @type {string} */
    _callbackCommonEventLabelOnDragEnd = "";

    /** @param {number} pictureId */
    constructor(pictureId) {
      super();
      this._pictureId = pictureId;
      console.log(456, this);
    }
    get scale() {
      return new P(this._scaleX, this._scaleY);
    }
    get anchoredPosition() {
      // MEMO: anchor が 0.5 の時は xy はマイナスになる
      const anchor = +!!this.origin() * 0.5;
      return new P(-anchor * this._width, -anchor * this._height);
    }
    get imageCollision() {
      return R.fromP(this.anchoredPosition)
        .calc("add", 0, 0, this._width, this._height)
        .calcP("mul", this.scale.calc("div", 100));
    }
    get collision() {
      // 判定が壊れている場合は画像サイズを代用する
      if (!this._collision.isSafe) return this.imageCollision;
      return R.fromP(this.anchoredPosition)
        .calcR("add", this._collision)
        .calcP("mul", this.scale.calc("div", 100));
    }
    set collision(r) {
      const { x, y, width, height } = r || {
        x: 0,
        y: 0,
        width: this._width,
        height: this._height,
      };
      Number.isFinite(x) && (this._collision.x = x);
      Number.isFinite(y) && (this._collision.y = y);
      Number.isFinite(width) && (this._collision.width = width);
      Number.isFinite(height) && (this._collision.height = height);
    }
    get enableDrag() {
      return this._dragRange.isSafe;
    }
    /** @param {"over"|"out"|"press"|"release"|"drag-end"} on */
    callback(on) {
      const i = this._callbackInterpreter;
      if (!(i instanceof Game_Interpreter)) return;
      const ce = $dataCommonEvents[this._callbackCommonEventId];
      if (!ce) return;
      let label = "";
      on === "over" && (label = this._callbackCommonEventLabelOnOver);
      on === "out" && (label = this._callbackCommonEventLabelOnOut);
      on === "press" && (label = this._callbackCommonEventLabelOnPress);
      on === "release" && (label = this._callbackCommonEventLabelOnRelease);
      on === "drag-end" && (label = this._callbackCommonEventLabelOnDragEnd);
      if (label !== "") {
        i.setup(
          ce.list.slice(
            ce.list.findIndex(
              (x) => x.code === 118 && x.parameters?.[0] === label
            )
          )
        );
      }
    }
    get isForeground() {
      return (
        Math.max(
          ...UIPicture.pictures()
            ?.filter((x) => x.isBeingTouched())
            .map((x) => x._pictureId)
        ) === this._pictureId
      );
    }
    get isAutoMoving() {
      return this._duration > 0;
    }
    get sprite() {
      return UIPicture.sprite(this._pictureId);
    }
    isBeingTouched() {
      return new R(
        this.sprite.x + this.collision.x,
        this.sprite.y + this.collision.y,
        this.collision.width,
        this.collision.height
      ).hit(new P(TouchInput.x, TouchInput.y));
    }
    onDragEnd() {
      this.callback("drag-end");
    }
    triggerColor() {
      const { _colorDuration, _colorNormal, _colorOnOver, _colorOnPress } =
        this;
      if (this.isAutoMoving) {
        this._targetOpacity = _colorNormal.opacity;
        this.tint(_colorNormal.TintColor, _colorDuration);
      } else if (this._isDragging || this._isPressed) {
        this._targetOpacity = _colorOnPress.opacity;
        this.tint(_colorOnPress.TintColor, _colorDuration);
      } else if (this._isHovered) {
        this._targetOpacity = _colorOnOver.opacity;
        this.tint(_colorOnOver.TintColor, _colorDuration);
      } else {
        this._targetOpacity = _colorNormal.opacity;
        this.tint(_colorNormal.TintColor, _colorDuration);
      }
      this._opacityDuration = _colorDuration;
    }
    updateTouch() {
      if (this.sprite.worldVisible) {
        // 画面上
        if (this.isBeingTouched() && this.isForeground) {
          // 判定内
          if (!this._isHovered && TouchInput.isHovered()) {
            this._isHovered = true;
            this.onMouseOver();
          }
          if (TouchInput.isTriggered()) {
            this._isPressed = true;
            this.onMousePress();
          }
        } else {
          // 判定外
          if (this._isHovered) this.onMouseOut();
          (this._isPressed = false), (this._isHovered = false);
        }
        if (this._isPressed && TouchInput.isReleased()) {
          this._isPressed = false;
          this.onMouseRelease();
        }
      } else {
        // 画面外
        (this._isPressed = false), (this._isHovered = false);
      }
      if (this._isPressed) {
        this._pressCount++;
      } else {
        this._pressCount = -1;
      }
    }
    updateDrag() {
      if (!this._isDraggable || !this._isDragging) return;
      if (
        !TouchInput.isPressed() ||
        (this._isHovered && !this._isPressed) ||
        this.isAutoMoving ||
        this._isDisabled
      ) {
        this._isDragging = false;
        this.onDragEnd();
      }
      const z = new P(
        TouchInput.x - this._dragPosition.x,
        TouchInput.y - this._dragPosition.y
      );
      const area = this._dragRange;
      /** @type {R} */
      const col = this.collision;
      if (this.enableDrag) {
        if (this._movableDirection.x > 0) {
          if (z.x + col.left <= area.left) {
            this._x = area.left - col.left;
          } else if (area.right <= z.x + col.right) {
            this._x = area.right - col.right;
          } else {
            this._x = z.x;
          }
        }
        if (this._movableDirection.y > 0) {
          if (z.y + col.top <= area.top) {
            this._y = area.top - col.top;
          } else if (area.bottom <= z.y + col.bottom) {
            this._y = area.bottom - col.bottom;
          } else {
            this._y = z.y;
          }
        }
      }
    }
    updateOpacity() {
      if (this._opacityDuration > 0) {
        const d = this._opacityDuration;
        this._opacity =
          ((this._opacity || 0) * (d - 1) + this._targetOpacity) / d;
        this._opacityDuration--;
      }
    }
    updateColor() {
      const { _colorDuration, _colorNormal, _colorOnDisable } = this;
      this._opacityDuration = _colorDuration;
      if (this._isDisabled) {
        this._targetOpacity = _colorOnDisable.opacity;
        this.tint(_colorOnDisable.TintColor, _colorDuration);
        return;
      }
      if (!this._isDragging && !this._isPressed && !this._isHovered) {
        this._targetOpacity = _colorNormal.opacity;
        this.tint(_colorNormal.TintColor, _colorDuration);
      }
    }
    updateVariables() {
      if (!this?._variableIds || !this?._variableType) return;
      const { x: idx, y: idy } = this._variableIds;
      if (this._variableType) {
        const pos = new P(
          this._x - this._dragRange.x + this.collision.x,
          this._y - this._dragRange.y + this.collision.y
        );
        const max = new P(
          this._dragRange.right +
            (this.collision.x - this.collision.width) -
            (this._dragRange.x + this.collision.x),
          this._dragRange.bottom +
            (this.collision.y - this.collision.height) -
            (this._dragRange.y + this.collision.y)
        );
        const per = new P(pos.x / max.x, pos.y / max.y).mapping(0, 1, 0, 1);
        switch (this._variableType) {
          case "perint":
            per.calc("mul", 100);
            idx > 0 && $gameVariables.setValue(idx, per.x);
            idy > 0 && $gameVariables.setValue(idy, per.y);
            break;
          case "perflo":
            idx > 0 && ($gameVariables._data[idx] = per.x);
            idy > 0 && ($gameVariables._data[idy] = per.y);
            break;
          case "local":
            idx > 0 && $gameVariables.setValue(idx, pos.x);
            idy > 0 && $gameVariables.setValue(idy, pos.y);
            break;
          case "global":
            idx > 0 && $gameVariables.setValue(idx, this._x);
            idy > 0 && $gameVariables.setValue(idy, this._y);
            break;
        }
      }
    }
    update() {
      super.update();
      if (this._isUI) {
        this.updateTouch();
        this.updateDrag();
        this.updateOpacity();
        this.updateColor();
        this.updateVariables();
      }
    }
    onMouseOver() {
      console.log("onMouseOver");
      if (!this.isAutoMoving) {
        this.callback("over");
      }
      this.triggerColor();
    }
    onMouseOut() {
      console.log("onMouseOut");
      if (!this.isAutoMoving) {
        this.callback("out");
      }
      this.triggerColor();
    }
    onMousePress() {
      console.log("onMousePress");
      if (!this.isAutoMoving) {
        this.callback("press");
        if (this._isDraggable) {
          if (!(this._isDisabled && this._disDraggableWhenDisabled)) {
            this._isDragging = true;
            this._dragPosition = new P(
              TouchInput.x - this.sprite.x,
              TouchInput.y - this.sprite.y
            );
          }
        }
      }
      this.triggerColor();
    }
    onMouseRelease() {
      console.log("onMouseRelease");
      if (!this.isAutoMoving) {
        this.callback("release");
        if (this._isDraggable) {
          this._isDragging = false;
          this.onDragEnd();
        }
      }
      this.triggerColor();
    }
  }

  /*========== ./main.js ==========*/

  PluginManager.registerCommand(pluginName, "setupPictures", function (params) {
    /** @type {Command_SetupPictures} */
    const { list, enableLoadingWait } = parsePluginParams(params);
    console.log({ list, enableLoadingWait }, this);
    (list || []).map(($) => {
      const picture = UIPicture.picture($.pictureId);
      const sprite = UIPicture.sprite($.pictureId);
      picture._isUI = true;
      picture._enableLoadingWait = !!enableLoadingWait;
      picture._callbackInterpreter = this;
      picture.collision = R.from($?.collision || {});
      if ($?.dragConfig) {
        const dragRange = R.from($.dragConfig.range || {});
        picture._dragRange = dragRange;
        picture._movableDirection = $.dragConfig.move
          ? new P(
              +($.dragConfig.move === "horizontal"),
              +($.dragConfig.move === "vertical")
            )
          : new P(1, 1);
        picture._variableType = $.dragConfig.type;
        picture._variableIds = new P(
          $.dragConfig.variableX || 0,
          $.dragConfig.variableY || 0
        );
        picture._disDraggableWhenDisabled =
          !!$.dragConfig.disDraggableWhenDisabled;
      }
      if ($?.textConfig) {
        picture._labelText = $.textConfig.text || "";
        picture._textAlign = $.textConfig.align || "center";
        picture._textOffset = P.from($.textConfig.offset || {}, { x: 0, y: 0 });
      }
      if ($?.colorConfig) {
        picture._colorDuration = $.colorConfig.duration || 1;
        picture._colorNormal = Color.from(
          $.colorConfig.off || {},
          new Color(0, 0, 0, 0, 255)
        );
        picture._colorOnOver = Color.from(
          $.colorConfig.onOver || {},
          picture._colorNormal
        );
        picture._colorOnPress = Color.from(
          $.colorConfig.onPress || {},
          picture._colorNormal
        );
        picture._colorOnDisable = Color.from(
          $.colorConfig.onDisable || {},
          picture._colorNormal
        );
      }
      if ($.callbackConfig) {
        picture._callbackCommonEventId = $.callbackConfig.commonEventId || NaN;
        picture._callbackCommonEventLabelOnOver = $.callbackConfig.onOver || "";
        picture._callbackCommonEventLabelOnOut = $.callbackConfig.onOut || "";
        picture._callbackCommonEventLabelOnPress =
          $.callbackConfig.onPress || "";
        picture._callbackCommonEventLabelOnRelease =
          $.callbackConfig.onRelease || "";
        picture._callbackCommonEventLabelOnDragEnd =
          $.callbackConfig.onDragEnd || "";
      }
      if ($?.position) {
        picture._x = $.position.x;
        picture._y = $.position.y;
      }
      if ($?.debugConfig) {
        /** @type {Bitmap | null} */
        let bitmap = null;
        if ($.debugConfig.forceTransform) {
          bitmap = new Bitmap(
            $.debugConfig.forceTransform.width,
            $.debugConfig.forceTransform.height
          );
        }
        if (bitmap) sprite._onBitmapLoad(bitmap);
      }
    });
  });

  PluginManager.registerCommand(pluginName, "disable", (params) => {
    /** @type {Command_ToggleDisable} */
    const $ = parsePluginParams(params);
    $?.pictureIds?.forEach((id) => {
      const picture = UIPicture.picture(id);
      picture._isDisabled = true;
    });
  });

  PluginManager.registerCommand(pluginName, "enable", (params) => {
    /** @type {Command_ToggleDisable} */
    const $ = parsePluginParams(params);
    $?.pictureIds?.forEach((id) => {
      const picture = UIPicture.picture(id);
      picture._isDisabled = false;
    });
  });
})();
