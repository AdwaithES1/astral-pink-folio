
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense } from "react";

// Simple floating icon
const FloatingIcon = ({
  icon,
  color,
  position = [0, 0, 0],
  speed = 0.4,
  scale = 0.3,
}: {
  icon: "file" | "mail" | "about" | "home";
  color: string;
  position?: [number, number, number];
  speed?: number;
  scale?: number;
}) => {
  // Custom geometry for "icon" - we'll render gradient balls for now for speed
  return (
    <mesh position={position}>
      <sphereGeometry args={[scale, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.25}
        metalness={0.8}
      />
    </mesh>
  );
};

function Laptop() {
  // "Laptop" = a base + screen (simple, stylized)
  return (
    <group>
      {/* Base */}
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[2, 0.1, 1.3]} />
        <meshStandardMaterial
          color="#16171d"
          roughness={0.28}
          metalness={0.6}
        />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.6, -0.43]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[1.98, 1.05, 0.07]} />
        <meshStandardMaterial
          color="#1f1234"
          roughness={0.18}
          metalness={0.32}
          emissive="#ff3796"
          emissiveIntensity={0.36}
        />
      </mesh>
      {/* Glow effect back screen */}
      <mesh position={[0, 0.69, -0.52]}>
        <planeGeometry args={[2.2, 1.2]} />
        <meshBasicMaterial
          color="#ff3796"
          transparent
          opacity={0.12}
        />
      </mesh>
      {/* Gradient reflection on base */}
      <mesh position={[0, -0.189, 0]}>
        <planeGeometry args={[1.8, 1.2]} />
        <meshBasicMaterial
          color="#ff90e8"
          transparent
          opacity={0.13}
        />
      </mesh>
    </group>
  );
}

const iconsData = [
  { icon: "home", color: "#ff3796", position: [1.3, 0.9, 0], scale: 0.13 },
  { icon: "about", color: "#1e3a8a", position: [-1.15, 0.7, 0.1], scale: 0.12 },
  { icon: "file", color: "#ff90e8", position: [0.8, 1.1, -0.3], scale: 0.11 },
  { icon: "mail", color: "#ff90e8", position: [0.4, 0.4, 0.7], scale: 0.13 },
  { icon: "home", color: "#ff3796", position: [-0.85, 1.2, -0.4], scale: 0.11 },
];

// Animation settings: slow rotate
const Main3DLaptop = () => (
  <div className="w-full h-[370px] md:h-[500px] select-none">
    <Canvas
      camera={{ position: [0, 1.2, 4], fov: 30, near: 0.1, far: 30 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.75} />
      <pointLight position={[-5, 8, 6]} color="#ff3796" intensity={0.18} />
      <pointLight position={[5, 7, 8]} color="#1e3a8a" intensity={0.12} />
      <directionalLight position={[0, 5, 3]} intensity={0.19} />
      <Suspense fallback={null}>
        <group rotation={[0.2, 0.3, 0]}>
          <Laptop />
          {/* Floating icons */}
          {iconsData.map((icon, i) => (
            <group key={i} position={icon.position}>
              <FloatingIcon
                {...icon}
              />
            </group>
          ))}
        </group>
      </Suspense>
    </Canvas>
  </div>
);

export default Main3DLaptop;
