import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  // const authToken = request.cookies.get("auth_token");
  const cookieStore = await cookies();
  const authTokenFromStore = cookieStore.get("auth_token");

  if (!authTokenFromStore) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/students", "/students/add"], // Specify the routes the middleware applies to
};
