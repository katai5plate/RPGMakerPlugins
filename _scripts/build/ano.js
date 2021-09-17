/// <reference path="../type.ts" />

const fs = require("fs-extra");

const { resolve, merge, parseSpreadedObj } = require("../utils");

/**
 * meta.json と help.txt をアノテーションコメントに変換する
 * @param {BuildConfig} config
 * @returns {string}
 */
const f = (config) => {
  const { targetPlatform, srcDir } = config;
  const metaFile = fs.readJSONSync(resolve(srcDir, "./meta.json"));
  const helpFile = fs.readFileSync(resolve(srcDir, "./help.txt"), {
    encoding: "utf8",
  });

  const defaultAno = {
    author: "Had2Apps",
    url: "https://github.com/katai5plate/RPGMakerPlugins",
    year: 2021,
  };
  const elementToAno = ({ k, v, i }) =>
    i !== undefined
      ? `${"  ".repeat(i)}@${k} ${
          typeof v === "string" ? v : JSON.stringify(v)
        }`
      : "";

  const { _languages } = metaFile;
  const languages = Array.isArray(_languages) ? ["", ..._languages] : [""];
  const result = languages
    .map((language) => {
      const commentGroup = (body, header = "", language = "") =>
        `/*${header}:${language}\n${body
          .join("\n")
          .split("\n")
          .map((x) => ` * ${x}`)
          .join("\n")}\n */`;
      const meta =
        language !== ""
          ? merge(
              metaFile,
              fs.readJSONSync(resolve(srcDir, `./${language}.json`))
            )
          : metaFile;
      const help =
        language !== ""
          ? fs.readFileSync(resolve(srcDir, `./${language}.txt`), {
              encoding: "utf8",
            })
          : helpFile;
      const {
        _license,
        _version,
        _support,
        _languages,
        author,
        target,
        url,
        params,
        commands,
        structs,
        ...rest
      } = meta;
      const otherAno = {
        target: (target || targetPlatform).toLocaleUpperCase(),
        author: author || defaultAno.author,
        url: url || defaultAno.url,
      };
      return [
        commentGroup(
          [
            parseSpreadedObj(rest).map(elementToAno).join("\n"),
            ...Object.entries(otherAno).map(([k, v]) => `@${k} ${v}`),
            "",
            ...(params || []).map((param) =>
              parseSpreadedObj(param).map(elementToAno).join("\n")
            ),
            ...(commands || []).map((command) =>
              parseSpreadedObj(command).map(elementToAno).join("\n")
            ),
            ...[
              "@help",
              help,
              "",
              {
                MIT: `Copyright (c) ${defaultAno.year} ${otherAno.author}\nThis software is released under the MIT License.`,
                WTFPL: `Copyright (c) ${defaultAno.year} ${otherAno.author}\nThis software is released under the MIT License.`,
              }[_license] ||
                `Copyright (c) ${defaultAno.year} ${otherAno.author}`,
              "",
              _version ? `Version: v${_version}` : "",
              _support
                ? `RPG Maker ${otherAno.target.toLocaleUpperCase()} Version: v${_support}`
                : "",
            ],
          ],
          "",
          language
        ),
        Object.entries(structs || {})
          .map(([k, v]) =>
            commentGroup(
              v.map((p) => parseSpreadedObj(p).map(elementToAno).join("\n")),
              `~struct~${k}`,
              language
            )
          )
          .join("\n"),
      ].join("\n");
    })
    .join("\n");
  return result;
};
module.exports = f;
