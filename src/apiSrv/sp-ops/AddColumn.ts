/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "@microsoft/microsoft-graph-client";
import chalk from "chalk";
import { ColumnDefinition } from "../../interfaces/i-columnDefinition";

async function addColumn(
  siteId: string,
  clientInitd: Client,
  listId: string,
  opts: ColumnDefinition
): Promise<any> {
  const q = clientInitd
    .api(`/sites/${siteId}/lists/${listId}/columns`)
    .post(opts);
  console.log(chalk.green(`Added Column: ${(await q).webUrl}`));
  return q;
}

export default addColumn;
