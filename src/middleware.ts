import { NextResponse, type NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import type { NextAuthRequest } from "next-auth/lib";
import { auth } from "@lib/auth";
import { defaultLocale, locales } from "@lib/constants";
import { env } from "@src/env.mjs";

const getRequestLocale = (request: NextRequest) => {
  const languageHeader = request.headers.get("accept-language");
  if (!languageHeader) return defaultLocale;
  const languages = languageHeader
    .split(",")
    .map((language) => language.split(";")[0])
    .map((language) => language.trim());

  return match(languages, locales, defaultLocale);
};

export default auth((request: NextAuthRequest): NextResponse => {
  // Content Security Policy
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'none';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-inline' 'unsafe-eval' ${
      env.NODE_ENV === "development" && "'unsafe-eval'"
    } https: http:;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    connect-src 'self' blob:;
    form-action 'self';
    media-src 'self';
    object-src 'none';
    frame-ancestors 'none';
    base-uri 'none';
    block-all-mixed-content;
  `;
  request.headers.set("x-nonce", nonce);
  request.headers.set("Content-Security-Policy", cspHeader.replace(/\s{2,}/g, " ").trim());

  // Localization
  const pathname = request.nextUrl.pathname.toLowerCase();
  const locale = getRequestLocale(request);
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url));
  }

  // Admin routes protection
  if (!request.auth && pathname.includes("admin") && !pathname.includes("login")) {
    return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
  }

  return NextResponse.next({
    headers: request.headers,
  });
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
  runtime: "experimental-edge",
};
