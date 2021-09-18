const fs = require("fs-extra");

const { read, formatCode } = require("./utils");

const splitCore = (target) => {
  const delimit =
    "//-----------------------------------------------------------------------------";
  const head = target === "mv" ? "rpg" : "rmmz";
  const list = [
    "core",
    "managers",
    "objects",
    "scenes",
    "sprites",
    "windows",
  ].reduce(
    (p, name) => [
      ...p,
      ...read("file", `./js/${head}_${name}.js`)
        .split(delimit)
        .map((code) => ({
          code,
          name,
          className:
            code.match(/^function ([A-Z][a-zA-Z0-9_]+)\(\) \{\n/m)?.[1] ||
            code.match(/^function ([A-Z][a-zA-Z0-9_]+)\(\) \{\r\n/m)?.[1] ||
            code.match("@namespace (JsExtensions)")?.[1],
        }))
        .map((data) => ({
          ...data,
          filename: `${data.name}/${data.className}`,
        }))
        .filter(({ className }) => className),
    ],
    []
  );

  list.forEach(({ code, filename }) => {
    console.log(filename);
    fs.outputFileSync(`./js/src/${target}/${filename}.js`, formatCode(code));
  });

  fs.outputJSONSync(
    `./js/src/${target}/meta.json`,
    { delimit, filenames: list.map((x) => x.filename) },
    { spaces: 2 }
  );
};
module.exports = () => {
  ["mv", "mz"].forEach(splitCore);
};
