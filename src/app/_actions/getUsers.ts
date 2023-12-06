"use server";

import { z } from "zod";
import { preparedUsersGradesRequest } from "@db/prepared/usersGrades";

const UserGradesSchema = z.object({
  id: z.string(),
  email: z.string().email({ message: "invalid email" }),
  easy: z.number(),
  medium: z.number(),
  hard: z.number(),
});
const AllUsersGradesSchema = z.array(UserGradesSchema);
export type AllUsersGrades = z.infer<typeof AllUsersGradesSchema>;

export const getUsers = async (): Promise<AllUsersGrades> => {
  const requestResult = await preparedUsersGradesRequest.execute();
  if (!requestResult || requestResult.length === 0) throw new Error("No users found");
  const result = AllUsersGradesSchema.safeParse(requestResult);
  if (!result.success) throw new Error(result.error.message);
  return result.data;
};
