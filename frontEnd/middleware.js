import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const config = {
  matcher: [
    "/profile/:path*",
    "/checkout/:path*",
    "/admin/:path*",   // ⚡ حتما :path* بعد /admin باشه
  ],
};

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  // دریافت کوکی‌ها
  const userToken = req.cookies.get("token")?.value;
  const adminToken = req.cookies.get("adminToken")?.value;

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  // =========================
  // 🔐 USER ROUTES (SMS LOGIN)
  // =========================
  const userProtectedPaths = ["/profile", "/checkout"];
  const isUserRoute = userProtectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isUserRoute) {
    if (!userToken) {
     const loginUrl = new URL("/login", req.url);

loginUrl.searchParams.set(
  "redirect",
  pathname
);

return NextResponse.redirect(loginUrl);
    }

    try {
      await jwtVerify(userToken, secret);
    } catch (err) {
      const loginUrl = new URL("/login", req.url);

loginUrl.searchParams.set(
  "redirect",
  pathname
);

return NextResponse.redirect(loginUrl);
    }
  }

  // =========================
  // 🛡 ADMIN ROUTES
  // =========================
  const normalizedPath = pathname.replace(/\/$/, ""); // حذف اسلش آخر

  if (normalizedPath.startsWith("/admin")) {
    // اجازه بده صفحه login بدون توکن باز شود
    if (normalizedPath === "/admin/login") return NextResponse.next();

    // اگر کوکی admin وجود ندارد → ریدایرکت به login
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      const { payload } = await jwtVerify(adminToken, secret);

      // فقط admin یا superadmin اجازه دسترسی دارند
      if (payload.role !== "admin" && payload.role !== "superadmin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (err) {
      // توکن نامعتبر → ریدایرکت به login
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}