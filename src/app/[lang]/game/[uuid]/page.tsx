import { GameScene } from "@modules/scene/GameScene";

export default function Page({ params }: { params: { uuid: string } }) {
  console.log(params.uuid);

  return (
    <body className={`min-h-screen min-w-screen overflow-x-hidden`}>
      <main className="h-screen">
        <GameScene />
      </main>
    </body>
  );
}
