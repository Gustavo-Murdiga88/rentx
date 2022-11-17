import React from "react";
import { ActiveIndex } from "./styles";

type BubbleProps = {
  active: boolean;
};

export function Bubble({ active }: BubbleProps) {
  return <ActiveIndex active={active} />;
}
