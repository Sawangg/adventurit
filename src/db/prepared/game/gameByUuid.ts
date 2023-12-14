import { eq, sql } from "drizzle-orm";
import { db } from "@db/index";
import { games } from "@db/schema";

export const preparedGameByUuid = db
  .select()
  .from(games)
  .where(eq(games.id, sql.placeholder("uuid")))
  .prepare("preparedGameByUuid");
