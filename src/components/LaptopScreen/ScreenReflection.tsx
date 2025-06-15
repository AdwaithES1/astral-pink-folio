
import React from "react";

const ScreenReflection = () => (
  <mesh position={[0.13, 0.79, -0.495]} rotation={[-0.25, 0.05, 0]}>
    <planeGeometry args={[2.01, 1.18]} />
    <meshStandardMaterial
      attach="material"
      args={[{
        color: "#fff",
        transparent: true,
        opacity: 0.09,
        metalness: 1,
        roughness: 0,
      }]}
    />
  </mesh>
);

export default ScreenReflection;
