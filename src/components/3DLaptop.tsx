import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import LaptopWallpaper from "./LaptopWallpaper";

// Major replacement: serious sci-fi style

// Sci-fi laptop: slim, metallic, sharp bevels, glowing ports, etc.
function SciFiLaptop() {
  return (
    <group>
      {/* Metallic base with angular bevels */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[2.05, 0.085, 1.23]} />
        <meshStandardMaterial
          attach="material"
          args={[{ color: "#18121e", roughness: 0.11, metalness: 0.96, envMapIntensity: 1.3 }]}
        />
      </mesh>
      {/* Thin glowing base rim */}
      <mesh position={[0, -0.256, 0]}>
        <boxGeometry args={[2.07, 0.02, 1.24]} />
        <meshStandardMaterial
          attach="material"
          args={[{ color: "#ff3796", metalness: 0.89, roughness: 0.1, emissive: "#ff3796", emissiveIntensity: 0.19, transparent: true, opacity: 0.16 }]}
        />
      </mesh>
      {/* Hinge (glowing center) */}
      <mesh position={[0, -0.19, -0.59]}>
        <cylinderGeometry args={[0.055, 0.055, 2, 38]} />
        <meshStandardMaterial
          attach="material"
          args={[{ color: "#281a3a", metalness: 0.8, roughness: 0.18, emissive: "#ff3796", emissiveIntensity: 0.13 }]}
        />
      </mesh>
      {/* Screen casing (dark metallic, big border) */}
      <mesh position={[0, 0.7, -0.44]} rotation={[-0.23, 0, 0]}>
        <boxGeometry args={[1.95, 1.12, 0.11]} />
        <meshStandardMaterial
          attach="material"
          args={[{ color: "#12101A", roughness: 0.09, metalness: 0.8, envMapIntensity: 1.5 }]}
        />
      </mesh>
      {/* Glowing bevel border for screen */}
      <mesh position={[0, 0.695, -0.398]} rotation={[-0.23, 0, 0]}>
        <boxGeometry args={[2.0, 1.16, 0.01]} />
        <meshStandardMaterial
          attach="material"
          args={[{ color: "#ff3796", metalness: 0.75, roughness: 0.06, transparent: true, opacity: 0.065, emissive: "#ff3796", emissiveIntensity: 0.15 }]}
        />
      </mesh>
      {/* Screen */}
      <group position={[0, 0.705, -0.494]} rotation={[-0.23, 0, 0]}>
        <LaptopWallpaper />
      </group>
      {/* Glow behind screen */}
      <mesh position={[0, 0.80, -0.56]}>
        <planeGeometry args={[2.2, 1.18]} />
        <meshBasicMaterial
          attach="material"
          args={[{ color: "#ff3796", transparent: true, opacity: 0.13 }]}
        />
      </mesh>
      {/* Gradient reflection on base */}
      <mesh position={[0, -0.20, 0]}>
        <planeGeometry args={[1.8, 1.1]} />
        <meshBasicMaterial
          attach="material"
          args={[{ color: "#ff90e8", transparent: true, opacity: 0.11 }]}
        />
      </mesh>
      {/* Side glowing port dots */}
      {[-0.98, 0.98].map((x, i) => (
        <mesh position={[x, -0.31, 0.49]} key={i}>
          <cylinderGeometry args={[0.018, 0.018, 0.011, 20]} />
          <meshStandardMaterial
            attach="material"
            args={[{ color: "#ff3796", metalness: 1, roughness: 0.05, emissive: "#ff3796", emissiveIntensity: 0.7 }]}
          />
        </mesh>
      ))}
    </group>
  );
}

// Floating orbs: sci-fi gradients, hover around
const FloatingIcon = ({
  icon,
  color,
  position = [0, 0, 0],
  speed = 0.4,
  scale = 0.22,
}: {
  icon: "file" | "mail" | "about" | "home";
  color: string;
  position?: [number, number, number];
  speed?: number;
  scale?: number;
}) => (
  <mesh position={position}>
    <sphereGeometry args={[scale || 0.22, 38, 38]} />
    <meshStandardMaterial
      attach="material"
      args={[{ color, metalness: 0.9, roughness: 0.21, emissive: color, emissiveIntensity: 0.66 }]}
    />
  </mesh>
);

// Floating icons: improved sci-fi placement
const iconsData: {
  icon: "home" | "about" | "file" | "mail";
  color: string;
  position: [number, number, number];
  scale: number;
}[] = [
  { icon: "home", color: "#ff3796", position: [1.19, 0.89, 0.13], scale: 0.13 },
  { icon: "about", color: "#1e3a8a", position: [-1.16, 0.85, 0.20], scale: 0.13 },
  { icon: "file", color: "#ff90e8", position: [0.95, 1.15, -0.25], scale: 0.11 },
  { icon: "mail", color: "#ff90e8", position: [0.44, 0.41, 0.7], scale: 0.13 },
  { icon: "home", color: "#ff3796", position: [-0.95, 1.27, -0.36], scale: 0.12 },
];

const Main3DLaptop = () => (
  <div className="w-full h-[420px] md:h-[540px] select-none pt-7 md:pt-10 flex items-center justify-center">
    <Canvas
      camera={{ position: [0, 1.24, 4.14], fov: 32, near: 0.1, far: 30 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.89} />
      <pointLight position={[-5, 8, 6]} color="#ff3796" intensity={0.18} />
      <pointLight position={[5, 7, 8]} color="#1e3a8a" intensity={0.16} />
      <directionalLight position={[0, 5, 4]} intensity={0.17} />
      <Suspense fallback={null}>
        <group rotation={[0.185, 0.29, 0.01]}>
          <SciFiLaptop />
          {/* Floating icons */}
          {iconsData.map((icon, i) => (
            <group key={i} position={icon.position}>
              <FloatingIcon {...icon} />
            </group>
          ))}
        </group>
      </Suspense>
    </Canvas>
  </div>
);

export default Main3DLaptop;
