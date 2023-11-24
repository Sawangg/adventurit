"use server";

import { redirect } from "next/navigation";
import { createSelectSchema } from "drizzle-zod";
import { games } from "@db/schema";

const createGame = async () => {
  const res = await fetch("/api/game/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: 1 }),
  });
  const schema = createSelectSchema(games);
  const result = schema.safeParse(await res.json());
  if (!result.success) throw new Error(result.error.message);
  redirect(`/game/${result.data.id}`);
};

export const startGame = () => {
  console.log("ayo");
};
