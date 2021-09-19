module.exports = (result) => {
  result.forEach(({ target, pluginName, length, isUpdated }) => {
    console.log("TEST:", target, pluginName, length, isUpdated);
    if (length === 0)
      throw new Error(`${target}/${pluginName} のビルド結果がありません`);
    if (length > 1)
      throw new Error(`${target}/${pluginName} のビルド結果が重複しています`);
    if (isUpdated)
      throw new Error(`${target}/${pluginName} の変更がコミットされていません`);
  });
  console.log("The build is no problem!");
};
