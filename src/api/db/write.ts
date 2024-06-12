import * as fs from "fs";
import { ISchemaA } from "../interfaces/dbSchema";

const writeToJsonlFile = (
  filePath: string,
  data: ISchemaA[]
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filePath, { flags: "a" });
    stream.on("error", reject);
    data.forEach((item) => {
      stream.write(JSON.stringify(item) + "\n");
    });
    stream.end(resolve);
  });
};

export default writeToJsonlFile;
