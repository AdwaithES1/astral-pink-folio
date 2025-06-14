
import React from "react";
import { meshStandardMaterial } from "@react-three/fiber";

const ScreenCase = () => (
  <mesh position={[0, 0.76, -0.53]} rotation={[-0.25, 0, 0]}>
    <boxGeometry args={[2.04, 1.22, 0.11]} />
    {React.createElement(meshStandardMaterial, {
      color: "#101059",
      roughness: 0.10,
      metalness: 0.88,
      envMapIntensity: 1.5,
    })}
  </mesh>
);

export default ScreenCase;
