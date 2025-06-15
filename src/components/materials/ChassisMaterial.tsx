
import React from "react";

const ChassisMaterial = () => (
  <meshStandardMaterial
    attach="material"
    args={[{
      color: "#13122b",
      metalness: 0.98,
      roughness: 0.13,
      envMapIntensity: 1.9,
    }]}
  />
);

export default ChassisMaterial;
