"use client";

import { Suspense, useRef } from "react";
import { CameraControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// import { CubeTextureLoader } from "three";
import { GameNavigation } from "@modules/GameNavigation";
import { LoadingScene } from "@modules/scene/LoadingScene";

export type GameSceneProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;

export const GameScene: React.FC<GameSceneProps> = () => {
  const controls = useRef<CameraControls>(null);

  return (
    <>
      <Canvas className="bg-blue-300" shadows camera={{ position: [20, 20, -10], fov: 70 }}>
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[0, 10, 0]}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
        />
        <CameraControls ref={controls} enabled={true} verticalDragToForward={true} />
        <Suspense fallback={<LoadingScene />}>
          <ModelLevel position={[0, 0, 0]} />
        </Suspense>
        {/* <SkyBox /> */}
      </Canvas>
      <footer className="absolute bottom-4 left-4">
        <GameNavigation />
      </footer>
    </>
  );
};

type ModelLevelProps = JSX.IntrinsicElements["mesh"];

export const ModelLevel: React.FC<ModelLevelProps> = () => {
  const gltf = useGLTF("/scene/level/scene.gltf");
  return <primitive object={gltf.scene}></primitive>;
};

useGLTF.preload("/scene/level/scene.gltf");

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
