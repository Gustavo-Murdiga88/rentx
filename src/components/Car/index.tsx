import React from "react";
import { RectButtonProps } from 'react-native-gesture-handler'

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

import {CarsProps} from '../../screens/Home/index'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

interface CartProps extends CarsProps {}

interface Cart extends RectButtonProps {
  data: CartProps;
}

export function Cart({data, ...rest} : Cart) {
  const Motor = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <AsideContent>
        <BrandContent>
          <Brand>{data.brand}</Brand>
          <Model>{data.name}</Model>
        </BrandContent>
        <RentContainer>
          <Description>Ao dia</Description>
          <PriceRentContainer>
            <PriceRent>R$ {data.rent.price || 0}</PriceRent>
            <Motor />
          </PriceRentContainer>
        </RentContainer>
      </AsideContent>
      <Car
        source={{
          uri: data?.photos[0],
        }}
        resizeMode='cover'
      />
    </Container>
  );
}
