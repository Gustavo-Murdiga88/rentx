import React from "react";
import { StatusBar } from "react-native";

import { Container, Header, HeaderContainer, AmountCars } from "./styles";

import Logo from '../../assets/logo.svg'
import { RFValue } from "react-native-responsive-fontsize";
import { Cart } from "../../components/Car";

export function Home() {

  const CartOne = {
    brand: 'audi',
    model: 'RS 5 Coupé',
    rent:{
        price: 120,
        period: '',
    },
    carImage: 'https://w7.pngwing.com/pngs/833/338/png-transparent-audi-rs5-car-audi-q5-audi-s5-audi-convertible-car-performance-car.png',
  }

  return (
    <Container>
      <StatusBar translucent barStyle='light-content' backgroundColor='transparent'/>
      <Header>
        <HeaderContainer>
        <Logo width={RFValue(108)} height={RFValue(12)} />
        <AmountCars>
          Total de 12 carros  
        </AmountCars> 
        </HeaderContainer>
      </Header>
      <Cart data={CartOne}  />
      <Cart data={CartOne}  />

    </Container>
  );
}
