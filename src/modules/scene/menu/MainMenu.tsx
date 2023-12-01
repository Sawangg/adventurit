"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { startGame } from "@actions/startGame";
import { afkTimeoutSeconds } from "@lib/constants";
import type { Dictionnary } from "@lib/getDictionnary";
import { createVector3 } from "@lib/utils";
import { MainMenuButton } from "@modules/scene/menu/MainMenuButton";

export type MainMenuProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  dictionnary: Dictionnary;
};

// Suspense with animation should be here for the 3d menu scene because it is the first scene the user is going to see
export const MainMenu: React.FC<MainMenuProps> = () => {
  const [currentMenu, setCurrentMenu] = useState<string>("anykey");
  const defaultCameraPosition = createVector3([800, 200, 100]);
  const [cameraPosition, setCameraPosition] = useState(defaultCameraPosition);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMenus = useCallback(
    (menu: string) => {
      if (timeoutId) clearTimeout(timeoutId);

      switch (menu) {
        case "anykey":
          setCameraPosition(createVector3([700, 100, 100]));
          break;
        case "main":
          setCameraPosition(createVector3([500, 100, 100]));
          break;
        case "settings":
          setCameraPosition(createVector3([200, 100, 100]));
          break;
        default:
          break;
      }
      setCurrentMenu(menu);
    },
    [setCurrentMenu, timeoutId],
  );

  useEffect(() => {
    const handleKeyDown = () => {
      if (currentMenu === "anykey") handleMenus("main");
      if (timeoutId) clearTimeout(timeoutId);
      const newTimeoutId = setTimeout(() => handleMenus("anykey"), afkTimeoutSeconds * 1000);
      setTimeoutId(newTimeoutId);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentMenu, handleMenus, timeoutId]);

  return (
    <>
      <Canvas camera={{ position: defaultCameraPosition }} className="h-screen bg-[#98d8fc]">
        <ambientLight />
        <Suspense fallback={null}>
          <ModelMenu position={[0, 0, 0]} cameraPosition={cameraPosition} />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 text-black">
        <AnimatePresence>
          {currentMenu === "anykey" && (
            <div className="flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-sm">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="w-max text-lg uppercase text-white"
              >
                Press Any key to start
              </motion.p>
            </div>
          )}

          {currentMenu === "main" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-x-12 text-lg uppercase"
            >
              <h1 className="text-4xl font-bold">Adventur&apos;IT</h1>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-start gap-y-3"
              >
                <form action={startGame}>
                  <MainMenuButton className="uppercase">Start</MainMenuButton>
                </form>
                <MainMenuButton className="uppercase" onClick={() => handleMenus("settings")}>
                  Settings
                </MainMenuButton>
              </motion.div>
            </motion.div>
          )}

          {currentMenu === "settings" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 2 }}
              className="flex justify-around"
            >
              <div>
                <h1 className="text-7xl uppercase">Settings</h1>
                <MainMenuButton mouvement={0} onClick={() => handleMenus("main")} className="uppercase">
                  Back
                </MainMenuButton>
              </div>

              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col">
                  <h2 className="text-3xl">Sound</h2>
                  <button>Music</button>
                  <button>Sounds</button>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-3xl">Language</h2>
                  <Link href="/fr">FR</Link>
                  <Link href="/en">EN</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

type ModelMenuProps = JSX.IntrinsicElements["mesh"] & {
  cameraPosition: THREE.Vector3;
  cameraAlpha?: number;
};

export const ModelMenu: React.FC<ModelMenuProps> = ({ cameraPosition, cameraAlpha = 0.01 }) => {
  const gltf = useGLTF("/scene/menu/scene.gltf");

  useFrame((state) => {
    state.camera.position.lerp(cameraPosition, cameraAlpha);
    state.camera.updateProjectionMatrix();
  });

  return <primitive object={gltf.scene}></primitive>;
};

useGLTF.preload("/scene/menu/scene.gltf");
