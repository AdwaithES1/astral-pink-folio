
import React from "react";

const LaptopLights = () => (
  <>
    {/* --- LIGHT SOURCES for more drama --- */}
    <pointLight position={[0, 2.1, 2.2]} intensity={0.47} color="#ff3796" />
    <spotLight
      position={[0, 2.7, 1.1]}
      angle={0.51}
      penumbra={0.39}
      intensity={0.34}
      color="#fff"
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
    />
    <pointLight position={[1.5, 0.1, 1.3]} intensity={0.23} color="#ff90e8" />
    <pointLight position={[-1.6, 0.35, -0.81]} intensity={0.21} color="#1e3a8a" />
  </>
);

export default LaptopLights;
