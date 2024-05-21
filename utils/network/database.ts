import { Outerbase, OuterbaseConnection } from "@outerbase/query-builder";

const connection: OuterbaseConnection = new OuterbaseConnection(
  process.env.API_KEY ?? ""
);
export const db = Outerbase(connection);
