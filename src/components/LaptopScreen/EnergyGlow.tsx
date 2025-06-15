
import React from "react";

const EnergyGlow = () => (
  <mesh position={[0, 0.98, -0.46]}>
    <sphereGeometry args={[0.34, 30, 30]} />
    <meshBasicMaterial
      attach="material"
      args={[{
        color: "#ff3796",
        transparent: true,
        opacity: 0.13,
      }]}
    />
  </mesh>
);

export default EnergyGlow;
