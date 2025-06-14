
import React from "react";
import ScreenCase from "./ScreenCase";
import ScreenGlowEdge from "./ScreenGlowEdge";
import ScreenReflection from "./ScreenReflection";
import WallpaperBackground from "./WallpaperBackground";
import EnergyBall from "./EnergyBall";
import EnergyGlow from "./EnergyGlow";
import EnergyArray from "./EnergyArray";

const LaptopScreen = () => (
  <group>
    <ScreenCase />
    <ScreenGlowEdge />
    <ScreenReflection />
    <WallpaperBackground />
    <EnergyBall />
    <EnergyGlow />
    <EnergyArray />
  </group>
);

export default LaptopScreen;
