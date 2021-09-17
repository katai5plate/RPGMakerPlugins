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
  if (name === "gen-list") {
    fs.writeFileSync(
      "./pluginList.md",
      `# プラグインリスト\n${["mv", "mz"]
        .map(
          (target) =>
            `## ${target}\n${fs
              .readdirSync(`./js/plugins/${target}/`)
              .map((name) => ({
                path: `./js/plugins/${target}/${name}/`,
                name,
              }))
              .map(({ path, name }) =>
                [
                  `\n### ${name}`,
                  `\n\`\`\`\n${fs.readFileSync(
                    resolve(path, "./src/help.txt"),
                    {
                      encoding: "utf8",
                    }
                  )}`,
                  `\n\`\`\`\n- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/plugins/${target}/${name}/dist/${name}.js)`,
                ].join("\n")
              )
              .join("\n")}`
        )
        .join("\n")}`
    );
  }
})();
