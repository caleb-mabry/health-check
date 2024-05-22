import { db } from "@/utils/network/database";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// To handle a POST request to /api
export async function POST(request: NextRequest) {
  const requestData: {
    sessionKey: string;
    conversation: string;
  } = await request.json();

  const response = await db
    .insert({
      guid: requestData.sessionKey,
      conversation: requestData.conversation,
    })
    .into("conversations")
    .query();

  // Do whatever you want
  return NextResponse.json(
    { message: requestData.sessionKey },
    { status: 200 }
  );
}
