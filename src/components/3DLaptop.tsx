
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import LaptopWallpaper from "./LaptopWallpaper";

// Simple floating icon orb
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
  // Orbs for floating icons
  return (
    <mesh position={position}>
      <sphereGeometry args={[scale || 0.3, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.56}
        roughness={0.27}
        metalness={0.8}
      />
    </mesh>
  );
};

function Laptop() {
  // "Laptop" = a base + screen (modernized)
  return (
    <group>
      {/* Base */}
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[2, 0.07, 1.2]} />
        <meshStandardMaterial color="#17111c" roughness={0.20} metalness={0.6} />
      </mesh>
      {/* Thin glowing edges */}
      <mesh position={[0, -0.202, 0.605]}>
        <boxGeometry args={[2, 0.012, 1.21]} />
        <meshStandardMaterial color="#ff3796" emissive="#ff3796" emissiveIntensity={0.17} transparent opacity={0.15} roughness={0.1} metalness={0.7} />
      </mesh>
      {/* Screen casing */}
      <mesh position={[0, 0.6, -0.43]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[1.98, 1.05, 0.09]} />
        <meshStandardMaterial color="#191827" roughness={0.10} metalness={0.5} />
      </mesh>
      {/* Screen - show animated wallpaper */}
      <group position={[0, 0.61, -0.49]} rotation={[-0.25, 0, 0]}>
        <LaptopWallpaper />
      </group>
      {/* Glow behind screen */}
      <mesh position={[0, 0.69, -0.52]}>
        <planeGeometry args={[2.2, 1.2]} />
        <meshBasicMaterial color="#ff3796" transparent opacity={0.12} />
      </mesh>
      {/* Gradient reflection on base */}
      <mesh position={[0, -0.169, 0]}>
        <planeGeometry args={[1.8, 1.15]} />
        <meshBasicMaterial color="#ff90e8" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

// Floating icons data (fix: static 'icon' typing, not string)
const iconsData: {
  icon: "home" | "about" | "file" | "mail";
  color: string;
  position: [number, number, number];
  scale: number;
}[] = [
  { icon: "home", color: "#ff3796", position: [1.1, 0.9, 0], scale: 0.11 },
  { icon: "about", color: "#1e3a8a", position: [-1.1, 0.73, 0.12], scale: 0.12 },
  { icon: "file", color: "#ff90e8", position: [0.8, 1.04, -0.23], scale: 0.10 },
  { icon: "mail", color: "#ff90e8", position: [0.5, 0.43, 0.68], scale: 0.11 },
  { icon: "home", color: "#ff3796", position: [-0.87, 1.21, -0.34], scale: 0.11 },
];

const Main3DLaptop = () => (
  <div className="w-full h-[370px] md:h-[500px] select-none">
    <Canvas
      camera={{ position: [0, 1.18, 4.1], fov: 30, near: 0.1, far: 30 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.83} />
      <pointLight position={[-5, 8, 6]} color="#ff3796" intensity={0.18} />
      <pointLight position={[5, 7, 8]} color="#1e3a8a" intensity={0.16} />
      <directionalLight position={[0, 5, 3]} intensity={0.18} />
      <Suspense fallback={null}>
        <group rotation={[0.2, 0.3, 0]}>
          <Laptop />
          {/* Floating icons */}
          {iconsData.map((icon, i) => (
            <group key={i} position={icon.position}>
              <FloatingIcon
                icon={icon.icon}
                color={icon.color}
                position={[0, 0, 0]}
                scale={icon.scale}
              />
            </group>
          ))}
        </group>
      </Suspense>
    </Canvas>
  </div>
);

export default Main3DLaptop;
