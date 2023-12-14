import { db } from "@db/index";
import { questions } from "@db/schema";

export const preparedAllQuestions = db.select().from(questions).prepare("preparedAllQuestions");
