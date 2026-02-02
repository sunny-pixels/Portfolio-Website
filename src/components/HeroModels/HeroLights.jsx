import * as THREE from "three";
import { useMemo, memo } from "react";

const HeroLights = () => {
  // Memoize RectAreaLight to prevent recreation on every render
  const rectAreaLight = useMemo(() => {
    const light = new THREE.RectAreaLight("#A259FF", 8, 3, 2);
    light.position.set(1, 3, 4);
    light.intensity = 15;
    light.rotation.set(Math.PI / 4, Math.PI / 4, 0);
    return light;
  }, []);

  return (
    <>
      {/* Optimized: Reduced light count and intensities for better performance */}
      <spotLight
        position={[2, 5, 6]}
        angle={0.15}
        intensity={80}
        penumbra={0.2}
        color="white"
        castShadow={false}
      />

      <spotLight
        position={[4, 5, 4]}
        angle={0.3}
        intensity={30}
        penumbra={0.5}
        color="#4cc9f0"
        castShadow={false}
      />

      <spotLight
        position={[-3, 5, 5]}
        angle={0.4}
        intensity={45}
        penumbra={1}
        color="#9d4edd"
        castShadow={false}
      />

      <primitive object={rectAreaLight} />

      {/* Reduced point lights - combined into one for better performance */}
      <pointLight
        position={[0.5, 1.5, -1]}
        intensity={12}
        color="#7209b7"
        castShadow={false}
      />
    </>
  );
};

export default memo(HeroLights);
