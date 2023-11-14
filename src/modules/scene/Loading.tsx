"use client";

import { Html, useProgress } from "@react-three/drei";
import { motion } from "framer-motion";

export function LoadingScene() {
  const { progress } = useProgress();

  return (
    <Html fullscreen>
      <motion.div className="absolute bottom-0 left-0 h-2 bg-white" animate={{ width: `${progress}%` }}></motion.div>
    </Html>
  );
}
