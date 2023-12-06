"use server";

import { signIn } from "@lib/auth";

export async function signInCredentials(formData: FormData) {
  await signIn("credentials", formData);
}
