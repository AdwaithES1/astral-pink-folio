
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Animated dark wallpaper with a bouncing pink ball
export default function LaptopWallpaper() {
  const ballRef = useRef<THREE.Mesh>(null!);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;
    // Ball bounces smoothly on y
    const y = 0.20 + Math.abs(Math.sin(t * 1.9)) * 0.32;
    // Ball drifts horizontally (sin + cos for variation)
    const x = 0.45 * Math.sin(t * 0.9) + 0.15 * Math.cos(t * 2.8);
    // Ball pulsing for extra futurism
    const s = 0.17 + 0.045 * Math.sin(t * 2.6);
    if (ballRef.current) {
      ballRef.current.position.x = x;
      ballRef.current.position.y = y;
      ballRef.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      {/* Futuristic dark glossy wallpaper */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[1.85, 1.02]} />
        <meshStandardMaterial
          attach="material"
          args={[{ color: "#18121e", roughness: 0.13, metalness: 0.84, emissive: "#110d15", emissiveIntensity: 0.19 }]}
        />
      </mesh>
      {/* Bouncing pink ball */}
      <mesh ref={ballRef} position={[0, 0.25, 0.044]}>
        <sphereGeometry args={[0.17, 48, 48]} />
        <meshStandardMaterial
          attach="material"
          args={[{ color: "#ff3796", emissive: "#ff3796", roughness: 0.17, metalness: 0.74, emissiveIntensity: 0.98 }]}
        />
      </mesh>
      {/* Ball glow/effect */}
      <mesh position={[0, 0.25, 0.04]}>
        <sphereGeometry args={[0.26, 36, 36]} />
        <meshBasicMaterial
          attach="material"
          args={[{ color: "#ff3796", transparent: true, opacity: 0.17 }]}
        />
      </mesh>
    </group>
  );
}
