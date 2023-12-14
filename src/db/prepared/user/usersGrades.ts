import { eq, sql } from "drizzle-orm";
import { db } from "@db/index";
import { questions, users, usersAnswers } from "@db/schema";

export const preparedUsersGrades = db
  .select({
    id: users.id,
    email: users.email,
    easy: sql<number>`CAST(COALESCE(AVG(CASE WHEN ${questions.difficulty} = ${"easy"} THEN ${usersAnswers.grade} END), 0) AS INT)`,
    medium: sql<number>`CAST(COALESCE(AVG(CASE WHEN ${questions.difficulty} = ${"medium"} THEN ${usersAnswers.grade} END), 0) AS INT)`,
    hard: sql<number>`CAST(COALESCE(AVG(CASE WHEN ${questions.difficulty} = ${"hard"} THEN ${usersAnswers.grade} END), 0) AS INT)`,
  })
  .from(users)
  .leftJoin(usersAnswers, eq(users.id, usersAnswers.userId))
  .leftJoin(questions, eq(questions.id, usersAnswers.questionId))
  .groupBy(users.id)
  .prepare("preparedUsersGrades");
