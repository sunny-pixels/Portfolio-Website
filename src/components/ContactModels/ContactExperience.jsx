import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Computer } from "../Models/Computer-optimized";
import * as THREE from "three";

const ContactExperience = () => {

  return (
    <Canvas camera={{ position: [0, 3, 7], fov: 45 }} shadows>
      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      {/* Lights */}
      <ambientLight intensity={0.5} color='#fff4e6' />
      <directionalLight position={[5, 5, 3]} intensity={2.5} color='#ffd9b3' />
      <spotLight
        position={[2, 5, 3]}
        angle={0.3}
        intensity={0.8}
        penumbra={0.5}
        color="white"
      />
      <pointLight position={[-2, 2, 2]} intensity={0.5} color="#4cc9f0" />

      {/* Computer Model */}
      <group
        scale={0.025}
        position={[0, -1.5, -2]}
        rotation={[0, -Math.PI / 6, 0]}
        castShadow
      >
        <Computer />
      </group>

      <group scale={[1, 1, 1]}>
        <mesh receiveShadow position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[30,30]} />
            <meshStandardMaterial color='#a46b2d' />
        </mesh>
      </group>
    </Canvas>
  );
};

export default ContactExperience;
