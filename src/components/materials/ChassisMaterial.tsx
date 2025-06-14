
import React from "react";
import { meshStandardMaterial } from "@react-three/fiber";

const ChassisMaterial = () =>
  React.createElement(meshStandardMaterial, {
    color: "#13122b",
    metalness: 0.98,
    roughness: 0.13,
    envMapIntensity: 1.9
  });

export default ChassisMaterial;
