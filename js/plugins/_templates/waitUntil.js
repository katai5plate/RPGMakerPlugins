/**
 * @param {() => boolean} cond
 * @param {() => void} then
 * @param {{ms?:number, delay?:number}} [config]
 */
const waitUntil = (cond, then, config = {}) => {
  let i = setInterval(() => {
    if (cond()) {
      config.delay && !Number.isNaN(config.delay)
        ? setTimeout(then, config.delay)
        : then();
      clearInterval(i);
    }
  }, config.ms || 100);
};

export default waitUntil; /***__HIDDEN__***/
