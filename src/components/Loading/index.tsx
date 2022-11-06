import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

type LoadingProps = {
  size?: "large" | "small";
  color?: string;
}

export function Loading({color, size='large'}: LoadingProps) {
  const theme = useTheme();
  return (
    <ActivityIndicator
      size={size}
      color={color ? color : theme.colors.main}
      style={{ flex: 1 }}
    />
  );
}
