
import React from "react";
import { meshStandardMaterial } from "@react-three/fiber";

const ENERGY_ARRAY_CONFIGS = [
  { rot: 0, idx: 0 },
  { rot: 0.9, idx: 1 },
  { rot: 1.8, idx: 2 },
];

const EnergyArray = () => (
  <>
    {ENERGY_ARRAY_CONFIGS.map(({ rot, idx }) => (
      <mesh key={idx} position={[0, 0.98, -0.44]} rotation={[0, 0, rot]}>
        <torusGeometry args={[0.28 + 0.015 * idx, 0.012 + 0.006 * idx, 18, 52]} />
        {React.createElement(meshStandardMaterial, {
          color: "#1e3a8a",
          metalness: 1,
          roughness: 0.28,
          emissive: "#1e3a8a",
          emissiveIntensity: 0.12 + 0.12 * idx,
          opacity: 0.21 + 0.10 * idx,
          transparent: true,
        })}
      </mesh>
    ))}
  </>
);

export default EnergyArray;
