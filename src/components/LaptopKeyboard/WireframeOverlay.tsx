
import React from "react";
import { meshBasicMaterial } from "@react-three/fiber";

const WireframeOverlay = () => (
  <mesh position={[0, -0.213, 0.21]}>
    <boxGeometry args={[1.77, 0.015, 0.49]} />
    {React.createElement(meshBasicMaterial, {
      color: "#ff90e8",
      wireframe: true,
      opacity: 0.22,
      transparent: true,
    })}
  </mesh>
);

export default WireframeOverlay;
