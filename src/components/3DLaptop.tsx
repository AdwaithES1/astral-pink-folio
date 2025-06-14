
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

// --- 2200 sci-fi layered laptop --- //
function FuturisticLaptop() {
  // Animate device "power waves" and hologram
  const powerHoloRef = useRef<THREE.Mesh>(null!);
  const neonLinesRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    // Animate hologram panel
    if (powerHoloRef.current) {
      const t = clock.getElapsedTime();
      powerHoloRef.current.position.y = 0.85 + Math.sin(t * 2.4) * 0.09;
      powerHoloRef.current.material.opacity = 0.25 + 0.12 * Math.sin(t * 2.2 + 0.7);
    }
    // Subtle shimmer for neon lines
    if (neonLinesRef.current) {
      const t = clock.getElapsedTime();
      neonLinesRef.current.material.opacity = 0.32 + 0.13 * Math.sin(t * 3.1);
    }
  });

  return (
    <group>
      {/* FLOATING PARALLAX SHADOW */}
      <mesh position={[0, -0.52, -0.28]} rotation={[-0.41, 0, 0]}>
        <ellipseGeometry args={[2.6, 0.7, 54]} />
        <meshBasicMaterial
          attach="material"
          args={[{ color: "#0e0a2f", opacity: 0.39, transparent: true }]}
        />
      </mesh>

      {/* BASE - Metallic chassis, chunky */}
      <mesh position={[0, -0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.72, 0.13, 1.4]} />
        <meshStandardMaterial
          attach="material"
          args={[{ color: "#13122b", metalness: 0.98, roughness: 0.13, envMapIntensity: 1.9 }]}
        />
      </mesh>
      {/* Glowing edge wrap */}
      <mesh position={[0, -0.293, 0]} castShadow>
        <boxGeometry args={[2.77, 0.02, 1.41]} />
        <meshStandardMaterial
          attach="material"
          args={[{ color: "#1e3a8a", emissive: "#1e3a8a", metalness: 0.7, roughness: 0.07, emissiveIntensity: 0.4, opacity: 0.22, transparent: true }]}
        />
      </mesh>

      {/* KEYBOARD - glowing underlay */}
      <mesh position={[0, -0.243, 0.18]} receiveShadow>
        <boxGeometry args={[1.75, 0.013, 0.46]} />
        <meshStandardMaterial
          attach="material"
          args={[{ color: "#182050", emissive: "#ff3796", emissiveIntensity: 0.17, metalness: 1, roughness: 0.32 }]}
        />
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
            <meshStandardMaterial
              attach="material"
              color="#19143f"
              metalness={0.7}
              roughness={0.24}
              emissive={col % 2 === 0 ? "#ff3796" : "#fff"}
              emissiveIntensity={row === 2 ? 0.079 : 0.059}
              transparent
              opacity={0.81}
            />
          </mesh>
        ))
      )}

      {/* WIREFRAME OVERLAY */}
      <mesh position={[0, -0.213, 0.21]}>
        <boxGeometry args={[1.77, 0.015, 0.49]} />
        <meshBasicMaterial
          attach="material"
          color="#ff90e8"
          wireframe
          opacity={0.22}
          transparent
        />
      </mesh>

      {/* HINGE - deep glowing */}
      <mesh position={[0, -0.19, -0.71]}>
        <cylinderGeometry args={[0.09, 0.08, 2.1, 40]} />
        <meshStandardMaterial
          attach="material"
          args={[{ color: "#161450", metalness: 0.9, roughness: 0.18, emissive: "#ff3796", emissiveIntensity: 0.15 }]}
        />
      </mesh>

      {/* --- SCREEN with animated wallpaper --- */}
      <mesh position={[0, 0.76, -0.53]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[2.04, 1.22, 0.11]} />
        <meshStandardMaterial
          attach="material"
          args={[{ color: "#101059", roughness: 0.10, metalness: 0.88, envMapIntensity: 1.5 }]}
        />
      </mesh>
      {/* SCREEN GLOW edge */}
      <mesh position={[0, 0.76, -0.474]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[2.10, 1.255, 0.01]} />
        <meshStandardMaterial
          attach="material"
          args={[{ color: "#ff3796", metalness: 0.81, roughness: 0.06, transparent: true, opacity: 0.082, emissive: "#ff3796", emissiveIntensity: 0.26 }]}
        />
      </mesh>
      {/* Parallax reflection layer */}
      <mesh position={[0.13, 0.79, -0.495]} rotation={[-0.25, 0.05, 0]}>
        <planeGeometry args={[2.01, 1.18]} />
        <meshStandardMaterial
          attach="material"
          args={[{ color: "#fff", transparent: true, opacity: 0.09, metalness: 1, roughness: 0 }]}
        />
      </mesh>

      {/* --- ANIMATED WALLPAPER --- */}
      {/* Deep blue animated waves */}
      <mesh position={[0, 0.778, -0.49]} rotation={[-0.25, 0, 0]}>
        <planeGeometry args={[1.91, 1.14]} />
        <meshStandardMaterial
          attach="material"
          args={[{ color: "#1e3a8a", roughness: 0.09, metalness: 0.5, emissive: "#19186e", emissiveIntensity: 0.13 }]}
        />
      </mesh>

      {/* Central pink energy ball */}
      <mesh position={[0, 0.98, -0.47]}>
        <sphereGeometry args={[0.21, 42, 42]} />
        <meshStandardMaterial
          attach="material"
          color="#ff3796"
          emissive="#ff3796"
          metalness={0.85}
          roughness={0.18}
          emissiveIntensity={0.76}
        />
      </mesh>
      {/* Glow behind ball */}
      <mesh position={[0, 0.98, -0.46]}>
        <sphereGeometry args={[0.34, 30, 30]} />
        <meshBasicMaterial
          attach="material"
          color="#ff3796"
          transparent
          opacity={0.13}
        />
      </mesh>
      {/* Lines around ball (spinning energy array) */}
      {[0, 0.9, 1.8].map((rot, idx) => (
        <mesh key={idx} position={[0, 0.98, -0.44]} rotation={[0, 0, rot]}>
          <torusGeometry args={[0.28 + 0.015 * idx, 0.012 + 0.006 * idx, 18, 52]} />
          <meshStandardMaterial
            attach="material"
            color="#1e3a8a"
            metalness={1}
            roughness={0.28}
            emissive="#1e3a8a"
            emissiveIntensity={0.12 + 0.12 * idx}
            opacity={0.21 + 0.10 * idx}
            transparent
          />
        </mesh>
      ))}

      {/* --- FLOATING NEON LINES and PANELS --- */}
      {/* Neon lines (move opacity for shimmer) */}
      <mesh ref={neonLinesRef} position={[0, 0.56, -0.38]}>
        <planeGeometry args={[0.95, 0.045]} />
        <meshBasicMaterial
          attach="material"
          color="#ff3796"
          opacity={0.32}
          transparent
        />
      </mesh>
      {/* Hologram popup (animated upward shimmer) */}
      <mesh
        ref={powerHoloRef}
        position={[0.31, 0.77, -0.54]}
        rotation={[-0.41, 0, -0.18]}
      >
        <planeGeometry args={[0.33, 0.45]} />
        <meshStandardMaterial
          attach="material"
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
            attach="material"
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
    </group>
  );
}

const Main3DLaptop = () => (
  <div className="w-full h-[420px] md:h-[540px] select-none pt-7 md:pt-10 flex items-center justify-center">
    <Canvas
      camera={{ position: [0, 1.16, 4.06], fov: 32, near: 0.1, far: 35 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
      shadows
    >
      <ambientLight intensity={0.75} color="#18121e" />
      <Suspense fallback={null}>
        <group rotation={[0.185, 0.29, 0.01]}>
          <FuturisticLaptop />
        </group>
      </Suspense>
    </Canvas>
  </div>
);

export default Main3DLaptop;
