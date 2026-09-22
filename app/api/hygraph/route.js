import { NextResponse } from "next/server";

export async function POST(request) {
  const endpoint = process.env.HYGRAPH_ENDPOINT;
  const token = process.env.HYGRAPH_TOKEN;

  if (!endpoint || !token) {
    return NextResponse.json(
      { error: "Hygraph environment variables are missing." },
      { status: 500 }
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid GraphQL request body." },
      { status: 400 }
    );
  }

  let response;

  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Could not reach Hygraph." },
      { status: 502 }
    );
  }

  const text = await response.text();

  return new NextResponse(text, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "application/json",
    },
  });
}
