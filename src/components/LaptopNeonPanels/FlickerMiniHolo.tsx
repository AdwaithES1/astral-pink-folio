
import React from "react";

type FlickerMiniHoloProps = {
  x: number;
  y: number;
  z: number;
  rot: number;
};

const FlickerMiniHolo = ({ x, y, z, rot }: FlickerMiniHoloProps) => (
  <mesh position={[x, y, z]} rotation={[-0.27, 0, rot]}>
    <boxGeometry args={[0.15, 0.04, 0.09]} />
    <meshStandardMaterial
      attach="material"
      args={[{
        color: "#1e3a8a",
        roughness: 0.39,
        metalness: 0.92,
        transparent: true,
        opacity: 0.22,
        emissive: "#fff",
        emissiveIntensity: 0.28,
      }]}
    />
  </mesh>
);

export default FlickerMiniHolo;
