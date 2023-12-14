import { eq, sql } from "drizzle-orm";
import { db } from "@db/index";
import { questions, usersAnswers } from "@db/schema";

export const preparedUserAnswers = db
  .select({
    id: questions.id,
    statement: questions.statement,
    answer: usersAnswers.freeAnswer,
    difficulty: questions.difficulty,
    grade: usersAnswers.grade,
  })
  .from(usersAnswers)
  .leftJoin(questions, eq(questions.id, usersAnswers.questionId))
  .where(eq(usersAnswers.gameId, sql.placeholder("gameId")))
  .prepare("preparedUserAnswers");
