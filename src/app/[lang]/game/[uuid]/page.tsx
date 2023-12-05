import { redirect } from "next/navigation";
import { getGame } from "@actions/game/getGame";
import { auth } from "@lib/auth";
import { GameDialog } from "@modules/GameDialog";
import { GameNavigation } from "@modules/GameNavigation";
import { GameScene } from "@modules/scene/GameScene";

export default async function Page({ params }: { params: { uuid: string } }) {
  const session = await auth();
  if (!session) redirect("/");
  const data = await getGame(params.uuid, session);
  if (!data.game) redirect("/");

  return (
    <body className="min-h-screen min-w-screen overflow-x-hidden">
      <main className="h-screen">
        <GameScene />
        <GameDialog game={data.game} />
      </main>
      <footer className="absolute inset-x-4 bottom-4 w-full">
        <GameNavigation />
      </footer>
    </body>
  );
}
