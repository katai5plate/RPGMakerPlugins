/// <reference path="./main.js"/>

PluginManager.registerCommand(pluginName, "run", mainProcess);

PluginManager.registerCommand(
  pluginName,
  "script",
  function ({
    scripts,
    // rest
    characterId,
    walkSpeed,
    wait,
    through,
    endSwitch,
  }) {
    mainProcess.apply(this, [
      {
        beforeScripts: scripts,
        characterId,
        walkSpeed,
        wait,
        through,
        endSwitch,
        _noSearch: true,
        isOneStep: false,
        afterScripts: "",
      },
    ]);
  }
);

PluginManager.registerCommand(pluginName, "wait", function ({ endSwitch }) {
  const endSwitchId = +endSwitch;
  this._list = getInjectedListCommands(this._list, this._index, [
    { code: 112, indent: 0, parameters: [] },
    { code: 111, indent: 1, parameters: [0, endSwitchId, 0] },
    { code: 113, indent: 2, parameters: [] },
    { code: 0, indent: 2, parameters: [] },
    { code: 412, indent: 1, parameters: [] },
    { code: 230, indent: 1, parameters: [1] },
    { code: 0, indent: 1, parameters: [] },
    { code: 413, indent: 0, parameters: [] },
  ]);
});
