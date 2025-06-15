
import React from "react";

const WallpaperBackground = () => (
  <mesh position={[0, 0.778, -0.49]} rotation={[-0.25, 0, 0]}>
    <planeGeometry args={[1.91, 1.14]} />
    <meshStandardMaterial
      attach="material"
      args={[{
        color: "#1e3a8a",
        roughness: 0.09,
        metalness: 0.5,
        emissive: "#19186e",
        emissiveIntensity: 0.13,
      }]}
    />
  </mesh>
);

export default WallpaperBackground;
