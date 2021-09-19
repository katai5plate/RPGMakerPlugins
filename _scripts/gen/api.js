const fs = require("fs-extra");
const { write } = require("../utils");

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
          return [
            ...pp,
            {
              target,
              pluginName,
              src: fs
                .readdirSync(`${pluginPath}/${SRC_DIR_NAME}`)
                .reduce((ppp, srcFile) => [...ppp, srcFile], []),
              dist: `${pluginName}.js`,
            },
          ];
        }, []),
      ];
    }, []),
  };
  write("json-minify", "./plugins.json", res);
  return res;
};
