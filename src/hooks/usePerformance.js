import { useState, useEffect, useRef } from "react";

/**
 * Hook to monitor and adapt performance
 * Returns adaptive quality settings based on FPS
 */
export const usePerformance = () => {
  const [quality, setQuality] = useState("high");
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const fpsRef = useRef(60);

  useEffect(() => {
    let animationFrameId;

    const measureFPS = () => {
      frameCount.current++;
      const currentTime = performance.now();
      const delta = currentTime - lastTime.current;

      if (delta >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / delta);
        fpsRef.current = fps;
        frameCount.current = 0;
        lastTime.current = currentTime;

        // Adaptive quality based on FPS
        if (fps < 30 && quality !== "low") {
          setQuality("low");
        } else if (fps < 45 && quality !== "medium" && quality !== "low") {
          setQuality("medium");
        } else if (fps >= 50 && quality !== "high") {
          setQuality("high");
        }
      }

      animationFrameId = requestAnimationFrame(measureFPS);
    };

    animationFrameId = requestAnimationFrame(measureFPS);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [quality]);

  return { quality, fps: fpsRef.current };
};
