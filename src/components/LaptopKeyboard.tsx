
import React from "react";

const LaptopKeyboard = () => (
  <group>
    {/* KEYBOARD - glowing underlay */}
    <mesh position={[0, -0.243, 0.18]} receiveShadow>
      <boxGeometry args={[1.75, 0.013, 0.46]} />
      <meshStandardMaterial color="#182050" emissive="#ff3796" emissiveIntensity={0.17} metalness={1} roughness={0.32} />
    </mesh>
    {/* Keys (rows, glowing pulse) */}
    {[...Array(4)].map((_, row) =>
      [...Array(14)].map((__, col) => (
        <mesh
          key={row + "-" + col}
          position={[
            -0.835 + col * 0.13,
            -0.223,
            0.008 + row * 0.09 + 0.04,
          ]}
        >
          <boxGeometry args={[0.085, 0.018, 0.07]} />
          <meshStandardMaterial color="#19143f" metalness={0.7} roughness={0.24}
            emissive={col % 2 === 0 ? "#ff3796" : "#fff"}
            emissiveIntensity={row === 2 ? 0.079 : 0.059}
            transparent opacity={0.81}
          />
        </mesh>
      ))
    )}
    {/* WIREFRAME OVERLAY */}
    <mesh position={[0, -0.213, 0.21]}>
      <boxGeometry args={[1.77, 0.015, 0.49]} />
      <meshBasicMaterial
        color="#ff90e8"
        wireframe
        opacity={0.22}
        transparent
      />
    </mesh>
  </group>
);

export default LaptopKeyboard;
