"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@db/index";
import { preparedUserEmail } from "@db/prepared/user/userEmail";
import { users } from "@db/schema";
import { auth } from "@lib/auth";

export const addToken = async () => {
  const session = await auth();
  if (!session) return;
  const user = (await preparedUserEmail.execute({ email: session.user!.email }))[0];
  if (!user) return;
  const userTokenAdded = await db
    .update(users)
    .set({ gameTokenNumber: user.gameTokenNumber + 1 })
    .where(eq(users.email, user.email))
    .execute();

  if (!userTokenAdded) return;
  revalidatePath("/");
};
