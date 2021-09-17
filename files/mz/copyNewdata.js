// ツクールMZのRTPをインストール先からコピーするバッチ
//
// 必須: Node.js, RPGツクールMZ
// 0. プロジェクトの素材が上書きされるため、必要ならバックアップを取る
// 1. game.rmmzproject と同じディレクトリにこの JS を置く
// 2. このディレクトリ指定でターミナルを開き、以下のようなコマンドを実行
// node -e "require('./copyNewdata')({dir:'C:/Program Files/KADOKAWA/RPGMZ/newdata',copy:['audio','effects','fonts','icon','img']})"
// 3. RTPが上書きされる
//
// コマンドの詳細
// dir: ツクールMZのインストール先を指定する。
//      省略すると 'C:/Program Files/KADOKAWA/RPGMZ/newdata' が指定される。
// copy: newdata のうちコピーするディレクトリを選ぶ。
//       ['audio','css','data','effects','fonts','icon','img','js','index.html'] が指定可能

const fs = require("fs");
const path = require("path");

const NEWDATA_FILES = [
  "audio",
  "css",
  "data",
  "effects",
  "fonts",
  "icon",
  "img",
  "js",
  "index.html",
];

const isNewdataMember = (list) =>
  list.every((d) => NEWDATA_FILES.find((f) => f === d));

const isNewdata = (path) => {
  const list = fs.readdirSync(path);
  return fs.existsSync(path) && list.length !== 0 && isNewdataMember(list);
};

var copyDir = function (src, dest) {
  fs.existsSync(dest) || fs.mkdirSync(dest);
  const files = fs.readdirSync(src);
  for (let file of files) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    const target = fs.lstatSync(srcFile);
    if (target.isDirectory()) {
      copyDir(srcFile, destFile);
      continue;
    }
    if (target.isSymbolicLink()) {
      fs.symlinkSync(fs.readlinkSync(srcFile), destFile);
      console.log(`DONE: LINK ${srcFile} -> ${destFile}`);
      continue;
    }
    fs.copyFileSync(srcFile, destFile);
    console.log(`DONE: FILE ${srcFile} -> ${destFile}`);
  }
};

module.exports = ({
  dir = "C:/Program Files/KADOKAWA/RPGMZ/newdata",
  copy = [],
}) => {
  if (!isNewdata(dir))
    throw new Error("指定されたディレクトリは newdata ではありません: " + dir);
  if (!isNewdataMember(copy) || copy.length === 0)
    throw new Error("コピー対象の指定が無効です: " + copy);
  copy.forEach((c) => copyDir(`${dir}/${c}`, `./${c}`));
};
