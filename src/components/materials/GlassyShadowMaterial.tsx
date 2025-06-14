
import React from "react";
import { meshBasicMaterial } from "@react-three/fiber";

const GlassyShadowMaterial = () =>
  React.createElement(meshBasicMaterial, {
    color: "#0e0a2f",
    transparent: true,
    opacity: 0.39,
  });

export default GlassyShadowMaterial;
