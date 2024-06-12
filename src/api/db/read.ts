import * as fs from "fs";
import * as readline from "readline";
import { ISchemaA } from "../interfaces/dbSchema";

const readFromJsonlFile = (filePath: string): Promise<ISchemaA[]> => {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity,
    });

    const data: ISchemaA[] = [];

    rl.on("line", (line) => {
      try {
        data.push(JSON.parse(line));
      } catch (err) {
        rl.close();
        reject(err);
      }
    });

    rl.on("close", () => resolve(data));
    rl.on("error", reject);
  });
};

export default readFromJsonlFile;
