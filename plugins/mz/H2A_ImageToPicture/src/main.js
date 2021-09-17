const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const {} = PluginManager.parameters(pluginName);

const bitmapAsyncLoad = (url) => {
  const bitmap = Bitmap.load(url);
  return new Promise((resolve, reject) => {
    const isOk = () => bitmap._loadingState === "loaded";
    const isNg = () => bitmap._loadingState === "error";
    const i = setInterval(() => {
      if (isOk()) {
        clearInterval(i);
        resolve(bitmap);
      }
      if (isNg()) {
        clearInterval(i);
        reject(new Error("存在しない画像: " + url));
      }
    }, 1);
  });
};
window.bitmapAsyncLoad = bitmapAsyncLoad;
const getPicture = (pictureId) =>
  SceneManager._scene.children.find(
    (c) => c.constructor.name === "Spriteset_Map"
  )._pictureContainer.children[pictureId - 1];

PluginManager.registerCommand(
  pluginName,
  "change",
  ({ _id, _name, _index, _splitCountX, _splitCountY }) => {
    const [id, name, index, splitCountX, splitCountY] = [
      Number(_id),
      _name,
      Number(_index),
      Number(_splitCountX),
      Number(_splitCountY),
    ];
    const picture = getPicture(id);
    bitmapAsyncLoad("img/" + name + ".png").then((loadedBitmap) => {
      const paper = new Bitmap(
        loadedBitmap.width / splitCountX,
        loadedBitmap.height / splitCountY
      );
      const [pw, ph] = [paper.width, paper.height];
      paper.context.drawImage(
        loadedBitmap.context.canvas,
        Math.floor((index % splitCountX) * pw),
        Math.floor(Math.floor(index / splitCountX) * ph),
        ...[pw, ph, 0, 0, pw, ph]
      );
      paper.context.canvas.toBlob(
        (blob) => (picture.bitmap = Bitmap.load(URL.createObjectURL(blob)))
      );
    });
  }
);
