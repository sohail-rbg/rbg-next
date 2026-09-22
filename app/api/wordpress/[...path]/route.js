import { NextResponse } from "next/server";

const wpBaseUrl = process.env.WORDPRESS_API_BASE_URL || "https://wp.rebrandgurus.com";

export async function GET(request, { params }) {
  const { path = [] } = await params;
  const upstreamUrl = new URL(`/wp-json/${path.join("/")}`, wpBaseUrl);
  const incomingUrl = new URL(request.url);

  incomingUrl.searchParams.forEach((value, key) => {
    upstreamUrl.searchParams.set(key, value);
  });

  try {
    const response = await fetch(upstreamUrl, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const text = await response.text();

    return new NextResponse(text, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
        "x-wp-total": response.headers.get("x-wp-total") || "",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Could not reach WordPress." },
      { status: 502 }
    );
  }
}
