import { eq, sql } from "drizzle-orm";
import { db } from "@db/index";
import { users } from "@db/schema";

export const preparedUserEmail = db
  .select()
  .from(users)
  .where(eq(users.email, sql.placeholder("email")))
  .prepare("preparedUserEmail");
