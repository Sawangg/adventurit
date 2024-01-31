"use client";

import { Suspense, useEffect } from "react";
import { CameraControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence } from "framer-motion";
// import { CubeTextureLoader } from "three";
import { gameflow } from "@lib/gameflow";
import { CodingGame } from "@modules/CodingGame";
import { Dialog } from "@modules/Dialog";
import { LoadingScene } from "@modules/scene/LoadingScene";
import { GameLevelModel } from "@modules/scene/model/GameLevelModel";
import { env } from "@src/env.mjs";
import { useCommandStore } from "@stores/useCommandStore";
import { useDialogStore } from "@stores/useDialogStore";
import { useSettingsStore } from "@stores/useSettings";

export type GameSceneProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;

export const GameScene: React.FC<GameSceneProps> = () => {
  const { add } = useCommandStore();
  const { text, guideline, options } = useDialogStore();
  const { graphics } = useSettingsStore();

  useEffect(() => {
    add([
      { type: "dialog", args: ["Welcome to Adventur'IT !"] },
      { type: "dialog", args: ["My name is Sacha I'll be your guide on your journey"] },
    ]);
  }, [add]);

  return (
    <>
      <Canvas className="bg-[#538db1]" camera={{ position: [70, 10, 100] }} shadows>
        {env.NEXT_PUBLIC_DEBUG && <Stats />}

        {graphics ? (
          <directionalLight position={[75, 125, 40]} intensity={4} castShadow />
        ) : (
          <ambientLight intensity={1.5} />
        )}

        <CameraControls enabled={true} verticalDragToForward={true} />
        <Suspense fallback={<LoadingScene />}>
          <GameLevelModel position={[0, 0, 0]} onClick={(e) => gameflow(add, e as string)} />
        </Suspense>
        {/* <SkyBox /> */}
      </Canvas>
      <AnimatePresence>{text && <Dialog text={text} options={options} />}</AnimatePresence>
      <AnimatePresence>{guideline && <CodingGame guideline={guideline} />}</AnimatePresence>
    </>
  );
};

// function SkyBox() {
//   const { scene } = useThree();
//   const loader = new CubeTextureLoader();
//   const texture = loader.load([
//     "/scene/level/skybox/1.png",
//     "/scene/level/skybox/2.png",
//     "/scene/level/skybox/3.png",
//     "/scene/level/skybox/4.png",
//     "/scene/level/skybox/5.png",
//     "/scene/level/skybox/6.png",
//   ]);
//   scene.background = texture;
//   return null;
// }
