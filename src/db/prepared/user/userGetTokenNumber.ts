import { eq, sql } from "drizzle-orm";
import { db } from "@db/index";
import { users } from "@db/schema";

export const preparedUserGetToken = db
  .select({ tokens: users.gameTokenNumber })
  .from(users)
  .where(eq(users.email, sql.placeholder("email")))
  .prepare("preparedUserGetToken");
