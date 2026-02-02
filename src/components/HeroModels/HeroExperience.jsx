import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Room } from "./Room";
import HeroLights from "./HeroLights";
import { useMemo } from "react";

const HeroExperience = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // Adaptive pixel ratio based on device
  const pixelRatio = useMemo(() => {
    if (isMobile) return Math.min(window.devicePixelRatio, 1.5);
    if (isTablet) return Math.min(window.devicePixelRatio, 2);
    return Math.min(window.devicePixelRatio, 2.5);
  }, [isMobile, isTablet]);

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      dpr={pixelRatio}
      performance={{ min: 0.5, max: 1 }}
      gl={{
        antialias: !isMobile,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
        alpha: true,
        preserveDrawingBuffer: false,
      }}
    >
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
        enableDamping={true}
        dampingFactor={0.05}
      />

      <HeroLights />

      <group
        scale={isMobile ? 0.7 : 1}
        position={[0, -3.5, 0]}
        rotation={[0, -Math.PI / 4, 0]}
      >
        <Room />
      </group>
    </Canvas>
  );
};

export default HeroExperience;
