import { createInsertSchema } from "drizzle-zod";
import { db } from "@db/index";
import { games } from "@db/schema";

export async function POST(request: Request) {
  const schema = createInsertSchema(games);
  const result = schema.safeParse(await request.json());
  if (!result.success) return new Response(result.error.message, { status: 400 });
  const game = await db.insert(games).values({ userId: result.data.userId }).returning();
  return Response.json(game[0]);
}
