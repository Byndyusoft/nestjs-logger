import { PackageJsonConfig } from "./packageJsonConfig";
import { LoggerConfig } from "./loggerConfig";

export interface RegisterLoggerOptions {
  readonly packageJson: PackageJsonConfig;

  readonly env: string;

  readonly loggerConfig: LoggerConfig;
}
