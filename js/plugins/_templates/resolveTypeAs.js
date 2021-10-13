/**
 * @template T
 * @param {(type: T) => any} def
 * @param {unknown} from
 * @returns {T}
 */
const resolveTypeAs = (def, from) =>
  //@ts-expect-error
  from;

export default resolveTypeAs; /***__HIDDEN__***/
