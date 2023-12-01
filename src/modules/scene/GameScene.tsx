"use client";

import { Suspense } from "react";
import { CameraControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { GameNavigation } from "@modules/GameNavigation";
import { LoadingScene } from "@modules/scene/LoadingScene";

export type GameSceneProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;

export const GameScene: React.FC<GameSceneProps> = () => {
  return (
    <>
      <Canvas className="bg-blue-300" shadows camera={{ position: [400, 300, 100], fov: 70 }}>
        <ambientLight />
        <CameraControls enabled={true} verticalDragToForward={true} />
        <Suspense fallback={<LoadingScene />}>
          <ModelLevel position={[0, 0, 0]} />
        </Suspense>
      </Canvas>
      <footer className="absolute bottom-4 left-4">
        <GameNavigation />
      </footer>
    </>
  );
};

function ModelLevel(props: JSX.IntrinsicElements["mesh"]) {
  const gltf = useGLTF("/scene/level/scene.gltf");
  return <primitive {...props} object={gltf.scene}></primitive>;
}

useGLTF.preload("/scene/level/scene.gltf");
