import { SessionResponse } from "@/app/api/session/route";
import { NextResponse } from "next/server";

export const getSessionKey = async () => {
  const apiResponse = await fetch("/api/session");
  const parsedResponse = await apiResponse.json();
  return parsedResponse.sessionKey;
};
