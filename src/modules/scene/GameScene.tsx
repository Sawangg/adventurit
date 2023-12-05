"use client";

import { Suspense, useRef } from "react";
import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// import { CubeTextureLoader } from "three";
import { LoadingScene } from "@modules/scene/LoadingScene";
import { GameLevelModel } from "@modules/scene/model/GameLevelModel";

export type GameSceneProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;

export const GameScene: React.FC<GameSceneProps> = () => {
  const controls = useRef<CameraControls>(null);

  return (
    <Canvas className="bg-blue-300" camera={{ position: [-60, 10, -70], fov: 70 }}>
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[0, 10, 0]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
      />
      <CameraControls ref={controls} enabled={true} verticalDragToForward={true} />
      <Suspense fallback={<LoadingScene />}>
        <GameLevelModel position={[0, 0, 0]} />
      </Suspense>
      {/* <SkyBox /> */}
    </Canvas>
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
