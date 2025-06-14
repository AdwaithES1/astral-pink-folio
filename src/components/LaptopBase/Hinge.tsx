
import React from "react";
import HingeMaterial from "../materials/HingeMaterial";

const Hinge = () => (
  <mesh position={[0, -0.19, -0.71]}>
    <cylinderGeometry args={[0.09, 0.08, 2.1, 40]} />
    <HingeMaterial />
  </mesh>
);

export default Hinge;
