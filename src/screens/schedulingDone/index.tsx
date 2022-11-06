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
import { useNavigation } from "@react-navigation/native";

export function SchedulingDone() {
  const theme = useTheme();
  const navigation = useNavigation();
  function handleHome() {
    navigation.navigate('Home' as never);
  }
  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" style="light"/>
      <Header>
        <XContainer>
          <X />
        </XContainer>
        <DoneContainer>
          <Done />
        </DoneContainer>
      </Header>

      <Content>
        <Title>Carro Alugado!</Title>
        <Description>
          Agora você só precisa {'\n'} 
          ir até a concessionária da RENTX {'\n'} 
          pegar o seu automóvel
        </Description>
      <Footer>
          <Button title="Ok" color={theme.colors.shape_dark} onPress={handleHome}/>
      </Footer>
      </Content>
    </Container>
  );
}
