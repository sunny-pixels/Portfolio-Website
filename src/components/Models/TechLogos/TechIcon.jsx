import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useMediaQuery } from "react-responsive";

const TechIcon = ({ model }) => {
  const scene = useGLTF(model.modelPath);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // Memoize material to prevent recreation
  const whiteMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "white" }),
    []
  );

  useEffect(() => {
    if (model.name === "Interactive Developer") {
      scene.scene.traverse((child) => {
        if (child.isMesh && child.name === "Object_5") {
          child.material = whiteMaterial;
        }
      });
    }
  }, [scene, whiteMaterial, model.name]);

  // Adaptive pixel ratio for better performance
  const pixelRatio = useMemo(() => {
    return isMobile
      ? Math.min(window.devicePixelRatio, 1.5)
      : Math.min(window.devicePixelRatio, 2);
  }, [isMobile]);

  return (
    <Canvas
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
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Use simpler environment on mobile for better performance */}
      {!isMobile && <Environment preset="city" />}
      {isMobile && <Environment preset="sunset" />}

      <OrbitControls
        enableZoom={false}
        enableDamping={true}
        dampingFactor={0.05}
      />

      <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
        <group scale={model.scale} rotation={model.rotation}>
          <primitive object={scene.scene} />
        </group>
      </Float>
    </Canvas>
  );
};

export default TechIcon;
