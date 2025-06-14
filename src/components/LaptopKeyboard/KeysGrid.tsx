
import React from "react";
import KeyboardKey from "./KeyboardKey";

const KeysGrid = () => (
  <>
    {[...Array(4)].map((_, row) =>
      [...Array(14)].map((__, col) => (
        <KeyboardKey key={row + "-" + col} row={row} col={col} />
      ))
    )}
  </>
);

export default KeysGrid;
