
import React from "react";
import { meshStandardMaterial } from "@react-three/fiber";

const ScreenReflection = () => (
  <mesh position={[0.13, 0.79, -0.495]} rotation={[-0.25, 0.05, 0]}>
    <planeGeometry args={[2.01, 1.18]} />
    {React.createElement(meshStandardMaterial, {
      color: "#fff",
      transparent: true,
      opacity: 0.09,
      metalness: 1,
      roughness: 0
    })}
  </mesh>
);

export default ScreenReflection;
