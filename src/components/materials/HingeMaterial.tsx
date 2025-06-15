
import React from "react";

const HingeMaterial = () => (
  <meshStandardMaterial
    attach="material"
    args={[{
      color: "#161450",
      metalness: 0.9,
      roughness: 0.18,
      emissive: "#ff3796",
      emissiveIntensity: 0.15,
    }]}
  />
);

export default HingeMaterial;
