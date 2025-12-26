import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.json();
  const email =
    typeof window !== "undefined"
      ? window.localStorage.getItem("signup_email")
      : null;
  const baseUrl = process.env.API_URL;

  const data = {
    email: email,
    code: payload.code,
  };

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(data);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${baseUrl}/api/auth/verify-email`,
      requestOptions
    );

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
