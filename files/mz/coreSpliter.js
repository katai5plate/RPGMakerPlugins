// コアスクリプトをクラス毎に分割出力するバッチ
//
// 必須: Node.js
// 1. game.rmmzproject と同じディレクトリにこの JS を置く
// 2. このディレクトリ指定でターミナルを開き node coreSpliter.js を実行
// 3. js/src/ にコアスクリプトが展開されたことを確認する
// 4. index.html の js/main.js を js/src/main.js に変更

const fs = require("fs");

const DELIMIT =
  "//-----------------------------------------------------------------------------";
const UTF8 = { encoding: "utf8" };

const mkdirp = (path) => fs.existsSync(path) || fs.mkdirSync(path);

const list = [
  "core",
  "managers",
  "objects",
  "scenes",
  "sprites",
  "windows",
].map((coreName) => ({
  coreName,
  files: fs
    .readFileSync(`./js/rmmz_${coreName}.js`, UTF8)
    .split(DELIMIT)
    .map((code) => ({
      code,
      className:
        code.match(/^function ([\s\S]*?)\(\) {\n/m)?.[1] ||
        code.match("@namespace (JsExtensions)")?.[1],
    }))
    .filter(({ className }) => className),
}));

const mainJs = fs.readFileSync("./js/main.js", UTF8);

mkdirp("./js/src");

let alterMainJs = mainJs;
list.forEach(({ coreName, files }) => {
  let filenames = [];
  files.forEach(({ code, className }) => {
    const filepath = `js/src/${coreName}/${className}.js`;
    filenames.push(`"${filepath}"`);
    mkdirp(`./js/src/${coreName}`);
    fs.writeFileSync(`./${filepath}`, code);
    console.log(`DONE: ${filepath}`);
  });
  alterMainJs = alterMainJs.replace(
    `"js/rmmz_${coreName}.js"`,
    filenames.join(",\n    ")
  );
});
fs.writeFileSync(`./js/src/main.js`, alterMainJs);
console.log(`DONE: js/src/main.js`);
