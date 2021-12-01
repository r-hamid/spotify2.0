import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  // Token fetching
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;

  if(pathname.includes("/api/auth") || pathname.match(/\.(jpeg|jpg|gif|png)$/) !== null || token) {
    return NextResponse.next();
  }

  if(!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
