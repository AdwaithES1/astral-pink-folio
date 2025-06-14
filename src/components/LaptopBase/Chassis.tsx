
import React from "react";
import ChassisMaterial from "../materials/ChassisMaterial";

const Chassis = () => (
  <mesh position={[0, -0.35, 0]} castShadow receiveShadow>
    <boxGeometry args={[2.72, 0.13, 1.4]} />
    <ChassisMaterial />
  </mesh>
);

export default Chassis;
