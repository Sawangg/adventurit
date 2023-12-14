"use server";

import { preparedGameNumber } from "@db/prepared/game/gameNumber";

export const getGameNumber = async (): Promise<number> => {
  const requestResult = await preparedGameNumber.execute();
  if (!requestResult) throw new Error("Game number not found");
  return requestResult[0].gameNumber;
};
