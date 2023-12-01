"use server";

import { redirect } from "next/navigation";
import { db } from "@db/index";
import { preparedUserEmail } from "@db/prepared/userEmail";
import { games } from "@db/schema";
import { auth } from "@lib/auth";

export const startGame = async () => {
  const session = await auth();
  if (!session) {
    return {
      type: "error" as const,
    };
  }
  const user = (await preparedUserEmail.execute({ email: session.user!.email }))[0];
  const game = await db.insert(games).values({ userId: user.id }).returning();
  // TODO: change dynamically to use correct language
  redirect(`/fr/game/${game[0].id}`);
};
