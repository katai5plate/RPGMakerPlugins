const fs = require("fs-extra");
const build = require("./build");
const f = require("./build/ano");

const [, , name, ...args] = process.argv;

const help = (man) => console.log(`USAGE:\n  ${man}\n`);

//
(() => {
  if (name === "build") {
    if (!args[0]) {
      return help("build [mv|mz] [pluginName]");
    }
    build(args[0], args[1]);
  }
  if (name === "build-all") {
    console.log("mv");
    fs.readdirSync("./plugins/mv/")
      .filter((n) => n.match(/^H2A_/))
      .forEach((n) => {
        console.log(n);
        build("mv", n);
      });
    console.log("mz");
    fs.readdirSync("./plugins/mz/")
      .filter((n) => n.match(/^H2A_/))
      .forEach((n) => {
        console.log(n);
        build("mz", n);
      });
  }
})();
