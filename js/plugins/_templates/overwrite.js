/**
 * @template T
 * @template {keyof T} K
 * @param {T} parent
 * @param {K} overwriteMethod
 * @param {(origin: T[K]) => function (): any} fn
 * ```js
 * overwrite(Object, "keys", (origin) => function(){
 *   return origin.apply(this, arguments)
 * })
 * ```
 */
const overwrite = (parent, overwriteMethod, fn) => {
  parent[overwriteMethod] = fn(parent[overwriteMethod]);
};

export default overwrite; /***__HIDDEN__***/
