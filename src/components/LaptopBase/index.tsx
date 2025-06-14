
import React from "react";
import Shadow from "./Shadow";
import Chassis from "./Chassis";
import GlowingEdge from "./GlowingEdge";
import Hinge from "./Hinge";

const LaptopBase = () => (
  <group>
    <Shadow />
    <Chassis />
    <GlowingEdge />
    <Hinge />
  </group>
);

export default LaptopBase;
