"use server";

import { z } from "zod";
import { preparedGameNumberRequest } from "@db/prepared/gameNumber";

const GameNumberSchema = z.object({
  gameNumber: z.number(),
});
const AllGameNumberSchema = z.array(GameNumberSchema);

export const getGameNumber = async (): Promise<number> => {
  const requestResult = await preparedGameNumberRequest.execute();
  const result = AllGameNumberSchema.safeParse(requestResult);
  if (!result.success) throw new Error(result.error.message);
  return result.data[0].gameNumber;
};
