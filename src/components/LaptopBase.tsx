
import React from "react";

const LaptopBase = () => (
  <group>
    {/* FLOATING PARALLAX SHADOW */}
    <mesh position={[0, -0.52, -0.28]} rotation={[-0.41, 0, 0]} scale={[2.6, 0.7, 1]}>
      <circleGeometry args={[1, 54]} />
      <meshBasicMaterial color="#0e0a2f" transparent opacity={0.39} />
    </mesh>
    {/* BASE - Metallic chassis, chunky */}
    <mesh position={[0, -0.35, 0]} castShadow receiveShadow>
      <boxGeometry args={[2.72, 0.13, 1.4]} />
      <meshStandardMaterial color="#13122b" metalness={0.98} roughness={0.13} envMapIntensity={1.9} />
    </mesh>
    {/* Glowing edge wrap */}
    <mesh position={[0, -0.293, 0]} castShadow>
      <boxGeometry args={[2.77, 0.02, 1.41]} />
      <meshStandardMaterial color="#1e3a8a" emissive="#1e3a8a" metalness={0.7} roughness={0.07} emissiveIntensity={0.4} transparent opacity={0.22} />
    </mesh>
    {/* HINGE - deep glowing */}
    <mesh position={[0, -0.19, -0.71]}>
      <cylinderGeometry args={[0.09, 0.08, 2.1, 40]} />
      <meshStandardMaterial
        color="#161450"
        metalness={0.9}
        roughness={0.18}
        emissive="#ff3796"
        emissiveIntensity={0.15}
      />
    </mesh>
  </group>
);

export default LaptopBase;
