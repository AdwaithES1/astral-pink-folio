
import React from "react";

const GlowingEdgeMaterial = () => (
  <meshStandardMaterial
    color="#1e3a8a"
    emissive="#1e3a8a"
    metalness={0.7}
    roughness={0.07}
    emissiveIntensity={0.4}
    transparent
    opacity={0.22}
  />
);

export default GlowingEdgeMaterial;
