// src/app/useScrollReset.ts
import { useEffect } from "react";

/**
 * Forces the page to start at the top after the first paint.
 * Uses requestAnimationFrame + a tiny timeout to ensure all
 * layout effects (including heavy 3D canvases) have settled.
 */
export default function useScrollReset() {
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    requestAnimationFrame(() => {
      setTimeout(() => window.scrollTo(0, 0), 0);
    });
  }, []);
}
