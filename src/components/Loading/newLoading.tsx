import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import styled from "styled-components/native";

import Lottie from "../../assets/car-animation.json";

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export function Loading() {
  return (
    <Container>
      <LottieView
        source={Lottie}
        autoPlay
        style={{
          height: 200,
          width: 200,
        }}
        resizeMode="cover"
      />
    </Container>
  );
}
