
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import LaptopBase from "./LaptopBase";
import LaptopKeyboard from "./LaptopKeyboard";
import LaptopScreen from "./LaptopScreen";
import { LaptopNeonPanels } from "./LaptopNeonPanels";
import LaptopLights from "./LaptopLights";

function FuturisticLaptop() {
  // Animate device "power waves" and hologram
  const neonLinesRef = useRef<THREE.Mesh>(null!);
  const powerHoloRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    // Animate hologram panel
    if (powerHoloRef.current) {
      const t = clock.getElapsedTime();
      powerHoloRef.current.position.y = 0.85 + Math.sin(t * 2.4) * 0.09;
      (
        powerHoloRef.current.material as THREE.MeshStandardMaterial
      ).opacity = 0.25 + 0.12 * Math.sin(t * 2.2 + 0.7);
    }
    // Subtle shimmer for neon lines
    if (neonLinesRef.current) {
      const t = clock.getElapsedTime();
      (
        neonLinesRef.current.material as THREE.MeshBasicMaterial
      ).opacity = 0.32 + 0.13 * Math.sin(t * 3.1);
    }
  });

  return (
    <group>
      <LaptopBase />
      <LaptopKeyboard />
      <LaptopScreen />
      <LaptopNeonPanels ref={(refArray: any) => {
        // Expect refArray to be an array of refs for neonLines and powerHolo
        if (refArray) {
          neonLinesRef.current = refArray[0];
          powerHoloRef.current = refArray[1];
        }
      }} />
      <LaptopLights />
    </group>
  );
}

export default FuturisticLaptop;
