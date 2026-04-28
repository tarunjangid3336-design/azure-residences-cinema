import { createContext, useContext } from "react";
import { type MotionValue } from "framer-motion";

export const SmoothScrollContext = createContext<MotionValue<number> | null>(null);

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) throw new Error("useSmoothScroll must be used within SmoothScrollProvider");
  return ctx;
}
