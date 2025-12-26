import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.json();
  const baseUrl = process.env.API_URL;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(payload);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(`${baseUrl}/api/auth/signup`, requestOptions);

    const responseData = await response?.json();

    if (!response.ok) {
      return NextResponse.json({
        status: response.status,
        error: responseData,
      });
    }

    return NextResponse.json({
      status: response.status,
      data: responseData,
    });
  } catch (error) {
    console.log(error);
  }
}
