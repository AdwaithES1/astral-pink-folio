
import React, { forwardRef } from "react";
import { meshBasicMaterial } from "@react-three/fiber";

const NeonLines = forwardRef<any, {}>(function NeonLines(_, ref) {
  return (
    <mesh ref={ref} position={[0, 0.56, -0.38]}>
      <planeGeometry args={[0.95, 0.045]} />
      {React.createElement(meshBasicMaterial, {
        color: "#ff3796",
        opacity: 0.32,
        transparent: true,
      })}
    </mesh>
  );
});

export default NeonLines;
