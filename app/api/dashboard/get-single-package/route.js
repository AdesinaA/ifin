import { NextResponse } from "next/server";

export async function GET(req) {
  const token = req.headers.get("Authorization");
  const id = req.headers.get("package_id");
  const baseUrl = process.env.API_URL;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${baseUrl}/api/packages/${id}`,
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
