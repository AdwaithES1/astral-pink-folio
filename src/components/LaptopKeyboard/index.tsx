
import React from "react";
import KeyboardUnderlay from "./KeyboardUnderlay";
import KeysGrid from "./KeysGrid";
import WireframeOverlay from "./WireframeOverlay";

const LaptopKeyboard = () => (
  <group>
    <KeyboardUnderlay />
    <KeysGrid />
    <WireframeOverlay />
  </group>
);

export default LaptopKeyboard;
