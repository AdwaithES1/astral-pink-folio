
import React, { forwardRef } from "react";

const Hologram = forwardRef<any, {}>(function Hologram(_, ref) {
  return (
    <mesh
      ref={ref}
      position={[0.31, 0.77, -0.54]}
      rotation={[-0.41, 0, -0.18]}
    >
      <planeGeometry args={[0.33, 0.45]} />
      <meshStandardMaterial
        attach="material"
        args={[{
          color: "#fff",
          roughness: 0.28,
          metalness: 0.0,
          transparent: true,
          opacity: 0.21,
          emissive: "#ff3796",
          emissiveIntensity: 0.16,
        }]}
      />
    </mesh>
  );
});

export default Hologram;
