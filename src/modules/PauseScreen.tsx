"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AspectRatio } from "@ui/AspectRatio";

export const PauseScreen: React.FC = () => {
  const [paused, setPaused] = useState(false);

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
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/50"
        >
          <figure className="w-36">
            <AspectRatio ratio={1 / 1}>
              <Image src="/assets/logo.png" alt="" sizes="144px" fill />
            </AspectRatio>
          </figure>
          <h1 className="text-4xl">Game Paused</h1>
          <button onClick={() => setPaused(false)}>Resume</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
