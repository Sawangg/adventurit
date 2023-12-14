"use server";

import { redirect } from "next/navigation";
import { db } from "@db/index";
import { preparedUserEmail } from "@db/prepared/user/userEmail";
import { games } from "@db/schema";
import { auth } from "@lib/auth";

export const startGame = async () => {
  const session = await auth();
  if (!session) {
    return {
      message: "error",
    };
  }
  const user = (await preparedUserEmail.execute({ email: session.user!.email }))[0];
  if (!user) return { message: "error" };
  const game = await db.insert(games).values({ userId: user.id }).returning();
  if (!game) return { message: "error" };
  redirect(`/game/${game[0].id}`);
};
