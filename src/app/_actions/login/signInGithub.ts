"use server";

import { redirect } from "next/navigation";
import { signIn } from "@lib/auth";

export async function signInGithub() {
  const url = (await signIn("github", { redirect: false })) as string;
  // TODO: Should be fixed after next-auth@5 is stable
  redirect(url.replace("signin", "api/auth/signin"));
}
