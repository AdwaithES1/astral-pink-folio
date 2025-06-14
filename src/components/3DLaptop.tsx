
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import FuturisticLaptop from "./FuturisticLaptop";

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
