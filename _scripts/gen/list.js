const fs = require("fs-extra");
const { resolve } = require("../utils");

module.exports = () => {
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
                `\n\`\`\`\n${fs.readFileSync(resolve(path, "./src/help.txt"), {
                  encoding: "utf8",
                })}`,
                `\n\`\`\`\n- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/js/plugins/${target}/${name}/dist/${name}.js)`,
              ].join("\n")
            )
            .join("\n")}`
      )
      .join("\n")}`
  );
};
