import { Outerbase, OuterbaseConnection } from "@outerbase/sdk";

const connection: OuterbaseConnection = new OuterbaseConnection(
  process.env.API_KEY ?? ""
);
// @ts-ignore
export const db = Outerbase(connection);
