import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export const runtime = "edge";

export type SessionResponse = {
  sessionKey: string;
};
export async function GET(request: NextRequest) {
  // Do whatever you want
  return NextResponse.json<SessionResponse>(
    { sessionKey: v4() },
    { status: 200 }
  );
}
