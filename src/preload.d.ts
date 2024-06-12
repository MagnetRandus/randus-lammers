import { ElectronHandler } from "./preload";

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    eapi: ElectronHandler;
  }
}

export {};
