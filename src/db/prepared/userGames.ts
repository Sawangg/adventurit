import { eq, sql } from "drizzle-orm";
import { db } from "@db/index";
import { games } from "@db/schema";

export const preparedUserGamesRequest = db
  .select({
    id: games.id,
    progress: games.progress,
  })
  .from(games)
  .where(eq(games.userId, sql.placeholder("id")))
  .prepare("preparedUserGames");
