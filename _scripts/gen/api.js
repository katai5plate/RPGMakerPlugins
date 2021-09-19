const { write, read, readdir } = require("../utils");

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
        ...readdir(targetPath).reduce((pp, pluginName) => {
          const pluginPath = `${targetPath}/${pluginName}`;
          const {
            plugindesc,
            _license: license,
            _version: version,
            _support: support,
            _languages: languages,
          } = read("json", `${pluginPath}/${SRC_DIR_NAME}/meta.json`);
          const help = read("file", `${pluginPath}/${SRC_DIR_NAME}/help.txt`);
          const meta = read("json", `${pluginPath}/${SRC_DIR_NAME}/meta.json`);
          return [
            ...pp,
            {
              target,
              pluginName,
              src: readdir(`${pluginPath}/${SRC_DIR_NAME}`).reduce(
                (ppp, srcFile) => [...ppp, srcFile],
                []
              ),
              dist: `${pluginName}.js`,
              data: {
                plugindesc,
                license,
                version,
                support,
                languages,
                help,
                meta,
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
