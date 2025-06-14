
import React from "react";
import { meshStandardMaterial } from "@react-three/fiber";

const HingeMaterial = () =>
  React.createElement(meshStandardMaterial, {
    color: "#161450",
    metalness: 0.9,
    roughness: 0.18,
    emissive: "#ff3796",
    emissiveIntensity: 0.15
  });

export default HingeMaterial;
