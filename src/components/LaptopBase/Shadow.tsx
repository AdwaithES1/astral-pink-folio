
import React from "react";
import GlassyShadowMaterial from "../materials/GlassyShadowMaterial";

const Shadow = () => (
  <mesh position={[0, -0.52, -0.28]} rotation={[-0.41, 0, 0]} scale={[2.6, 0.7, 1]}>
    <circleGeometry args={[1, 54]} />
    <GlassyShadowMaterial />
  </mesh>
);

export default Shadow;
