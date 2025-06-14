
import React from "react";
import GlowingEdgeMaterial from "../materials/GlowingEdgeMaterial";

const GlowingEdge = () => (
  <mesh position={[0, -0.293, 0]} castShadow>
    <boxGeometry args={[2.77, 0.02, 1.41]} />
    <GlowingEdgeMaterial />
  </mesh>
);

export default GlowingEdge;
