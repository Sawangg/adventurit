"use server";

import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "@db/index";
import { answers, games, questions, users } from "@db/schema";

// get all users for admin page
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

// get one user for admin detail page
const UserSchema = z.object({
  id: z.number(),
  email: z.string().email({ message: "invalid email" }),
  easy: z.number(),
  medium: z.number(),
  hard: z.number(),
  games: z
    .array(
      z.object({
        id: z.string(),
        progress: z.number(),
        answers: z
          .array(
            z.object({
              id: z.number(),
              statement: z.string().nullable(),
              answer: z.string(),
              difficulty: z.string().nullable(),
              grade: z.number().nullable(),
            }),
          )
          .optional(),
      }),
    )
    .optional(),
});
export type User = z.infer<typeof UserSchema>;

const preparedUserRequest = db
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
  .where(eq(users.id, sql.placeholder("id")))
  .groupBy(users.id)
  .prepare("preparedUser");

const preparedUserGamesRequest = db
  .select({
    id: games.id,
    progress: games.progress,
  })
  .from(games)
  .where(eq(games.userId, sql.placeholder("id")))
  .prepare("preparedUserGames");

const preparedUserAnswersRequest = db
  .select({
    id: answers.id,
    statement: questions.statement,
    answer: answers.answer,
    difficulty: questions.difficulty,
    grade: answers.grade,
  })
  .from(answers)
  .leftJoin(questions, eq(questions.id, answers.questionId))
  .where(eq(answers.gameId, sql.placeholder("gameId")))
  .prepare("preparedUserAnswers");

export const getUser = async (id: number): Promise<User> => {
  const requestUserResult = await preparedUserRequest.execute({ id });
  if (!requestUserResult || requestUserResult.length === 0) throw new Error("User not found");
  const user: User = requestUserResult[0];

  const requestGamesResult = await preparedUserGamesRequest.execute({ id });
  if (!requestGamesResult) throw new Error("User games not found");
  user.games = requestGamesResult;

  for (const game of user.games) {
    const requestAnswersResult = await preparedUserAnswersRequest.execute({ gameId: game.id });
    if (!requestAnswersResult) throw new Error("User answers not found");
    game.answers = requestAnswersResult;
  }

  const result = UserSchema.safeParse(user);
  if (!result.success) throw new Error(result.error.message);
  return result.data;
};
