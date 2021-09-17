/// <reference path="../../../_templates/utils.js"/>
/// <reference path="./gameDialog.js"/>

Game_Interpreter.prototype.updateWait = function () {
  return (
    this.updateWaitCount() ||
    this.updateWaitMode() ||
    $gameDialog.loadingFiles.length
  );
};

PluginManager.registerCommand(
  pluginName,
  "exec",
  function ({ path, resetConfig }) {
    const _resetConfig = resetConfig === "true";
    $gameDialog.load(this, path, _resetConfig);
  }
);

PluginManager.registerCommand(pluginName, "resetConfig", function () {
  $gameDialog.config = $gameDialog.initialConfig;
});

PluginManager.registerCommand(
  pluginName,
  "direct",
  function ({ source, resetConfig }) {
    const _resetConfig = resetConfig === "true";
    this._list = [
      ...this._list.slice(0, this._index + 1),
      ...$gameDialog.sourceToCommandList(source, _resetConfig),
      ...this._list.slice(this._index + 1),
    ];
  }
);
