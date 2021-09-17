const fs = require("fs-extra");
const prettier = require("prettier");

const buildAno = require("./ano");
const buildCode = require("./code");
const { resolve } = require("../utils");

module.exports = (target, pluginName, { verbose } = {}) => {
  const dir = {
    target,
    pluginName,
    path: `./plugins/${target}/${pluginName}/`,
  };
  verbose && console.log(dir);

  const config = {
    targetPlatform: dir.target,
    srcDir: resolve(dir.path, "src/"),
    distDir: resolve(dir.path, "dist/"),
  };

  const ano = buildAno(config);
  verbose && console.log("OK: Annotation");

  const code = buildCode(config);
  verbose && console.log("OK: Code");

  const result = prettier.format([ano, code].join("\n"), {
    parser: "babel",
  });
  verbose && console.log("OK: Format");

  const outputPath = resolve(config.distDir, "bundle.js");
  fs.writeFileSync(outputPath, result);
  console.log("DONE:", outputPath);
};
