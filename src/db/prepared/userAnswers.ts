import { eq, sql } from "drizzle-orm";
import { db } from "@db/index";
import { answers, questions } from "@db/schema";

export const preparedUserAnswersRequest = db
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
