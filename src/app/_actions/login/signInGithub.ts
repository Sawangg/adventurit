"use server";

import { signIn } from "@lib/auth";

export async function signInGithub() {
  await signIn("github");
}
