"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CameraControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { Leva, useControls } from "leva";
import { useFormState } from "react-dom";
import { startGame } from "@actions/game/startGame";
import { afkTimeoutSeconds } from "@lib/constants";
import type { Dictionnary } from "@lib/getDictionnary";
import { playAudio } from "@lib/utils";
import { MainMenuButton } from "@modules/scene/menu/MainMenuButton";
import { MainMenuLogin } from "@modules/scene/menu/MainMenuLogin";
import { SceneAccueilModel } from "@modules/scene/model/SceneAccueilModel";
import { env } from "@src/env.mjs";
import { useSettingsStore } from "@stores/useSettings";
import { Button } from "@ui/hera/Button";
import { AspectRatio } from "@ui/hera/primitives/AspectRatio";
import { Switch } from "@ui/hera/Switch";

export type MainMenuProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  dictionnary: Dictionnary;
};

// Suspense with animation should be here for the 3d menu scene because it is the first scene the user is going to see
export const MainMenu: React.FC<MainMenuProps> = () => {
  const { position } = useControls({
    position: {
      // value: [2, -9, -9],
      value: [-8, -8, -9],
      step: 1,
    },
  });

  // value: [-12, -9, -18],

  const controls = useRef<CameraControls>(null);
  const [currentMenu, setCurrentMenu] = useState<string>("anykey");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [state, startGameAction] = useFormState<{ message: string | null }>(startGame, { message: null });
  const { graphics, setGraphics } = useSettingsStore();

  const handleMenus = useCallback(
    (menu: string) => {
      if (timeoutId) clearTimeout(timeoutId);

      switch (menu) {
        case "anykey":
          // void controls.current?.dolly(3, true);
          // void controls.current?.truck(-5, 0, true);
          break;
        case "main":
          // if (currentMenu === "settings") void controls.current?.truck(0, 0, true);
          break;
        case "settings":
          // if (currentMenu === "main") void controls.current?.truck(-0, 0, true);
          break;
        default:
          break;
      }
      setCurrentMenu(menu);
    },
    [timeoutId],
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
      <Leva hidden={!env.NEXT_PUBLIC_DEBUG} />
      <Canvas className="h-svh bg-[#538db1]" shadows>
        {env.NEXT_PUBLIC_DEBUG && <Stats />}
        {graphics ? (
          <directionalLight position={[0, 30, 30]} intensity={2} castShadow />
        ) : (
          <ambientLight intensity={1} />
        )}

        <CameraControls ref={controls} />
        <SceneAccueilModel position={position} />
      </Canvas>

      <div className="absolute inset-0 size-full text-white">
        <AnimatePresence>
          {currentMenu === "anykey" && (
            <div
              className="flex size-full items-center justify-center bg-black/70 backdrop-blur-sm"
              onClick={() => handleMenus("main")}
              onKeyDown={() => handleMenus("main")}
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
              className="flex h-full items-center gap-x-6 p-8 text-lg 3xl:gap-x-28"
            >
              <div className="flex items-center">
                <div className="size-36">
                  <AspectRatio ratio={1 / 1}>
                    <Image src="/assets/logo.png" alt="" sizes="144px" fill />
                  </AspectRatio>
                </div>
                <div className="flex flex-col gap-y-2">
                  <h1 className="text-4xl font-bold uppercase 2xl:text-6xl 3xl:text-7xl">Adventur&apos;IT</h1>
                  <p className="text-sm uppercase">The interactive recrutment game</p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-start gap-y-4"
              >
                <form action={startGameAction}>
                  <Button type="submit">Start Game</Button>
                </form>
                {state?.message === "error" && <MainMenuLogin />}
                <Button
                  className="w-full"
                  onPress={async () => {
                    await playAudio("/assets/sounds/click.mp3", 0.3);
                    handleMenus("settings");
                  }}
                >
                  Settings
                </Button>
              </motion.div>
            </motion.div>
          )}

          {currentMenu === "settings" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 2 }}
              className="flex h-full items-center gap-x-28 p-8 pl-40 text-lg"
            >
              <div className="flex flex-col gap-y-2">
                <h1 className="text-4xl font-bold uppercase 2xl:text-6xl 3xl:text-7xl">Settings</h1>
                <div className="flex gap-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                  <MainMenuButton mouvement={0} onClick={() => handleMenus("main")} className="text-sm uppercase">
                    Back
                  </MainMenuButton>
                </div>
              </div>

              <div className="flex flex-col gap-y-14">
                <div className="flex flex-col gap-y-3">
                  <h2 className="text-3xl">Graphics</h2>
                  <div className="flex items-center justify-between">
                    <p>High</p>
                    <Switch defaultSelected={graphics} onChange={() => setGraphics(!graphics)} />
                  </div>
                </div>

                <div className="flex flex-col gap-y-3">
                  <h2 className="text-3xl">Language</h2>
                  <Button>Français</Button>
                  <Button>English</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
