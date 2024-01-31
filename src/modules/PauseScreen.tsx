"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useSettingsStore } from "@stores/useSettings";
import { Button } from "@ui/hera/Button";
import { AspectRatio } from "@ui/hera/primitives/AspectRatio";
import { Switch } from "@ui/hera/Switch";

export const PauseScreen: React.FC = () => {
  const [paused, setPaused] = useState(false);
  const { graphics, setGraphics } = useSettingsStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPaused((p) => !p);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {paused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/70 backdrop-blur-sm"
        >
          <div className="size-36">
            <AspectRatio ratio={1 / 1}>
              <Image src="/assets/logo.png" alt="" sizes="144px" fill />
            </AspectRatio>
          </div>
          <h1 className="text-5xl">Game Paused</h1>
          <Button onPress={() => setPaused(false)}>Resume</Button>
          <div className="flex items-center gap-3">
            <p>High graphics:</p>
            <Switch defaultSelected={graphics} onChange={() => setGraphics(!graphics)} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
