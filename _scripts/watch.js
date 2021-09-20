const fs = require("fs-extra");
const pathLib = require("path");
const chokidar = require("chokidar");
const build = require("./build");
const { resolve } = require("./utils");

module.exports = (target, pluginName, { flatMode } = {}) => {
  const path = resolve(`./js/plugins/${target}/${pluginName}/`);
  console.log(flatMode ? "WATCH FLAT_MODE" : "WATCH", target, pluginName);
  console.log("WATCHING...", path);
  if (flatMode) {
    const fmBuild = () => {
      const pluginFilePath = build(target, pluginName);
      const copyTo = `./js/plugins/${
        pathLib.parse(pluginFilePath).name
      }_ignore.js`;
      fs.copyFileSync(pluginFilePath, copyTo);
      console.log("COPY:", copyTo);
    };
    fmBuild();
    chokidar.watch(path, { ignored: /\/dist\/.*?\.js/ }).on("change", () => {
      fmBuild();
    });
  } else {
    chokidar.watch(path, { ignored: /\/dist\/.*?\.js/ }).on("change", () => {
      build(target, pluginName);
    });
  }
};
