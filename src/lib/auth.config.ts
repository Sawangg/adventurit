import NextAuth from "next-auth";
import type { NextAuthConfig, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { env } from "@src/env.mjs";

// TODO: Remove this file and merge it with @lib/auth.ts once postgres.js supports edge runtime
export const config = {
  providers: [
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      async authorize(credentials, request) {
        const authResponse = await fetch(`${request.url}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        if (!authResponse.ok) return null;
        const user = (await authResponse.json()) as User;
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { auth: authMiddleware } = NextAuth(config);
