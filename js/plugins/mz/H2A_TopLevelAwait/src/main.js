const makeAsyncScript = (script) => `
  this._waitCount = Number.MAX_SAFE_INTEGER;
  (async () => {
    ${script}
  })().then(() => {
    this._waitCount = 0;
  });
`;

Game_Interpreter.prototype.command355 = function () {
  let script = this.currentCommand().parameters[0] + "\n";
  while (this.nextEventCode() === 655) {
    this._index++;
    script += this.currentCommand().parameters[0] + "\n";
  }
  eval(makeAsyncScript(script));
  return true;
};

const processMoveCommand = Game_Character.prototype.processMoveCommand;
Game_Character.prototype.processMoveCommand = function (command) {
  if (command.code === Game_Character.ROUTE_SCRIPT) {
    eval(makeAsyncScript(command.parameters[0]));
  } else {
    processMoveCommand.apply(this, arguments);
  }
};
