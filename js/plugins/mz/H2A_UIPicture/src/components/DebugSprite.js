//@ts-check
/***__HIDDEN-BEGIN__***/
import { Graphics } from "~types/mz";
import CanvasSprite from "./CanvasSprite";
import UIPicture from "./UIPicture";
/***__HIDDEN-END__***/

class DebugSprite extends CanvasSprite {
  constructor() {
    super(Graphics.boxWidth, Graphics.boxHeight);
  }
  update() {
    this.draw((ctx) => {
      for (let picture of UIPicture.pictures()) {
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

export default DebugSprite; /***__HIDDEN__***/
