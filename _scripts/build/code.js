/// <reference path="../type.ts" />

const fs = require("fs-extra");

const { resolve, read } = require("../utils");

/**
 * src/*.js からプラグインのソースコードをコンパイル
 * @param {BuildConfig} config
 * @returns
 */
const f = (config) => {
  const { srcDir } = config;
  const baseCode = read("file", resolve(srcDir, "./base.js"));
  const INCLUDE_REGEX = /\/\*\*\*__INCLUDE="(.*?)"__\*\*\*\//;
  const baseIncludeMatches = baseCode
    .match(new RegExp(INCLUDE_REGEX, "g"))
    ?.map((m) => m.match(INCLUDE_REGEX)[1]);
  if (!baseIncludeMatches) throw new Error("INCLUDE が見つかりません");
  const includeFiles = baseIncludeMatches.map((fileName) => {
    const path = resolve(srcDir, fileName);
    return {
      fileName,
      path,
      isExist: fs.existsSync(path),
      replacement: `/***__INCLUDE="${fileName}"__***/`,
    };
  });
  const notFoundFile = includeFiles.find((f) => !f.isExist);
  if (notFoundFile) throw new Error(notFoundFile.path + " が見つかりません");
  const includeFileContents = includeFiles.map((f) => ({
    ...f,
    content: fs
      .readFileSync(f.path, { encoding: "utf8" })
      .replace(/\/\/\/ *< *reference *path.*?>/gm, "") // reference タグ
      .replace(/\/\/\:.*?\:\/\/$/gm, "") // 特殊注釈
      .replace(/^.*?\/\*\*\*__HIDDEN__\*\*\*\/$/gm, "") // HIDDEN
      // HIDDEN-BEGIN-END
      .replace(
        /\/\*\*\*__HIDDEN-BEGIN__\*\*\*\/(.|\n)*?\/\*\*\*__HIDDEN-END__\*\*\*\//gm,
        ""
      )
      .replace(/\/\/@ts-(((no|)check)|expect-error|ignore)/gm, ""), // ts checker,
  }));
  const includedCode = includeFileContents.reduce(
    (p, c) =>
      p.replace(
        c.replacement,
        `/*========== ${c.fileName} ==========*/\n${c.content}\n`
      ),
    baseCode
  );
  return includedCode;
};

module.exports = f;
