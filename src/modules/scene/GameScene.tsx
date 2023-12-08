"use client";

import { Suspense, useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence } from "framer-motion";
// import { CubeTextureLoader } from "three";
import { Dialog } from "@modules/Dialog";
import { LoadingScene } from "@modules/scene/LoadingScene";
import { GameLevelModel } from "@modules/scene/model/GameLevelModel";
import { useCommandStore } from "@src/stores/useCommandStore";
import { useDialogStore } from "@src/stores/useDialogStore";

export type GameSceneProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;

export const GameScene: React.FC<GameSceneProps> = () => {
  const controls = useRef<CameraControls>(null);
  const { add } = useCommandStore();
  const { text, options } = useDialogStore();

  useEffect(() => {
    add([
      { type: "dialog", args: ["Welcome to Adventur'IT !"] },
      { type: "dialog", args: ["My name is Sacha I'll be your guide on your journey"] },
    ]);
  }, [add]);

  return (
    <>
      <Canvas className="bg-blue-300" camera={{ position: [-60, 10, -70], fov: 70 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[0, 10, 0]} />
        <CameraControls ref={controls} enabled={true} verticalDragToForward={true} />
        <Suspense fallback={<LoadingScene />}>
          <GameLevelModel
            position={[0, 0, 0]}
            onClick={(_e) => {
              add([
                { type: "dialog", args: [`Answer the next question`] },
                {
                  type: "question",
                  args: [
                    "What is the Python code to check if a number is even",
                    ["1) is_even = num % 2 == 1", "2) is_even = num % 2 == 0"],
                  ],
                },
              ]);
            }}
          />
        </Suspense>
        {/* <SkyBox /> */}
      </Canvas>
      <AnimatePresence>{text && <Dialog text={text} options={options} />}</AnimatePresence>
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
