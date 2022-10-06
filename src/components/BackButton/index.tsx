import React from "react";
import {BorderlessButtonProperties} from 'react-native-gesture-handler'
import { Container, BackIcon } from "./styles";

interface BackButtonProps extends BorderlessButtonProperties {
  type: "light" | "dark";
}

export function BackButtonComponent({ type, ...rest }: BackButtonProps) {
  return (
    <Container {...rest}>
      <BackIcon name="chevron-left" size={26} type={type} />
    </Container>
  );
}
