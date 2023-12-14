import { sql } from "drizzle-orm";
import { db } from "@db/index";
import { games } from "@db/schema";

export const preparedGameNumber = db
  .select({
    gameNumber: sql<number>`CAST(COUNT(${games.id}) AS INT)`,
  })
  .from(games)
  .prepare("preparedGameNumber");
