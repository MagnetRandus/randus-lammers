import { GraphError } from "@microsoft/microsoft-graph-client";
import chalk from "chalk";
import { sep } from "path";
import winston, {
  LoggerOptions,
  createLogger,
  format,
  transports,
} from "winston";
import { isGraphError } from "./isGraphError";
const { combine, timestamp, label, printf } = format;

export class Say {
  private logFileName: string;
  LogFormat: winston.Logform.Format;
  private static instance: Say;
  private logDir = `${process.cwd()}${sep}assets${sep}log`;
  private constructor() {
    this.LogFormat = printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] ${level}: ${message}`;
    });

    this.logFileName = `${String(new Date().getDate()).padStart(
      2,
      "0"
    )}-${String(new Date().getMonth()).padStart(2, "0")}-${String(
      new Date().getFullYear()
    )}`;
  }
  public static gI(logDir?: string) {
    //Get instance
    if (!Say.instance) {
      Say.instance = new Say();
    }
    if (logDir && Say.instance.logDir !== logDir) {
      Say.instance = new Say();
      Say.instance.logDir = logDir;
      console.log(
        chalk.bgRed(`Log directory changed to: ${logDir} logging restarted`)
      );
    }
    return Say.instance;
  }
  private SetLogOpts(Label: string) {
    const logOpts: LoggerOptions = {
      level: "info",
      format: combine(label({ label: Label }), timestamp(), this.LogFormat),
      transports: [
        new transports.File({
          filename: `${this.logDir}${sep}${this.logFileName}.log`,
          level: "info",
        }),
      ],
    };
    return createLogger(logOpts);
  }
  Info(Label: string, message: string) {
    this.SetLogOpts(Label).log({ level: "info", message: message });
  }
  Verbose(Label: string, message: string) {
    this.SetLogOpts(Label).log({ level: "verbose", message: message });
  }
  Error(Label: string, errObject: Error): void;
  Error(Label: string, errObject: GraphError): void;
  Error(Label: string, message: string, StatusCode?: string): void;
  Error(Label: string, param: string | Error, StatusCode?: string) {
    if (param instanceof Error) {
      if (isGraphError(param)) {
        const { code, message, statusCode } = param;
        // const { code, innerError, message } = parseGraphErrorBody(param);

        this.SetLogOpts(`GraphError-${Label}: (${statusCode}-${code})`).log({
          level: "error",
          message: message,
        });
      } else {
        this.SetLogOpts(Label).log({ level: "error", message: param.message });
      }
    } else {
      const message = String(param); // param is guaranteed to be a string here
      if (StatusCode) {
        try {
          // Attempt to parse the message safely
          const msg = message.slice(5, message.length);
          const oMsg = JSON.parse(JSON.parse(msg)) as CustomErrorObject;
          this.SetLogOpts(`Request-Promise [${StatusCode}]`).log({
            level: "error",
            message: oMsg.error.message.value,
          });
        } catch (e) {
          // Handle JSON parsing errors gracefully
          this.SetLogOpts(Label).log({ level: "error", message });
        }
      } else {
        this.SetLogOpts(Label).log({ level: "error", message });
      }
    }
  }
}

interface CustomErrorObject {
  error: CustomError;
}

interface CustomError {
  code: string;
  message: Message;
}

interface Message {
  lang: string;
  value: string;
}
