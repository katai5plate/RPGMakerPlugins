const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

const parse = (paramText) =>
  JSON.parse(
    JSON.stringify(paramText, (_, v) => {
      if (/^".*?"$/.test(v)) return v;
      try {
        const p = JSON.parse(v);
        return null === p ? v : p;
      } catch (__) {
        return v;
      }
    })
  );
