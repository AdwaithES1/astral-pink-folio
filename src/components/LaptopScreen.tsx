
import React from "react";
import ScreenCase from "./LaptopScreen/ScreenCase";
import ScreenGlowEdge from "./LaptopScreen/ScreenGlowEdge";
import ScreenReflection from "./LaptopScreen/ScreenReflection";
import WallpaperBackground from "./LaptopScreen/WallpaperBackground";
import EnergyBall from "./LaptopScreen/EnergyBall";
import EnergyGlow from "./LaptopScreen/EnergyGlow";
import EnergyArray from "./LaptopScreen/EnergyArray";

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
