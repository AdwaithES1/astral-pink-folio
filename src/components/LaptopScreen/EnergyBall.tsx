
import React from "react";
import { meshStandardMaterial } from "@react-three/fiber";

const EnergyBall = () => (
  <mesh position={[0, 0.98, -0.47]}>
    <sphereGeometry args={[0.21, 42, 42]} />
    {React.createElement(meshStandardMaterial, {
      color: "#ff3796",
      emissive: "#ff3796",
      metalness: 0.85,
      roughness: 0.18,
      emissiveIntensity: 0.76
    })}
  </mesh>
);

export default EnergyBall;
