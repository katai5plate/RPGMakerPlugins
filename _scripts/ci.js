const os = require("os");
const fs = require("fs");
console.log({
  EOL: os.EOL,
  readLine: JSON.stringify(
    fs.readFileSync("./_scripts/_temp/readLine", { encoding: "utf8" })
  ),
});
