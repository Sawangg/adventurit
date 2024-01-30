"use server";

import type { Session } from "next-auth";
import { preparedUserGetToken } from "@db/prepared/user/userGetTokenNumber";

export const getToken = async (session: Session) => {
  const user = (await preparedUserGetToken.execute({ email: session.user!.email }))[0];
  if (!user) return 0;
  return user.tokens;
};
