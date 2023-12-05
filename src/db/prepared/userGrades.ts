import { eq, sql } from "drizzle-orm";
import { db } from "@db/index";
import { answers, games, questions, users } from "@db/schema";

export const preparedUserGradesRequest = db
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
