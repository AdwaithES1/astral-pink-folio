
import React from "react";
import Shadow from "./LaptopBase/Shadow";
import Chassis from "./LaptopBase/Chassis";
import GlowingEdge from "./LaptopBase/GlowingEdge";
import Hinge from "./LaptopBase/Hinge";

const LaptopBase = () => (
  <group>
    <Shadow />
    <Chassis />
    <GlowingEdge />
    <Hinge />
  </group>
);

export default LaptopBase;
