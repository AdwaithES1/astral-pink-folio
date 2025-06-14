
import React, { forwardRef } from "react";

export const LaptopNeonPanels = forwardRef<THREE.Mesh[], {}>(function LaptopNeonPanels(props, ref) {
  // We'll forward refs as an array of mesh refs for neonLines (index 0) and powerHolo (index 1).
  // This makes ref assignment from parent (FuturisticLaptop) easy.
  return (
    <group>
      {/* Neon lines (move opacity for shimmer) */}
      <mesh ref={Array.isArray(ref) ? ref[0] : undefined} position={[0, 0.56, -0.38]}>
        <planeGeometry args={[0.95, 0.045]} />
        <meshBasicMaterial
          color="#ff3796"
          opacity={0.32}
          transparent
        />
      </mesh>
      {/* Hologram popup (animated upward shimmer) */}
      <mesh
        ref={Array.isArray(ref) ? ref[1] : undefined}
        position={[0.31, 0.77, -0.54]}
        rotation={[-0.41, 0, -0.18]}
      >
        <planeGeometry args={[0.33, 0.45]} />
        <meshStandardMaterial
          color="#fff"
          roughness={0.28}
          metalness={0.0}
          transparent
          opacity={0.21}
          emissive="#ff3796"
          emissiveIntensity={0.16}
        />
      </mesh>
      {/* Flickering mini-holos */}
      {[[-0.9, 0.91, -0.46], [0.9, 0.92, -0.44]].map(([x, y, z], idx) => (
        <mesh
          key={idx}
          position={[x, y, z]}
          rotation={[-0.27, 0, 0.6 - 1.2 * idx]}
        >
          <boxGeometry args={[0.15, 0.04, 0.09]} />
          <meshStandardMaterial
            color="#1e3a8a"
            roughness={0.39}
            metalness={0.92}
            transparent
            opacity={0.22}
            emissive="#fff"
            emissiveIntensity={0.28}
          />
        </mesh>
      ))}
    </group>
  );
});
