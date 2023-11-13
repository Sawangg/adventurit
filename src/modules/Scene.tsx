"use client";

import type React from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export const Scene: React.FC = () => {
  return (
    <Canvas>
      <ambientLight />
      <Model position={[0, 0, 0]} />
    </Canvas>
  );
};

function Model(props: JSX.IntrinsicElements["mesh"]) {
  const gltf: GLTF = useLoader(GLTFLoader, "/scene/scene.gltf");
  const { camera } = useThree();
  camera.lookAt(0, 0, 0);
  camera.position.set(400, 300, 100);

  return <primitive {...props} object={gltf.scene}></primitive>;
}
