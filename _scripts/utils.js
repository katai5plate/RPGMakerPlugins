const fs = require("fs-extra");
const pathLib = require("path");
const deepmerge = require("deepmerge");
const eol = require("eol");
const Diff = require("diff");

module.exports = {
  /**
   * パスを解決する
   * @param  {...string[]} paths
   * @returns {string}
   */
  resolve: (...paths) => pathLib.resolve(...paths),
  /**
   * 配列を含むオブジェクトを再帰的にマージする
   * @param {{}} a
   * @param {{}} b
   * @returns {{}}
   */
  merge: (a, b) =>
    deepmerge(a, b, {
      arrayMerge: (x, y, opt) => {
        const d = x.slice();
        y.forEach((item, index) => {
          if (typeof d[index] === "undefined") {
            d[index] = opt.cloneUnlessOtherwiseSpecified(item, opt);
          } else if (opt.isMergeableObject(item)) {
            d[index] = deepmerge(x[index], item, opt);
          } else if (x.indexOf(item) === -1) {
            d.push(item);
          }
        });
        return d;
      },
    }),
  /**
   * "..." キーが使われたオブジェクトを展開する
   * @param {{}} data
   * @returns {{k:string,v:any,i?:number}[]}
   */
  parseSpreadedObj: (data) => {
    let r = [];
    const s = (x, i) => {
      for (let [k, v] of Object.entries(x)) {
        if (k === "..." && Array.isArray(v)) {
          r = r[r.length - 1].i === undefined ? r : [...r, {}];
          for (let y of v) {
            s(y, i + 1);
          }
          r = r[r.length - 1].i === undefined ? r : [...r, {}];
        } else {
          r = [...r, { k, v, i }];
        }
      }
      r = r[r.length - 1].i === undefined ? r : [...r, {}];
    };
    s(data, 0);
    return r;
  },
  /**
   * エラーが起きるかもしれない処理を実行
   * @param {()=>any} fn
   * @returns {any}
   */
  tryit: (fn) => {
    try {
      return fn();
    } catch (error) {
      return new Error(error);
    }
  },
  /**
   * 読み
   * @param {"text"|"json"} mode
   * @param {string} path
   * @returns
   */
  read: (mode, path) =>
    mode === "json"
      ? fs.readJSONSync(path)
      : fs.readFileSync(path, { encoding: "utf8" }),
  /**
   * 書き
   * @param {"text"|"json"} mode
   * @param {string} path
   * @param {*} data
   * @returns
   */
  write: (mode, path, data) =>
    mode === "json"
      ? fs.writeFileSync(path, eol.lf(JSON.stringify(data, null, 2)))
      : fs.writeFileSync(path, eol.lf(data)),
  /**
   * 比較する
   * @param {string} a
   * @param {string} b
   * @param {string} throwMessage
   * @returns {void|never}
   */
  diff: (a, b, throwMessage) => {
    const [before, after] = [a, b].map((x) =>
      x.replace(/\r/g, "→").replace(/\n/g, "↵\n")
    );
    if (before !== after) {
      const diff = Diff.diffChars(before, after);
      console.log(
        diff
          .slice(
            diff.findIndex((d) => d.added || d.removed),
            -diff.reverse().findIndex((d) => d.added || d.removed)
          )
          .reduce(
            (p, { added, removed, value }) =>
              `${p}${
                added || removed
                  ? `\n==================== ${
                      added ? "ADD" : "REM"
                    } ==============================================================================================================\n|\n${value.replace(
                      /^/gm,
                      "| "
                    )}\n|\n=======================================================================================================================================\n`
                  : value
              }`,
            ""
          )
      );
      throw new Error(throwMessage);
    }
  },
};
