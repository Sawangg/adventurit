"use server";

import type { Session } from "next-auth";
import { preparedGameByUuid } from "@db/prepared/gameByUuid";
import { preparedUserEmail } from "@db/prepared/userEmail";

export const getGame = async (uuid: string, session: Session) => {
  const user = (await preparedUserEmail.execute({ email: session.user!.email }))[0];
  if (!user) {
    return {
      type: "error" as const,
      message: "User not found",
    };
  }
  try {
    const game = await preparedGameByUuid.execute({ uuid });
    if (!game)
      return {
        type: "error" as const,
        message: "Game not found",
      };
    return {
      type: "success" as const,
      game: game[0],
    };
  } catch {
    return {
      type: "error" as const,
      message: "An internal error occurred",
    };
  }
};
