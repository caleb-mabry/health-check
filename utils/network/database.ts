import {
  CloudflareD1Connection,
  Outerbase,
  OuterbaseConnection,
} from "@outerbase/sdk";

const connection: CloudflareD1Connection = new CloudflareD1Connection(
  process.env.API_KEY!,
  process.env.ACCOUNT_KEY!,
  process.env.DATABASE_ID!
);
// @ts-ignore
export const db = Outerbase(connection);
