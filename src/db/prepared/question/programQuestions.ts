import { eq, sql } from "drizzle-orm";
import { db } from "@db/index";
import { questions } from "@db/schema";

export const preparedProgrameQuestions = db
  .select()
  .from(questions)
  .where(eq(questions.type, sql.placeholder("programe")))
  .prepare("preparedProgrameQuestions");
