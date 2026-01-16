import { NextResponse } from "next/server";

export async function GET(req) {
  const token = req.headers.get("Authorization");
  const baseUrl = process.env.API_URL;

  const response = await fetch(`${baseUrl}/api/referrals/tree`, {
    headers: {
      Authorization: token,
    },
    cache: "no-store",
  });

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}