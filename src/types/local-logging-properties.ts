import { Say } from "Local/logger/Logger";

export type TErrorLevel = Exclude<keyof Say, "LogFormat" | "Logger">;
