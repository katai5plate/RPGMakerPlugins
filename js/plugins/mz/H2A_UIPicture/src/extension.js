/// <reference path="./type.ts"/>

CanvasRenderingContext2D.prototype.getTextSize = function (text) {
  const measure = this.measureText(text);
  return {
    width: measure.width,
    height: measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent,
  };
};
CanvasRenderingContext2D.prototype.log = function (value, x = 0, y = 0) {
  const fillStyle = this.fillStyle;
  this.fillStyle = "#fff";
  const text = JSON.stringify(value, null, 2);
  text.split("\n").forEach((line, i) => {
    const { height } = this.getTextSize("あ");
    this.fillText(line, x, y + height * i);
  });
  this.fillStyle = fillStyle;
};
CanvasRenderingContext2D.prototype.line = function (ax, ay, bx, by) {
  this.beginPath();
  this.moveTo(ax, ay);
  this.lineTo(bx, by);
  this.stroke();
};
