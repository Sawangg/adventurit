import { NextResponse, type NextRequest } from "next/server";
import type { User } from "next-auth";
import { z } from "zod";
import { preparedUserPassword } from "@db/prepared/user/userPassword";

const AuthSchema = z.object({
  email: z.string().email({ message: "invalid email" }).min(1, { message: "email is required" }),
  password: z.string().min(1, { message: "password is required" }),
  callbackUrl: z.string().url(),
});

export async function POST(request: NextRequest) {
  const result = AuthSchema.safeParse(await request.json());
  if (!result.success) return NextResponse.json(result.error, { status: 400 });
  // TODO: add salt and hash password
  const user = (await preparedUserPassword.execute({ email: result.data.email, password: result.data.password }))[0];
  if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
  return NextResponse.json<User>({
    id: user.id.toString(),
    email: user.email,
    image: user.image ?? "/assets/avatar.png",
    name: user.name ?? user.email,
  });
}
