const genList = require("../../gen/list");
const { read, diff } = require("../../utils");

module.exports = () => {
  const before = read("file", "./pluginList.md");
  genList();
  const after = read("file", "./pluginList.md");
  if (diff(before, after)) {
    throw new Error("pluginList.md の変更をコミットしてください！");
  }
  console.log("pluginList.md has not changed!");
};
