"use client";

import type React from "react";
import { useRef } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import type { Object3D } from "three";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export const Scene: React.FC = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Model position={[0, 0, 0]} />
    </Canvas>
  );
};

function Model(props: JSX.IntrinsicElements["mesh"]) {
  const gltf: GLTF = useLoader(GLTFLoader, "/scene/scene.gltf");
  const mesh = useRef<Object3D>();
  const { camera } = useThree();

  camera.position.set(500, 100, 0);
  camera.lookAt(0, 0, 0);

  return (
    <primitive {...props} object={gltf.scene.clone()} ref={mesh} dispose={null}>
      {gltf.scene.children.map((child) => (
        <primitive key={child.uuid} object={child} dispose={null} castShadow receiveShadow />
      ))}
    </primitive>
  );
}
