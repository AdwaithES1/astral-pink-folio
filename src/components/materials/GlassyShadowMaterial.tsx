
import React from "react";

const GlassyShadowMaterial = () => (
  <meshBasicMaterial
    attach="material"
    args={[{
      color: "#0e0a2f",
      transparent: true,
      opacity: 0.39,
    }]}
  />
);

export default GlassyShadowMaterial;
