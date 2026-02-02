import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Computer } from "../Models/Computer-optimized";
import { useMediaQuery } from "react-responsive";
import { useMemo } from "react";

const ContactExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  // Adaptive pixel ratio based on device
  const pixelRatio = useMemo(() => {
    if (isMobile) return Math.min(window.devicePixelRatio, 1.5);
    if (isTablet) return Math.min(window.devicePixelRatio, 2);
    return Math.min(window.devicePixelRatio, 2.5);
  }, [isMobile, isTablet]);

  return (
    <Canvas
      camera={{ position: [0, 3, 7], fov: 45 }}
      shadows={!isMobile}
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
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
        enableDamping={true}
        dampingFactor={0.05}
      />

      {/* Optimized Lights - Reduced count and intensity */}
      <ambientLight intensity={1.4} color="#fff4e6" />
      <directionalLight
        position={[5, 5, 3]}
        intensity={2}
        color="#ffd9b3"
        castShadow={!isMobile}
      />
      <spotLight
        position={[2, 5, 3]}
        angle={0.3}
        intensity={0.6}
        penumbra={0.5}
        color="white"
        castShadow={false}
      />
      <pointLight
        position={[-2, 2, 2]}
        intensity={0.4}
        color="#4cc9f0"
        castShadow={false}
      />

      {/* Computer Model */}
      <group
        scale={0.025}
        position={[0, -1.5, -2]}
        rotation={[0, -Math.PI / 6, 0]}
        castShadow={!isMobile}
      >
        <Computer />
      </group>

      <group scale={[1, 1, 1]}>
        <mesh
          receiveShadow={!isMobile}
          position={[0, -1.5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#a46b2d" />
        </mesh>
      </group>
    </Canvas>
  );
};

export default ContactExperience;
