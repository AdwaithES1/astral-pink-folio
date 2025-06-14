
import React, { useRef, useImperativeHandle, forwardRef } from "react";
import NeonLines from "./NeonLines";
import Hologram from "./Hologram";
import FlickerMiniHolo from "./FlickerMiniHolo";
import * as THREE from "three";

/**
 * Ref forwarding: exposes [neonLinesRef, hologramRef] as array to parent.
 */
export const LaptopNeonPanels = forwardRef<[THREE.Mesh, THREE.Mesh], {}>(
  function LaptopNeonPanels(props, ref) {
    const neonLinesRef = useRef<THREE.Mesh>(null!);
    const hologramRef = useRef<THREE.Mesh>(null!);

    useImperativeHandle(ref, () => [neonLinesRef.current, hologramRef.current]);

    return (
      <group>
        <NeonLines ref={neonLinesRef} />
        <Hologram ref={hologramRef} />
        <FlickerMiniHolo x={-0.9} y={0.91} z={-0.46} rot={0.6} />
        <FlickerMiniHolo x={0.9} y={0.92} z={-0.44} rot={-0.6} />
      </group>
    );
  }
);

export default LaptopNeonPanels;
