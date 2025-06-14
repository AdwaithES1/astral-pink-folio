
import React from "react";

const KeyboardUnderlay = () => (
  <mesh position={[0, -0.243, 0.18]} receiveShadow>
    <boxGeometry args={[1.75, 0.013, 0.46]} />
    <meshStandardMaterial
      color="#182050"
      emissive="#ff3796"
      emissiveIntensity={0.17}
      metalness={1}
      roughness={0.32}
    />
  </mesh>
);

export default KeyboardUnderlay;
