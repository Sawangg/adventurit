"use server";

import { sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "@db/index";
import { games } from "@db/schema";

const GameNumberSchema = z.object({
  gameNumber: z.number(),
});
const AllGameNumberSchema = z.array(GameNumberSchema);

const preparedGameNumberRequest = db
  .select({
    gameNumber: sql<number>`CAST(COUNT(${games.id}) AS INT)`,
  })
  .from(games)
  .prepare("preparedGameNumber");

export const getGameNumber = async (): Promise<number> => {
  const requestResult = await preparedGameNumberRequest.execute();
  const result = AllGameNumberSchema.safeParse(requestResult);
  if (!result.success) throw new Error(result.error.message);
  return result.data[0].gameNumber;
};
