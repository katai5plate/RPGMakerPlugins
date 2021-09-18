const fs = require("fs-extra");
const { resolve, write, read } = require("../utils");

module.exports = () => {
  write(
    "text",
    "./pluginList.md",
    `# プラグインリスト\n${["mv", "mz"]
      .map(
        (target) =>
          `## ${target}\n${fs
            .readdirSync(`./js/plugins/${target}/`)
            .sort()
            .map((name) => ({
              path: `./js/plugins/${target}/${name}/`,
              name,
            }))
            .map(({ path, name }) =>
              [
                `\n### ${name}`,
                `\n\`\`\`\n${read("file", resolve(path, "./src/help.txt"))}`,
                `\n\`\`\`\n- [ダウンロードはこちら(Rawボタンを右クリックして保存)](https://github.com/katai5plate/RPGMakerPlugins/blob/main/js/plugins/${target}/${name}/dist/${name}.js)`,
              ].join("\n")
            )
            .join("\n")}`
      )
      .join("\n")}`
  );
};
