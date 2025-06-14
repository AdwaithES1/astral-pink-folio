
import React from "react";

const ScreenGlowEdge = () => (
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
);

export default ScreenGlowEdge;
