import React from "react";

import {
  Container,
  AsideContent,
  Brand,
  BrandContent,
  Model,
  RentContainer,
  Description,
  PriceRentContainer,
  PriceRent,
  Car,
} from "./styles";

import TypeFuel from "../../assets/gasoline.svg";

interface CartProps {
    brand: string;
    model: string;
    rent:{
        price: number;
        period: string;
    }
    carImage: string;
}

interface Cart {
  data: CartProps;
}

export function Cart({data} : Cart) {
  return (
    <Container>
      <AsideContent>
        <BrandContent>
          <Brand>{data.brand}</Brand>
          <Model>{data.model}</Model>
        </BrandContent>
        <RentContainer>
          <Description>Ao dia</Description>
          <PriceRentContainer>
            <PriceRent>R$ {data.rent.price}</PriceRent>
            <TypeFuel />
          </PriceRentContainer>
        </RentContainer>
      </AsideContent>
      <Car
        source={{
          uri: data.carImage,
        }}
        resizeMode='cover'
      />
    </Container>
  );
}
