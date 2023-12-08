import { z } from "zod";
import { preparedUserAnswersRequest } from "@db/prepared/userAnswers";
import { preparedUserGamesRequest } from "@db/prepared/userGames";
import { preparedUserGradesRequest } from "@db/prepared/userGrades";

const UserSchema = z.object({
  id: z.string(),
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

export const getUser = async (id: string): Promise<User> => {
  const requestUserResult = await preparedUserGradesRequest.execute({ id });
  if (!requestUserResult) throw new Error("User not found");
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
