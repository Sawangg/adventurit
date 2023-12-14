import { z } from "zod";
import { preparedUserAnswers } from "@db/prepared/user/userAnswers";
import { preparedUserGames } from "@db/prepared/user/userGames";
import { preparedUserGrades } from "@db/prepared/user/userGrades";

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
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
              id: z.number().nullable(),
              statement: z.string().nullable(),
              answer: z.string().nullable(),
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
  const requestUserResult = await preparedUserGrades.execute({ id });
  if (!requestUserResult) throw new Error("User not found");
  const user: User = requestUserResult[0];

  const requestGamesResult = await preparedUserGames.execute({ id });
  if (!requestGamesResult) throw new Error("User games not found");
  user.games = requestGamesResult;

  for (const game of user.games) {
    const requestAnswersResult = await preparedUserAnswers.execute({ gameId: game.id });
    if (!requestAnswersResult) throw new Error("User answers not found");
    game.answers = requestAnswersResult;
  }

  const result = UserSchema.safeParse(user);
  if (!result.success) throw new Error(result.error.message);
  return result.data;
};
