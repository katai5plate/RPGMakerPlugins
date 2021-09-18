const buildAno = require("./ano");
const buildCode = require("./code");
const { resolve, tryit, write, formatCode } = require("../utils");

module.exports = (target, pluginName, { verbose } = {}) => {
  const dir = {
    target,
    pluginName,
    path: `./js/plugins/${target}/${pluginName}/`,
  };
  verbose && console.log(dir);

  const config = {
    targetPlatform: dir.target,
    srcDir: resolve(dir.path, "src/"),
    distDir: resolve(dir.path, "dist/"),
  };

  const ano = tryit(() => buildAno(config));
  if (ano instanceof Error) return console.log("FAILED: Annotation ->", ano);
  verbose && console.log("OK: Annotation");

  const code = tryit(() => buildCode(config));
  if (code instanceof Error) return console.log("FAILED: Code ->", code);
  verbose && console.log("OK: Code");

  const result = tryit(() => formatCode([ano, code].join("\n")));
  if (result instanceof Error) return console.log("FAILED: Format ->", result);
  verbose && console.log("OK: Format");

  const outputPath = resolve(config.distDir, `${pluginName}.js`);
  write("file", outputPath, result);
  console.log("DONE:", outputPath);
  return outputPath;
};
