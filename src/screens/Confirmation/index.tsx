import React from "react";
import {
  Container,
  Header,
  XContainer,
  DoneContainer,
  Content,
  Title,
  Description,
  Footer,
} from "./styles";

import X from "../../assets/logo_background_gray.svg";
import Done from "../../assets/done.svg";
import { Button } from "../../components/Button";
import { useTheme } from "styled-components";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";

type ConfirmationProps = {
  title: string;
  nextScreen: string;
  message: string;
};

export function Confirmation() {
  const theme = useTheme();
  const route = useRoute();

  const { message, nextScreen, title } = route.params as ConfirmationProps;

  const navigation = useNavigation();
  function handleHome() {
    navigation.navigate(nextScreen as never);
  }
  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" style="light" />
      <Header>
        <XContainer>
          <X />
        </XContainer>
        <DoneContainer>
          <Done />
        </DoneContainer>
      </Header>

      <Content>
        <Title>{title}</Title>
        <Description>{message}</Description>
        <Footer>
          <Button
            title="Ok"
            color={theme.colors.shape_dark}
            onPress={handleHome}
          />
        </Footer>
      </Content>
    </Container>
  );
}
