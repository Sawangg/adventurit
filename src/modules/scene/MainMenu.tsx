import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { Vector3 } from "three";
import { useMenu } from "@stores/useMenu";
import { AspectRatio } from "@ui/AspectRatio";

// Suspense with animation should be here for the 3d menu scene because it is the first scene the user is going to see
export const MainMenu: React.FC = () => {
  const { currentMenu, setCurrentMenu } = useMenu();
  const [vector, setVector] = useState(new Vector3(700, 100, 100));

  const handleAnyKeyDownOnce = () => {
    handleSubMenus("main");
    window.removeEventListener("keydown", handleAnyKeyDownOnce);
  };

  const handleSubMenus = (menu: string) => {
    switch (menu) {
      case "settings":
        setVector(new Vector3(200, 100, 100));
        break;
      case "main":
        setVector(new Vector3(500, 100, 100));
        break;
      case "login":
        setVector(new Vector3(200, 100, 200));
        break;
      default:
        break;
    }
    setCurrentMenu(menu);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleAnyKeyDownOnce);
    return () => window.removeEventListener("keydown", handleAnyKeyDownOnce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Canvas camera={{ position: [700, 100, 100] }} className="h-screen bg-[#98d8fc]">
        <ambientLight />
        <Suspense fallback={null}>
          <ModelMenu position={[0, 0, 0]} cameraPosition={vector} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence>
          {currentMenu === "anykey" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-max text-lg uppercase text-white"
            >
              Press Any key to start
            </motion.p>
          )}

          {currentMenu === "main" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-x-12 text-lg uppercase text-white"
            >
              <h1 className="text-4xl font-bold">Adventur&apos;IT</h1>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                // transition={{ delay: 2 }} // Fix here
                transition={{ delay: 0.5 }}
                className="flex flex-col items-start gap-y-3"
              >
                <motion.button whileHover={{ x: 10 }} className="uppercase" onClick={() => handleSubMenus("ingame")}>
                  Start
                </motion.button>
                <motion.button whileHover={{ x: 10 }} className="uppercase" onClick={() => handleSubMenus("login")}>
                  Login
                </motion.button>
                <motion.button whileHover={{ x: 10 }} className="uppercase" onClick={() => handleSubMenus("settings")}>
                  Settings
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {currentMenu === "settings" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 2 }}
            >
              <h1 className="text-3xl">Settings</h1>
              <button onClick={() => handleSubMenus("main")}>Back</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <footer className="absolute bottom-4 left-4">
        <div className="flex items-center gap-x-2">
          <div className="w-6">
            <AspectRatio ratio={1 / 1}>
              <Image src="/assets/SG.png" sizes="" alt="" fill />
            </AspectRatio>
          </div>
          <p className="text-center text-sm text-white">Société Générale</p>
        </div>
      </footer>
    </>
  );
};

type ModelMenuProps = JSX.IntrinsicElements["mesh"] & {
  cameraPosition: Vector3;
  cameraAlpha?: number;
};

export const ModelMenu: React.FC<ModelMenuProps> = ({ cameraPosition, cameraAlpha }) => {
  const gltf = useGLTF("/scene/menu/scene.gltf");

  useFrame((state) => {
    state.camera.position.lerp(cameraPosition, cameraAlpha ?? 0.01);
    state.camera.updateProjectionMatrix();
  });

  return <primitive object={gltf.scene}></primitive>;
};

useGLTF.preload("/scene/menu/scene.gltf");
