"use server";

import type { Session } from "next-auth";
import { preparedGameByUuid } from "@db/prepared/game/gameByUuid";
import { preparedUserEmail } from "@db/prepared/user/userEmail";

export const getGame = async (uuid: string, session: Session) => {
  const user = (await preparedUserEmail.execute({ email: session.user!.email }))[0];
  if (!user) {
    return {
      type: "error",
      message: "User not found",
    };
  }
  try {
    const game = await preparedGameByUuid.execute({ uuid });
    if (!game)
      return {
        type: "error",
        message: "Game not found",
      };
    return {
      type: "success",
      game: game[0],
    };
  } catch {
    return {
      type: "error",
      message: "An internal error occurred",
    };
  }
};
