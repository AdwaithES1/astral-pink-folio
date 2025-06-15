
import React, { useRef, useImperativeHandle, forwardRef } from "react";
import NeonLines from "./NeonLines";
import Hologram from "./Hologram";
import FlickerMiniHolo from "./FlickerMiniHolo";

/**
 * Ref forwarding: exposes [neonLinesRef, hologramRef] as array to parent.
 */
export const LaptopNeonPanels = forwardRef<[any, any], {}>(
  function LaptopNeonPanels(props, ref) {
    const neonLinesRef = useRef<any>(null);
    const hologramRef = useRef<any>(null);

    useImperativeHandle(ref, () => [neonLinesRef.current, hologramRef.current] as [any, any]);

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
