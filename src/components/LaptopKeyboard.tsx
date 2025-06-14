
import React from "react";
import KeyboardUnderlay from "./LaptopKeyboard/KeyboardUnderlay";
import KeysGrid from "./LaptopKeyboard/KeysGrid";
import WireframeOverlay from "./LaptopKeyboard/WireframeOverlay";

const LaptopKeyboard = () => (
  <group>
    <KeyboardUnderlay />
    <KeysGrid />
    <WireframeOverlay />
  </group>
);

export default LaptopKeyboard;
