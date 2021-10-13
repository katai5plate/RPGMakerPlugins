/*:ja
 * @plugindesc
 *
 * @target MZ
 * @author Had2Apps
 * @url https://github.com/katai5plate/RPGMakerPlugins
 *
 * @command setup
 * @text 設定
 *
 *   @arg pictureId
 *   @text ピクチャID
 *   @type number
 *   @min 1
 *   @max 100
 *
 *   @arg collision
 *   @text 当たり判定
 *   @desc 省略・不備の場合は画像サイズがそのまま設定されます
 *   @type struct<R>
 *
 *   @arg dragConfig
 *   @text ドラッグ設定
 *   @desc 省略・不備の場合はドラッグ無効になります
 *   @type struct<DragConfig>
 *
 *   @arg textConfig
 *   @text 文字列設定
 *   @desc 省略・不備の場合は文字列は表示されません
 *   @type struct<TextConfig>
 *
 *   @arg colorConfig
 *   @text 色調設定
 *   @desc 省略・不備の場合は色調は変化しないか、通常時と同じになります
 *   @type struct<ColorConfig>
 *
 *   @arg soundConfig
 *   @text 効果音設定
 *   @desc 省略・不備の場合は鳴りません
 *   @type struct<SoundConfig>
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
 * @desc マイナス入力OK
 *
 * @param y
 * @text 縦軸座標
 * @type number
 * @desc マイナス入力OK
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
 * @min 0
 * @max 255
 * @default 0
 *
 * @param g
 * @type number
 * @text 緑
 * @min 0
 * @max 255
 * @default 0
 *
 * @param b
 * @type number
 * @text 青
 * @min 0
 * @max 255
 * @default 0
 *
 * @param v
 * @type number
 * @text 強度
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
/*~struct~SE:ja
 * @param name
 * @text ファイル名
 * @type file
 * @dir audio/se
 *
 * @param volume
 * @text 音量
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param pitch
 * @text ピッチ
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @param pan
 * @text 定位
 * @type number
 * @min -100
 * @max 100
 * @default 0
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
 * @param off
 * @type struct<C>
 * @text 通常
 * @desc 省略・不備の場合は変化しません
 *
 * @param onOver
 * @type struct<C>
 * @text マウスオーバー時
 * @desc 省略・不備の場合は通常と同じになります
 *
 * @param onPress
 * @type struct<C>
 * @text 押下時
 * @desc 省略・不備の場合は通常と同じになります
 *
 * @param onDisable
 * @type struct<C>
 * @text 無効時
 * @desc 省略・不備の場合は通常と同じになります
 *
 */
/*~struct~SoundConfig:ja
 * @param normal
 * @type struct<SoundConfigDetail>
 * @text 通常時
 * @desc 省略・不備の場合は鳴りません
 *
 * @param onDisable
 * @type struct<SoundConfigDetail>
 * @text 無効時
 * @desc 省略・不備の場合は鳴りません
 *
 */
