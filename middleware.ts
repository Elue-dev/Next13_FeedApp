import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest, res: NextResponse) {
  const bearerToken = req.headers.get("authorization") as string;

  if (!bearerToken) {
    return new NextResponse(JSON.stringify("Unauthorized request."), {
      status: 401,
    });
  }

  const token = bearerToken.split(" ")[1];

  if (!token) {
    return new NextResponse(JSON.stringify("You are not authenticated."), {
      status: 401,
    });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    console.log(error);

    return new NextResponse(
      JSON.stringify("Token is no longer valid. Please log in again."),
      {
        status: 401,
      }
    );
  }
}

export const config = {
  matcher: ["/api/posts"],
};
