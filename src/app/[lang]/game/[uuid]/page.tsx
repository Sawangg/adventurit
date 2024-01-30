import { redirect } from "next/navigation";
import { getGame } from "@actions/game/getGame";
import { auth } from "@lib/auth";
// import { GameNavigation } from "@modules/GameNavigation";
import { PauseScreen } from "@modules/PauseScreen";
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
        <PauseScreen />
      </main>
    </body>
  );
}
