
import React from "react";
import { meshStandardMaterial } from "@react-three/fiber";

type KeyboardKeyProps = {
  row: number;
  col: number;
};

const KeyboardKey = ({ row, col }: KeyboardKeyProps) => (
  <mesh
    position={[
      -0.835 + col * 0.13,
      -0.223,
      0.008 + row * 0.09 + 0.04,
    ]}
  >
    <boxGeometry args={[0.085, 0.018, 0.07]} />
    {React.createElement(meshStandardMaterial, {
      color: "#19143f",
      metalness: 0.7,
      roughness: 0.24,
      emissive: col % 2 === 0 ? "#ff3796" : "#fff",
      emissiveIntensity: row === 2 ? 0.079 : 0.059,
      transparent: true,
      opacity: 0.81
    })}
  </mesh>
);

export default KeyboardKey;
