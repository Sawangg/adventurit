"use server";

import { preparedAllQuestions } from "@db/prepared/question/allQuestions";

export const getRandomQuestion = async () => {
  const questions = await preparedAllQuestions.execute();
  if (!questions || questions.length === 0) throw new Error("No questions found");
  const question = questions[Math.floor(Math.random() * questions.length)];
  return question;
};
