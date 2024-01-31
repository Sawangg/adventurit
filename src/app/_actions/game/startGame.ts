"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@db/index";
import { preparedUserEmail } from "@db/prepared/user/userEmail";
import { games, users } from "@db/schema";
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
  if (user.gameTokenNumber <= 0) return { message: "no game token" };
  const userTokenRemoved = await db
    .update(users)
    .set({ gameTokenNumber: user.gameTokenNumber - 1 })
    .where(eq(users.email, user.email))
    .execute();

  if (!userTokenRemoved) return { message: "error" };
  const game = await db.insert(games).values({ userId: user.id }).returning();
  if (!game) return { message: "error" };
  redirect(`/game/${game[0].id}`);
};
