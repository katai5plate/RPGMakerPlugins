const parsePluginParams = (paramText) =>
  JSON.parse(
    JSON.stringify(paramText, (_, v) => {
      if (/^".*?"$/.test(v)) return v;
      try {
        const p = JSON.parse(v);
        return null === p ? v : p;
      } catch (__) {
        return v === "" ? null : v;
      }
    })
  );

export default parsePluginParams; /***__HIDDEN__***/