/*~struct~SoundConfigDetail:ja
 * @param onOver
 * @type struct<SE>
 * @text マウスオーバー時
 * @desc 省略・不備の場合は鳴りません
 *
 * @param onOut
 * @type struct<SE>
 * @text マウスアウト時
 * @desc 省略・不備の場合は鳴りません
 *
 * @param onPress
 * @type struct<SE>
 * @text 押下時
 * @desc 省略・不備の場合は鳴りません
 *
 * @param onRelease
 * @type struct<SE>
 * @text リリース時
 * @desc 省略・不備の場合は鳴りません
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
     * @param {P} p
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
    calc(op, x, y, w, h) {
      let _y = y,
        _w = w,
        _h = h;
      !y && (_y = x);
      !w && !h && (_w = x), (_h = _y);
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
  }

  class Color {
    constructor(r = 0, g = 0, b = 0, v = 0, a = 0) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.v = v;
      this.a = a;
    }
  }

  class Sound {
    constructor(name = "", volume = 0, pitch = 0, pan = 0) {
      this.name = name;
      this.volume = volume;
      this.pitch = pitch;
      this.pan = pan;
    }
    play() {
      AudioManager.playSe(this);
    }
  }

  /*========== ./components/UISprite.js ==========*/

  class UIPicture {
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
  }

  /*========== ./components/CanvasSprite.js ==========*/

  class CanvasSprite extends PIXI.Sprite {
    #context;
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
    get ctx() {
      return this.#context;
    }
    flip() {
      this.texture.update();
    }
    update() {
      //
    }
  }

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
    /** @type {boolean} */
    _isDragging = false;
    /** @type {P} */
    _dragPosition = new P();
    /** @type {boolean} */
    _isDraggable = true;
    /** @type {Sprite_UIPictureLabel} */
    _labelSprite;
    constructor(pictureId) {
      super(pictureId);
    }
    /** @override @returns {Game_UIPicture} */
    picture() {
      return resolveTypeAs(
        /** @param {Game_UIPicture} _ */ (_) => _,
        super.picture()
      );
    }
    get isForeground() {
      return (
        Math.max(
          ...resolveTypeAs(
            /** @param {Sprite_UIPicture[]} _ */ (_) => _,
            SceneManager._scene?._spriteset?._pictureContainer?.children || []
          )
            ?.filter((x) => x.isBeingTouched())
            .map((x) => x._pictureId)
        ) === this._pictureId
      );
    }
    /** @param {Bitmap} bitmapLoaded */
    _onBitmapLoad(bitmapLoaded) {
      const picture = this.picture();
      picture._width = bitmapLoaded.width;
      picture._height = bitmapLoaded.height;
      this._labelSprite = new Sprite_UIPictureLabel(this._pictureId);
      this.addChild(
        resolveTypeAs(
          /** @param {PIXI.DisplayObject} _ */ (_) => _,
          this._labelSprite
        )
      );
      return super._onBitmapLoad(bitmapLoaded);
    }
    isBeingTouched() {
      const picture = this.picture();
      if (!picture) return super.isBeingTouched();
      return new R(
        this.x + picture.collision.x,
        this.y + picture.collision.y,
        picture.collision.width,
        picture.collision.height
      ).hit(new P(TouchInput.x, TouchInput.y));
    }
    updateTouch() {
      if (this.worldVisible) {
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
    }
    onDragEnd() {
      //
    }
    updateDrag() {
      const picture = this.picture();
      if (!picture) return;
      if (!this._isDraggable || !this._isDragging) return;
      if (!TouchInput.isPressed() || (this._isHovered && !this._isPressed)) {
        this._isDragging = false;
        this.onDragEnd();
      }
      const z = new P(
        TouchInput.x - this._dragPosition.x,
        TouchInput.y - this._dragPosition.y
      );
      const area = picture._dragRange;
      /** @type {R} */
      const col = picture.collision;
      if (picture.enableDrag) {
        if (picture._movableDirection.x > 0) {
          if (z.x + col.left <= area.left) {
            picture._x = area.left - col.left;
          } else if (area.right <= z.x + col.right) {
            picture._x = area.right - col.right;
          } else {
            picture._x = z.x;
          }
        }
        if (picture._movableDirection.y > 0) {
          if (z.y + col.top <= area.top) {
            picture._y = area.top - col.top;
          } else if (area.bottom <= z.y + col.bottom) {
            picture._y = area.bottom - col.bottom;
          } else {
            picture._y = z.y;
          }
        }
      }
    }
    updateColor() {
      if (this._isDragging || this._isPressed) {
        this.setBlendColor([0, 0, 0, 63]);
      } else if (this._isHovered) {
        this.setBlendColor([255, 255, 255, 63]);
      } else {
        this.setBlendColor([0, 0, 0, 0]);
      }
    }
    updateVariables() {
      const picture = this.picture();
      if (!picture || !picture?._variableIds || !picture?._variableType) return;
      const { x: idx, y: idy } = picture._variableIds;
      if (picture._variableType) {
        const pos = new P(
          picture._x - picture._dragRange.x + picture.collision.x,
          picture._y - picture._dragRange.y + picture.collision.y
        );
        const max = new P(
          picture._dragRange.right +
            (picture.collision.x - picture.collision.width) -
            (picture._dragRange.x + picture.collision.x),
          picture._dragRange.bottom +
            (picture.collision.y - picture.collision.height) -
            (picture._dragRange.y + picture.collision.y)
        );
        const per = new P(pos.x / max.x, pos.y / max.y).mapping(0, 1, 0, 1);
        switch (picture._variableType) {
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
            idx > 0 && $gameVariables.setValue(idx, picture._x);
            idy > 0 && $gameVariables.setValue(idy, picture._y);
            break;
        }
      }
    }
    update() {
      super.update();
      this.updateTouch();
      this.updateDrag();
      this.updateColor();
      this.updateVariables();
    }
    onMouseOver() {
      console.log("-[->]");
    }
    onMouseOut() {
      console.log("OUT");
    }
    onMousePress() {
      if (this._isDraggable) {
        this._isDragging = true;
        this._dragPosition = new P(
          TouchInput.x - this.x,
          TouchInput.y - this.y
        );
      }
      console.log("press");
    }
    onMouseRelease() {
      console.log("release");
      if (this._isDraggable) {
        this._isDragging = false;
        this.onDragEnd();
      }
    }
  }

  /*========== ./components/Game_UIPicture.js ==========*/

  class Game_UIPicture extends Game_Picture {
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
    /** @type {string} */
    _labelText = "";
    /** @type {CanvasTextAlign} */
    _textAlign = "center";
    /** @type {P} */
    _textOffset = new P(0, 0);
    /** @type {number} */
    _width;
    /** @type {number} */
    _height;
    /** @param {number} pictureId */
    constructor(pictureId) {
      super();
      this._pictureId = pictureId;
      console.log(this);
    }
    get collision() {
      // MEMO: anchor が 0.5 の時は xy はマイナスになる
      const anchor = +!!this.origin() * 0.5;
      // 判定が壊れている場合は画像サイズを代用する
      const safeCol = this._collision.isSafe
        ? this._collision
        : new R(0, 0, this._width, this._height);
      const sx = this._scaleX / 100;
      const sy = this._scaleY / 100;
      const px = -anchor * this._width;
      const py = -anchor * this._height;
      return new R(
        px + safeCol.x,
        py + safeCol.y,
        safeCol.width,
        safeCol.height
      ).calc("mul", sx, sy);
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
  }

  /*========== ./main.js ==========*/

  PluginManager.registerCommand(pluginName, "setup", (params) => {
    /**
     * @type {Partial<{
     *  pictureId: number
     *  collision: R
     *  dragConfig: {
     *    range: R,
     *    move: "horizontal"|"vertical"
     *    type: "perint"|"perflo"|"local"|"global"
     *    variableX: number
     *    variableY: number
     *  }
     *  textConfig: {
     *    text: string,
     *    align: "left"|"right"
     *    offset: P
     *  }
     *  colorConfig: {
     *    off: Color
     *    onOver: Color
     *    onPress: Color
     *    onDisable: Color
     *  }
     *  soundConfig: {
     *    normal: {
     *      onOver: Sound
     *      onOut: Sound
     *      onPress: Sound
     *      onRelease: Sound
     *    }
     *    onDisable: {
     *      onOver: Sound
     *      onOut: Sound
     *      onPress: Sound
     *      onRelease: Sound
     *    }
     *  }
     * }>}
     */
    const $ = parsePluginParams(params);
    console.log({ $ });
    const picture = UIPicture.picture($.pictureId);
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
    }
    if ($?.textConfig) {
      picture._labelText = $.textConfig.text || "";
      picture._textAlign = $.textConfig.align || "center";
      picture._textOffset = P.from($.textConfig.offset || {}, { x: 0, y: 0 });
    }
  });

  const isMapTouchOk = Scene_Map.prototype.isMapTouchOk;
  Scene_Map.prototype.isMapTouchOk = function () {
    const children = resolveTypeAs(
      /** @param {Sprite_UIPicture[] | null} _ */ (_) => _,
      SceneManager._scene?._spriteset?._pictureContainer?.children
    );
    return (
      isMapTouchOk.apply(this, arguments) &&
      !children.find((b) => b.isBeingTouched())
    );
  };

  Spriteset_Base.prototype.createPictures = function () {
    const rect = this.pictureContainerRect();
    this._pictureContainer = new Sprite();
    this._pictureContainer.setFrame(rect.x, rect.y, rect.width, rect.height);
    for (let i = 1; i <= $gameScreen.maxPictures(); i++) {
      this._pictureContainer.addChild(new Sprite_UIPicture(i));
    }
    this.addChild(this._pictureContainer);
  };

  Game_Screen.prototype.showPicture = function (
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
    const realPictureId = this.realPictureId(pictureId);
    const picture = new Game_UIPicture(pictureId);
    picture.show(name, origin, x, y, scaleX, scaleY, opacity, blendMode);
    this._pictures[realPictureId] = picture;
  };
})();
