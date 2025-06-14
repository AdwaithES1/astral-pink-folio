
import React from "react";

const WireframeOverlay = () => (
  <mesh position={[0, -0.213, 0.21]}>
    <boxGeometry args={[1.77, 0.015, 0.49]} />
    <meshBasicMaterial
      color="#ff90e8"
      wireframe
      opacity={0.22}
      transparent
    />
  </mesh>
);

export default WireframeOverlay;
