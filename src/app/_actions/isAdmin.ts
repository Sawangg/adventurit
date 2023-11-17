"use server";

import { eq, sql } from "drizzle-orm";
import { db } from "@db/index";
import { users } from "@db/schema";

const p1 = db
  .select()
  .from(users)
  .where(eq(users.email, sql.placeholder("email")))
  .prepare("preparedUserEmail");

export const isAdmin = async (email: string) => {
  const user = await p1.execute({ email });
  if (!user[0]) return false;
  return user[0].admin;
};
