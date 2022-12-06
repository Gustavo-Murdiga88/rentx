import React from "react";
import { RectButtonProps } from 'react-native-gesture-handler'

import { cars } from '../../database/models/cars'

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
import { useNetInfo } from "@react-native-community/netinfo";

interface CartProps extends CarsProps {}

interface Cart extends RectButtonProps {
  data: cars;
}

export function Cart({data, ...rest} : Cart) {
  const isConnected = useNetInfo().isConnected === true;
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
            <PriceRent>R$ {isConnected ? data.price : '...'}</PriceRent>
            <Motor />
          </PriceRentContainer>
        </RentContainer>
      </AsideContent>
      <Car
        source={{
          uri: data?.thumbnail,
        }}
        resizeMode='cover'
      />
    </Container>
  );
}
