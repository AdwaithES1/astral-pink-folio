
import * as THREE from "three";
import { MeshStandardMaterialProps, MeshBasicMaterialProps } from "@react-three/fiber";
import React from "react";

// Typed wrapper for MeshStandardMaterial
export const Standard = (props: MeshStandardMaterialProps) => (
  // @ts-ignore
  <meshStandardMaterial attach="material" {...props as any} />
);

// Typed wrapper for MeshBasicMaterial
export const Basic = (props: MeshBasicMaterialProps) => (
  // @ts-ignore
  <meshBasicMaterial attach="material" {...props as any} />
);

