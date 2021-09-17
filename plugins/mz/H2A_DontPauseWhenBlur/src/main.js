const params = PluginManager.parameters(
  document.currentScript.src.match(/^.*\/(.*).js$/)[1]
);

const isLiveServer = document.body.innerHTML.includes(
  "<!-- Code injected by live-server -->"
);

if (
  params.whenDebug === "false" ||
  (params.whenDebug === "true" &&
    (["test", "btest", "etest"].some((x) => Utils.isOptionValid(x)) ||
      isLiveServer))
)
  SceneManager.isGameActive = () => true;
