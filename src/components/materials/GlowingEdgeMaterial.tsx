
import React from "react";
import { meshStandardMaterial } from "@react-three/fiber";

const GlowingEdgeMaterial = () =>
  React.createElement(meshStandardMaterial, {
    color: "#1e3a8a",
    emissive: "#1e3a8a",
    metalness: 0.7,
    roughness: 0.07,
    emissiveIntensity: 0.4,
    transparent: true,
    opacity: 0.22,
  });

export default GlowingEdgeMaterial;
