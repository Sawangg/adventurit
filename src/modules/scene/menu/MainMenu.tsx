"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CameraControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { useFormState } from "react-dom";
import { startGame } from "@actions/game/startGame";
import { signInGithub } from "@actions/login/signInGithub";
import { signInGoogle } from "@actions/login/signInGoogle";
import { afkTimeoutSeconds } from "@lib/constants";
import type { Dictionnary } from "@lib/getDictionnary";
import { createVector3 } from "@lib/utils";
import { MainMenuButton } from "@modules/scene/menu/MainMenuButton";
import { AspectRatio } from "@ui/AspectRatio";
import { Button } from "@ui/button";

export type MainMenuProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  dictionnary: Dictionnary;
};

// Suspense with animation should be here for the 3d menu scene because it is the first scene the user is going to see
export const MainMenu: React.FC<MainMenuProps> = () => {
  const controls = useRef<CameraControls>(null);
  const [currentMenu, setCurrentMenu] = useState<string>("anykey");
  const defaultCameraPosition = createVector3([800, 200, 100]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [state, formAction] = useFormState<{ message: string | null }>(startGame, { message: null });

  const handleMenus = useCallback(
    (menu: string) => {
      if (timeoutId) clearTimeout(timeoutId);

      switch (menu) {
        case "anykey":
          void controls.current?.dolly(-150, true);
          void controls.current?.truck(200, 0, true);
          break;
        case "main":
          if (currentMenu === "anykey") {
            void controls.current?.dolly(150, true);
            void controls.current?.truck(-200, 0, true);
          }
          if (currentMenu === "settings") void controls.current?.truck(200, 0, true);
          break;
        case "settings":
          if (currentMenu === "main") void controls.current?.truck(-200, 0, true);
          break;
        default:
          break;
      }
      setCurrentMenu(menu);
    },
    [currentMenu, timeoutId],
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
        <CameraControls ref={controls} />
        <Suspense fallback={null}>
          <ModelMenu position={[0, 0, 0]} />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 h-screen w-screen text-black">
        <AnimatePresence>
          {currentMenu === "anykey" && (
            <div
              className="flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-sm"
              onClick={() => {
                handleMenus("main");
              }}
              onKeyDown={() => {
                handleMenus("main");
              }}
              role="button"
              tabIndex={0}
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="w-max text-lg uppercase text-white"
              >
                Press Any key or Click to start
              </motion.p>
            </div>
          )}
          {currentMenu === "main" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="flex h-full items-center gap-x-28 p-8 text-lg uppercase"
            >
              <div className="flex items-center">
                <figure className="w-36">
                  <AspectRatio ratio={1 / 1}>
                    <Image src="/assets/logo.png" alt="" sizes="144px" fill />
                  </AspectRatio>
                </figure>
                <div className="flex flex-col gap-y-2">
                  <h1 className="text-7xl font-bold">Adventur&apos;IT</h1>
                  <p className="text-sm">The interactive recrutment game</p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-start gap-y-3"
              >
                <form action={formAction}>
                  <MainMenuButton className="uppercase">Start Game</MainMenuButton>
                </form>
                {/* TODO: fix bug with state returning undefined instead of message */}
                {state === undefined && (
                  <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-sm">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, delay: 0.3 }}
                      className="w-max text-lg uppercase text-white"
                    >
                      <form action={signInGithub}>
                        <Button variant="outline" className="w-52 gap-x-2">
                          <figure className="w-5">
                            <svg viewBox="0 0 438.549 438.549">
                              <path
                                fill="currentColor"
                                d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                              />
                            </svg>
                          </figure>
                          GitHub
                        </Button>
                      </form>
                      <form action={signInGoogle}>
                        <Button variant="outline" className="w-52 gap-x-2">
                          <figure className="w-5">
                            <AspectRatio ratio={1 / 1}>
                              <Image src="/assets/google.png" sizes="20px" alt="" fill />
                            </AspectRatio>
                          </figure>
                          Google
                        </Button>
                      </form>
                    </motion.div>
                  </div>
                )}
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
              className="flex h-full items-center gap-x-28 p-8 pl-40 text-lg uppercase"
            >
              <div className="gap-y-2">
                <h1 className="text-7xl font-bold">Settings</h1>
                <MainMenuButton mouvement={0} onClick={() => handleMenus("main")} className="text-sm uppercase">
                  Back
                </MainMenuButton>
              </div>

              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col items-start">
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

type ModelMenuProps = JSX.IntrinsicElements["mesh"];

export const ModelMenu: React.FC<ModelMenuProps> = () => {
  const gltf = useGLTF("/scene/menu/scene.gltf");

  return <primitive object={gltf.scene}></primitive>;
};

useGLTF.preload("/scene/menu/scene.gltf");
