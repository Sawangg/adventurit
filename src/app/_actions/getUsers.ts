"use server";

import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "@db/index";
import { answers, games, questions, users } from "@db/schema";

const UserGradesSchema = z.object({
  id: z.number(),
  email: z.string().email({ message: "invalid email" }),
  easy: z.number(),
  medium: z.number(),
  hard: z.number(),
});
const AllUsersGradesSchema = z.array(UserGradesSchema);
export type AllUsersGrades = z.infer<typeof AllUsersGradesSchema>;

const preparedUserGradesRequest = db
  .select({
    id: users.id,
    email: users.email,
    easy: sql<number>`CAST(COALESCE(AVG(CASE WHEN ${questions.difficulty} = ${"easy"} THEN ${answers.grade} END), 0) AS INT)`,
    medium: sql<number>`CAST(COALESCE(AVG(CASE WHEN ${questions.difficulty} = ${"medium"} THEN ${answers.grade}  END), 0) AS INT)`,
    hard: sql<number>`CAST(COALESCE(AVG(CASE WHEN ${questions.difficulty} = ${"hard"} THEN ${answers.grade} END), 0) AS INT)`,
  })
  .from(users)
  .leftJoin(games, eq(users.id, games.userId))
  .leftJoin(answers, eq(games.id, answers.gameId))
  .leftJoin(questions, eq(questions.id, answers.questionId))
  .groupBy(users.id)
  .prepare("preparedUserGrades");

export const getAllUsers = async (): Promise<AllUsersGrades> => {
  const requestResult = await preparedUserGradesRequest.execute();
  if (!requestResult || requestResult.length === 0) throw new Error("No users found");
  const result = AllUsersGradesSchema.safeParse(requestResult);
  if (!result.success) throw new Error(result.error.message);
  return result.data;
};
