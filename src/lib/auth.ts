import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { env } from "@src/env.mjs";

export const config = {
  providers: [
    GitHub({ clientId: env.AUTH_GITHUB_ID, clientSecret: env.AUTH_GITHUB_SECRET }),
    Google({ clientId: env.AUTH_GOOGLE_ID, clientSecret: env.AUTH_GOOGLE_SECRET }),
  ],
  trustHost: true,
} satisfies NextAuthConfig;

// eslint-disable-next-line @typescript-eslint/unbound-method
export const { handlers, auth, signIn, signOut } = NextAuth(config);
