import { NextResponse, type NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
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

export function middleware(request: NextRequest): NextResponse {
  // Server action ignore
  if (request.headers.get("content-type")?.includes("multipart/form-data")) {
    return NextResponse.next();
  }

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
    connect-src 'self';
    form-action 'self';
    object-src 'none';
    frame-ancestors 'none';
    base-uri 'none';
    block-all-mixed-content;
  `;
  request.headers.set("x-nonce", nonce);
  request.headers.set("Content-Security-Policy", cspHeader.replace(/\s{2,}/g, " ").trim());

  // Localization
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale = getRequestLocale(request);
    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url));
  }

  return NextResponse.next({
    headers: request.headers,
  });
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
