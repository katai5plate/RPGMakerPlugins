const fs = require("fs-extra");
const pathLib = require("path");
const chokidar = require("chokidar");
const spawn = require("cross-spawn");

const build = require("./build");
const buildAll = require("./buildAll");
const watch = require("./watch");
const coreSpliter = require("./coreSpliter");
const { resolve, write, read, readdir } = require("./utils");

const genList = require("./gen/list");
const genApi = require("./gen/api");

const diffPackageJson = require("./test/diff/packageJson");
const diffPluginList = require("./test/diff/pluginList");
const diffApi = require("./test/diff/api");

const [, , name, ...args] = process.argv;

const help = (man) => console.log(`USAGE:\n  ${man}\n`);

const watchData = (target, onUpdate) => {
  // data をコピー
  fs.copySync(`./data_${target}`, "./data");
  try {
    fs.copySync(`./js/plugins_${target}.js`, "./js/plugins.js");
  } catch {
    fs.copySync(`./js/${target}.plugins.js`, "./js/plugins.js");
  }
  console.log("RESTORED: ./data/* ./js/plugins.js");
  // 変更を監視
  const getSecond = () => (Date.now() / 1000) | 0;
  let date;
  chokidar
    .watch([
      "./package.json",
      ...fs
        .readdirSync(`./js/plugins/${target}/`)
        .map((pluginName) => `./js/plugins/${target}/${pluginName}/src`),
      "./js/plugins/_templates/",
    ])
    .on("all", (f) => {
      const now = (Date.now() / 1000) | 0;
      if (date !== now) {
        fs.copySync("./data", `./data_${target}`);
        fs.copySync("./js/plugins.js", `./js/plugins_${target}.js`);
        console.log(`BACKUPED: ./data_mz/* ./js/plugins_${target}.js`);
        onUpdate();
        date = getSecond();
      }
    });
};

const protect = () => {
  const path = resolve(`./package.json`);
  const origin = read("file", path);
  if (!origin.match(/this_is_safe/))
    throw new Error("package.json はすでに書き換わっています！");
  console.log("PROTECT...", path);
  chokidar.watch(path).on("change", () => {
    write("file", path, origin);
    console.log("REVERT:", path);
  });
};

//
(() => {
  if (name === "create") {
    if (!args[0] || !args[1]) {
      return help("build [mv|mz] [pluginName]");
    }
    if (!["mv", "mz"].includes(args[0])) throw new Error("無効なターゲット");
    const path = `./js/plugins/${args[0]}/${args[1]}`;
    fs.copySync("./_empty", resolve(path, "./src"));
    fs.mkdirp(resolve(path, "./dist"));
    fs.writeFileSync(resolve(path, `./dist/${args[1]}.js`), "// Not yet built");
  }
  if (name === "build") {
    if (!args[0]) {
      return help("build [mv|mz] [pluginName]");
    }
    if (!["mv", "mz"].includes(args[0])) throw new Error("無効なターゲット");
    build(args[0], args[1]);
  }
  if (name === "build-all") {
    buildAll();
  }
  if (name === "watch") {
    if (!args[0]) {
      return help("watch [mv|mz] [pluginName]");
    }
    if (!["mv", "mz"].includes(args[0])) throw new Error("無効なターゲット");
    watch(args[0], args[1]);
  }
  if (name === "watch-fm") {
    if (!args[0]) {
      return help("watch [mv|mz] [pluginName]");
    }
    if (!["mv", "mz"].includes(args[0])) throw new Error("無効なターゲット");
    watch(args[0], args[1], { flatMode: true });
  }
  if (name === "clean-fm") {
    const dir = "./js/plugins/";
    readdir(dir)
      .filter((f) => f.match(/_ignore\.js$/))
      .forEach((f) => {
        const path = resolve(dir, `./${f}`);
        console.log("DELETE:", path);
        fs.removeSync(path);
      });
  }
  if (name === "protect") {
    protect();
  }
  if (name === "dev-mv") {
    if (!args[0]) {
      return help("dev-mv [pluginName]");
    }
    if (!args[0]) throw new Error("無効な名称");
    watchData("mv");
    protect();
    // watch
    watch("mv", args[1], { flatMode: true });
  }
  if (name === "dev-mz") {
    watchData("mz", () => {
      console.log("BUILDING...");
      buildAll({ target: ["mz"] });
      console.log("BUILD-COMPLETED");
    });
    protect();
  }
  if (name === "gen-list") {
    genList();
  }
  if (name === "gen-api") {
    genApi();
  }
  if (name === "pre-commit") {
    diffPackageJson();
  }
  if (name === "pre-push") {
    buildAll({ thenTest: true });
    diffPluginList();
    diffApi();
  }
  if (name === "update") {
    buildAll();
    genList();
    genApi();
  }
  if (name === "core-split") {
    coreSpliter();
    console.log("done");
  }
  if (name === "snap-pg") {
    if (!args[0]) {
      return help("snap-pg [get|set] [name]");
    }
    if (!["get", "set"].includes(args[0]) || [undefined, ""].includes(args[1]))
      throw new Error("無効な引数");
    const filePath = `./js/${args[1]}.snapshot.plugins.js`;
    const originPath = "./js/plugins.js";
    if (args[0] === "get") {
      fs.copySync(originPath, filePath);
      console.log("CREATE:", originPath, "->", filePath);
    }
    if (args[0] === "set") {
      fs.copySync(filePath, originPath);
      console.log("OVERWRITE:", filePath, "->", originPath);
    }
  }
})();
