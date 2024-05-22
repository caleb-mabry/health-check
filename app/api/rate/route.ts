import { db } from "@/utils/network/database";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// To handle a POST request to /api
export async function POST(request: NextRequest) {
  const requestData: {
    sessionKey: string;
    rating: boolean;
  } = await request.json();

  const response = await db.queryRaw(
    `UPDATE conversations SET userrating = ${
      requestData.rating ? 1 : 0
    } where guid = '${requestData.sessionKey}'`,
    []
  );

  return NextResponse.json(
    { message: requestData.sessionKey },
    { status: 200 }
  );
}
