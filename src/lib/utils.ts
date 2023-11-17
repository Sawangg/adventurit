import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Vector3 } from "three";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const playAudio = async (source: string, volume = 0): Promise<void> => {
  const audio = new Audio(source);
  audio.volume = volume;
  return audio.play();
};

export const createVector3 = (arr: number[]): Vector3 => {
  if (arr.length !== 3) throw new Error("Array must contain exactly 3 elements");
  return new Vector3(arr[0], arr[1], arr[2]);
};
