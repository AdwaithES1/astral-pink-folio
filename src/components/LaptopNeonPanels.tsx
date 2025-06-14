
import React, { forwardRef, useRef, useImperativeHandle } from "react";
import * as THREE from "three";
import NeonLines from "./LaptopNeonPanels/NeonLines";
import Hologram from "./LaptopNeonPanels/Hologram";
import FlickerMiniHolo from "./LaptopNeonPanels/FlickerMiniHolo";

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
