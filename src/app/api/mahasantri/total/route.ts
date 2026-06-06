import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  if (!baseURL) {
    return NextResponse.json(
      { error: "API base URL is not configured." },
      { status: 500 }
    );
  }

  const token = request.cookies.get("token")?.value;
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const apiResponse = await fetch(`${baseURL}/mahasantri/total`, {
    headers,
  });

  const payload = await apiResponse.text();
  const contentType = apiResponse.headers.get("content-type") || "";

  if (!apiResponse.ok) {
    return new NextResponse(payload, {
      status: apiResponse.status,
      headers: { "content-type": contentType },
    });
  }

  return new NextResponse(payload, {
    status: 200,
    headers: { "content-type": contentType },
  });
}
