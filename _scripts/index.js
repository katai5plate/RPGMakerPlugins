const fs = require("fs-extra");
const chokidar = require("chokidar");
const pathLib = require("path");

const build = require("./build");
const { resolve, write, read, diff } = require("./utils");
const genList = require("./gen/list");
const coreSpliter = require("./coreSpliter");
const spawn = require("cross-spawn");

const [, , name, ...args] = process.argv;

const help = (man) => console.log(`USAGE:\n  ${man}\n`);

const buildAll = () => {
  console.log("mv");
  fs.readdirSync("./js/plugins/mv/").forEach((n) => {
    console.log(n);
    build("mv", n);
  });
  console.log("mz");
  fs.readdirSync("./js/plugins/mz/").forEach((n) => {
    console.log(n);
    build("mz", n);
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
    const path = resolve(`./js/plugins/${args[0]}/${args[1]}/`);
    console.log("WATCHING...", path);
    chokidar.watch(path, { ignored: /\/dist\/.*?\.js/ }).on("change", () => {
      build(args[0], args[1]);
    });
  }
  if (name === "watch-fm") {
    if (!args[0]) {
      return help("watch [mv|mz] [pluginName]");
    }
    if (!["mv", "mz"].includes(args[0])) throw new Error("無効なターゲット");
    const path = resolve(`./js/plugins/${args[0]}/${args[1]}/`);
    console.log("WATCHING...", path);
    chokidar.watch(path, { ignored: /\/dist\/.*?\.js/ }).on("change", () => {
      const pluginFilePath = build(args[0], args[1]);
      const copyTo = `./js/plugins/${
        pathLib.parse(pluginFilePath).name
      }.ignore.js`;
      fs.copyFileSync(pluginFilePath, copyTo);
      console.log("COPY:", copyTo);
    });
  }
  if (name === "clean-fm") {
    const dir = "./js/plugins/";
    fs.readdirSync(dir)
      .filter((f) => f.match(/\.ignore\.js$/))
      .forEach((f) => {
        const path = resolve(dir, `./${f}`);
        console.log("DELETE:", path);
        fs.removeSync(path);
      });
  }
  if (name === "protect") {
    protect();
  }
  if (name === "dev") {
    if (!args[0]) {
      return help("dev [mv|mz]");
    }
    if (!["mv", "mz"].includes(args[0])) throw new Error("無効なターゲット");
    // data をコピー
    fs.copySync(`./data_${args[0]}`, "./data");
    const path = "./data/";
    chokidar.watch(path).on("change", (file) => {
      const baseName = pathLib.basename(file);
      fs.copyFile(`./data/${baseName}`, `./data_${args[0]}/${baseName}`);
      console.log("UPDATE:", baseName, "->", `./data_${args[0]}`);
    });
    // package.json 防御
    protect();
    // ツクール起動
    spawn.sync(
      `./${args[0] === "mv" ? "Game.rpgproject" : "game.rmmzproject"}`
    );
  }
  if (name === "gen-list") {
    genList();
  }
  if (name === "pre-commit") {
    if (!read("json", "./package.json").this_is_safe) {
      throw new Error(
        "package.json が更新されたままコミットしようとしています！"
      );
    }
    console.log("package.json is safe!");
  }
  if (name === "pre-push") {
    buildAll();
    ["mv", "mz"].forEach((target) => {
      const path = `./js/plugins/${target}/`;
      fs.readdirSync(path).forEach((pluginName) => {
        const { length } = fs.readdirSync(
          resolve(path, `./${pluginName}/dist`)
        );
        if (length === 0)
          throw new Error(`${target}/${pluginName} のビルド結果がありません`);
        if (length > 1)
          throw new Error(
            `${target}/${pluginName} のビルド結果が重複しています`
          );
      });
    });
    console.log("The build is no problem!");
    const before = read("file", "./pluginList.md");
    genList();
    const after = read("file", "./pluginList.md");
    if (diff(before, after)) {
      throw new Error("pluginList.md の変更をコミットしてください！");
    }
    console.log("pluginList.md has not changed!");
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
