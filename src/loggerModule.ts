import {
  PinoHttpLoggerOptionsBuilder,
  PinoLoggerFactory,
  PinoLoggerOptionsBuilder,
} from "@byndyusoft/pino-logger-factory";
import { DynamicModule, Module } from "@nestjs/common";
import { LoggerModule as PinoLoggerModule } from "nestjs-pino";

import { RegisterLoggerOptions } from "./interfaces/registerLoggerOptions";

// We need increase nestjs-pino LoggerModule topological level for correct middlewares register
@Module({})
export class LoggerModule {
  public static forRoot(options: RegisterLoggerOptions): DynamicModule {
    return {
      module: LoggerModule,
      global: true,
      imports: [
        PinoLoggerModule.forRootAsync({
          useFactory: () => ({
            pinoHttp: new PinoHttpLoggerOptionsBuilder()
              .withLogger(
                new PinoLoggerFactory().create(
                  new PinoLoggerOptionsBuilder()
                    .withBase({
                      name: options.packageJson?.serviceName,
                      version: options.packageJson?.version,
                      env: options.env,
                    })
                    .withLevel(options.loggerConfig.level)
                    .withPrettyPrint(options.loggerConfig.pretty)
                    .build(),
                ),
              )
              .build(),
          }),
        }),
      ],
    };
  }
}
