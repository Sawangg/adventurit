"use client";

import type React from "react";
import { Suspense } from "react";
import { CameraControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { Dictionnary } from "@lib/getDictionnary";
import { LoadingScene } from "@modules/scene/Loading";
import { MainMenu } from "@modules/scene/MainMenu";
import { useMenu } from "@stores/useMenu";

export type SceneProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> & {
  dictionnary: Dictionnary;
};

export const Scene: React.FC<SceneProps> = () => {
  const { currentMenu } = useMenu();

  return (
    <>
      {currentMenu === "ingame" ? (
        <Canvas shadows camera={{ position: [400, 300, 100], fov: 70 }}>
          <ambientLight />
          <CameraControls enabled={true} verticalDragToForward={true} />
          <Suspense fallback={<LoadingScene />}>
            <ModelLevel position={[0, 0, 0]} />
          </Suspense>
        </Canvas>
      ) : (
        <MainMenu />
      )}
    </>
  );
};

function ModelLevel(props: JSX.IntrinsicElements["mesh"]) {
  const gltf = useGLTF("/scene/level/scene.gltf");
  return <primitive {...props} object={gltf.scene}></primitive>;
}

useGLTF.preload("/scene/level/scene.gltf");
