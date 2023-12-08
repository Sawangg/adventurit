import { and, eq, sql } from "drizzle-orm";
import { db } from "@db/index";
import { users } from "@db/schema";

export const preparedUserPassword = db
  .select()
  .from(users)
  .where(and(eq(users.email, sql.placeholder("email")), eq(users.password, sql.placeholder("password"))))
  .prepare("preparedUserPassword");
