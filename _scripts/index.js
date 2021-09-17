const fs = require("fs-extra");
const chokidar = require("chokidar");
const build = require("./build");
const { resolve } = require("./utils");

const [, , name, ...args] = process.argv;

const help = (man) => console.log(`USAGE:\n  ${man}\n`);

//
(() => {
  if (name === "create") {
    if (!args[0] || !args[1]) {
      return help("build [mv|mz] [pluginName]");
    }
    if (!["mv", "mz"].includes(args[0])) throw new Error("無効なターゲット");
    const path = `./plugins/${args[0]}/${args[1]}`;
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
    console.log("mv");
    fs.readdirSync("./plugins/mv/").forEach((n) => {
      console.log(n);
      build("mv", n);
    });
    console.log("mz");
    fs.readdirSync("./plugins/mz/").forEach((n) => {
      console.log(n);
      build("mz", n);
    });
  }
  if (name === "watch") {
    if (!args[0]) {
      return help("watch [mv|mz] [pluginName]");
    }
    if (!["mv", "mz"].includes(args[0])) throw new Error("無効なターゲット");
    const path = resolve(`./plugins/${args[0]}/${args[1]}/`);
    console.log("WATCHING...", path);
    chokidar.watch(path, { ignored: /\/dist\/.*?\.js/ }).on("change", () => {
      build(args[0], args[1]);
    });
  }
})();
