const genList = require("../../gen/list");
const { read, diff } = require("../../utils");

module.exports = () => {
  const before = read("file", "./plugins.json");
  genList();
  const after = read("file", "./plugins.json");
  if (diff(before, after)) {
    throw new Error("plugins.json の変更をコミットしてください！");
  }
  console.log("plugins.json has not changed!");
};
