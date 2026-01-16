import { NextResponse } from "next/server";

export async function GET(req) {
  const token = req.headers.get("Authorization");
  const baseUrl = process.env.API_URL;

  const response = await fetch(`${baseUrl}/api/referrals`, {
    headers: { Authorization: token },
  });

  const data = await response.json();

  return NextResponse.json({
    status: response.status,
    data,
  });
}