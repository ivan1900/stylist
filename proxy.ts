import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// ponytail: only /dashboard is protected; add more paths here when needed
export const proxy = auth((req: NextRequest & { auth: unknown }) => {
  const isProtected = req.nextUrl.pathname.startsWith("/dashboard")
  if (isProtected && !req.auth) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
