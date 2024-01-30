import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const playAudio = async (source: string, volume = 0): Promise<void> => {
  const audio = new Audio(source);
  audio.volume = volume;
  return audio.play();
};
