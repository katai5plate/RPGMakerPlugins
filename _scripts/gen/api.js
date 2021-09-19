const fs = require("fs-extra");
const { write, read } = require("../utils");

module.exports = () => {
  const baseUrl = "js/plugins";
  const SRC_DIR_NAME = "src";
  const DIST_DIR_NAME = "dist";
  const res = {
    srcUrl: `${baseUrl}/{target}/{pluginName}/${SRC_DIR_NAME}/{src}`,
    distUrl: `${baseUrl}/{target}/{pluginName}/${DIST_DIR_NAME}/{dist}`,
    files: ["mv", "mz"].reduce((p, target) => {
      const targetPath = `./${baseUrl}/${target}`;
      return [
        ...p,
        ...fs.readdirSync(targetPath).reduce((pp, pluginName) => {
          const pluginPath = `${targetPath}/${pluginName}`;
          const {
            plugindesc,
            _license: license,
            _version: version,
            _support: support,
            _languages: languages,
          } = read("json", `${pluginPath}/${SRC_DIR_NAME}/meta.json`);
          const help = read("file", `${pluginPath}/${SRC_DIR_NAME}/help.txt`);
          return [
            ...pp,
            {
              target,
              pluginName,
              src: fs
                .readdirSync(`${pluginPath}/${SRC_DIR_NAME}`)
                .reduce((ppp, srcFile) => [...ppp, srcFile], []),
              dist: `${pluginName}.js`,
              data: {
                plugindesc,
                license,
                version,
                support,
                languages,
                help,
              },
            },
          ];
        }, []),
      ];
    }, []),
  };
  write("json-minify", "./plugins.json", res);
  return res;
};
