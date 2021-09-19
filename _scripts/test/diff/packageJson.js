const { read } = require("../../utils");

module.exports = () => {
  if (!read("json", "./package.json").this_is_safe) {
    throw new Error(
      "package.json が更新されたままコミットしようとしています！"
    );
  }
  console.log("package.json is safe!");
};
