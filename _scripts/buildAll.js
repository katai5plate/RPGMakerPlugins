const build = require("./build");
const testBuildResult = require("./test/buildResult");
const { diff, read, readdir } = require("./utils");

module.exports = ({ thenTest } = {}) => {
  const result = ["mv", "mz"].reduce(
    (p, target) => [
      ...p,
      ...readdir(`./js/plugins/${target}/`).reduce((pp, pluginName) => {
        const distDir = `./js/plugins/${target}/${pluginName}/dist/`;
        const readFile = () => read("file", `${distDir}/${pluginName}.js`);
        const before = readFile();
        console.log(pluginName);
        build(target, pluginName);
        const after = readFile();
        const { length } = readdir(distDir);
        return [
          ...pp,
          {
            target,
            pluginName,
            length,
            isUpdated: diff(before, after, true),
          },
        ];
      }, []),
    ],
    []
  );
  if (thenTest) {
    testBuildResult(result);
  }
};
