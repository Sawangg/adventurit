"use server";

import { eq } from "drizzle-orm";
import { db } from "@db/index";
import { users } from "@db/schema";

export const isAdmin = async (email: string) => {
  const user = await db.select().from(users).where(eq(users.email, email));
  if (!user[0]) return false;
  return user[0].admin;
};
