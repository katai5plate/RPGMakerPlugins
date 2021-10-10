import { AnyObject, AnyThisType, Plugin } from "../other";

export declare class PluginManager {
  static setup(plugins: Plugin[]): void;
  static parameters(name: string): AnyObject;
  static setParameters(name: string, parameters: AnyObject): void;
  static loadScript(filename: string): void;
  static onError(e: ErrorEvent): void;
  static makeUrl(filename: string): string;
  static checkErrors(): string;
  static throwLoadError(url: string): never;
  static registerCommand(
    pluginName: string,
    commandName: string,
    func: Function
  ): void;
  static callCommand(
    self: AnyThisType,
    pluginName: string,
    commandName: string,
    args: unknown
  ): void;

  static _commands: { [key: string]: Function };
  static _errorUrls: string[];
  static _parameters: { [pluginName: string]: AnyObject };
  static _scripts: string[];
}
