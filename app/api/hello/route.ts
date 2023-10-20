import { NextResponse } from "next/server";
import { limiter } from "../config/limiter";

export const GET = async (request: Request) => {
  const origin = request.headers.get("origin");

  const remaining = await limiter.removeTokens(1);

  if (remaining < 0) {
    return new NextResponse(null, {
      status: 429,
      statusText: "Too many requests",
      headers: {
        "Acces-Control-Allow-Origin": origin || "*",
        "Content-type": "text/plain",
      },
    });
  }

  return new Response("Hello, nextJS");
};
