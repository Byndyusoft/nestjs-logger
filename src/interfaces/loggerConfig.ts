import { LogLevel } from "@byndyusoft/pino-logger-factory/src/enums/logLevel";

export interface LoggerConfig {
  readonly level: LogLevel;

  readonly pretty: boolean;
}
