
import React from "react";

const LaptopScreen = () => (
  <group>
    {/* --- SCREEN with animated wallpaper --- */}
    <mesh position={[0, 0.76, -0.53]} rotation={[-0.25, 0, 0]}>
      <boxGeometry args={[2.04, 1.22, 0.11]} />
      <meshStandardMaterial
        color="#101059"
        roughness={0.10}
        metalness={0.88}
        envMapIntensity={1.5}
      />
    </mesh>
    {/* SCREEN GLOW edge */}
    <mesh position={[0, 0.76, -0.474]} rotation={[-0.25, 0, 0]}>
      <boxGeometry args={[2.10, 1.255, 0.01]} />
      <meshStandardMaterial
        color="#ff3796"
        metalness={0.81}
        roughness={0.06}
        transparent
        opacity={0.082}
        emissive="#ff3796"
        emissiveIntensity={0.26}
      />
    </mesh>
    {/* Parallax reflection layer */}
    <mesh position={[0.13, 0.79, -0.495]} rotation={[-0.25, 0.05, 0]}>
      <planeGeometry args={[2.01, 1.18]} />
      <meshStandardMaterial
        color="#fff"
        transparent
        opacity={0.09}
        metalness={1}
        roughness={0}
      />
    </mesh>
    {/* --- ANIMATED WALLPAPER --- */}
    {/* Deep blue animated waves */}
    <mesh position={[0, 0.778, -0.49]} rotation={[-0.25, 0, 0]}>
      <planeGeometry args={[1.91, 1.14]} />
      <meshStandardMaterial
        color="#1e3a8a"
        roughness={0.09}
        metalness={0.5}
        emissive="#19186e"
        emissiveIntensity={0.13}
      />
    </mesh>
    {/* Central pink energy ball */}
    <mesh position={[0, 0.98, -0.47]}>
      <sphereGeometry args={[0.21, 42, 42]} />
      <meshStandardMaterial
        color="#ff3796"
        emissive="#ff3796"
        metalness={0.85}
        roughness={0.18}
        emissiveIntensity={0.76}
      />
    </mesh>
    {/* Glow behind ball */}
    <mesh position={[0, 0.98, -0.46]}>
      <sphereGeometry args={[0.34, 30, 30]} />
      <meshBasicMaterial
        color="#ff3796"
        transparent
        opacity={0.13}
      />
    </mesh>
    {/* Lines around ball (spinning energy array) */}
    {[0, 0.9, 1.8].map((rot, idx) => (
      <mesh key={idx} position={[0, 0.98, -0.44]} rotation={[0, 0, rot]}>
        <torusGeometry args={[0.28 + 0.015 * idx, 0.012 + 0.006 * idx, 18, 52]} />
        <meshStandardMaterial
          color="#1e3a8a"
          metalness={1}
          roughness={0.28}
          emissive="#1e3a8a"
          emissiveIntensity={0.12 + 0.12 * idx}
          opacity={0.21 + 0.10 * idx}
          transparent
        />
      </mesh>
    ))}
  </group>
);

export default LaptopScreen;
