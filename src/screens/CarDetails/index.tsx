import react from "react";
import { BackButtonComponent } from "../../components/BackButton";
import { CardFeatureOfCar } from "../../components/FeaturesOfCarCards";
import {
  Container,
  HeaderSlider,
  ActiveIndexes,
  ActiveIndex,
  CarSlide,
  Content,
  Car,
  Brand,
  Model,
  Price,
  Period,
  Value,
  Details,
  Rent,
  FeaturesOfCar,
} from "./styles";

interface CarDetails {
  images: string[];
}

import Acceleration from "../../assets/acceleration.svg";
import force from "../../assets/force.svg";
import gasoline from "../../assets/gasoline.svg";
import exchange from "../../assets/exchange.svg";
import people from "../../assets/people.svg";
import speed from "../../assets/speed.svg";

export function CarDetails({ images }: CarDetails) {
  return (
    <Container>
      <HeaderSlider>
        <BackButtonComponent type="dark" onPress={() => console.log("oi")} />
        <ActiveIndexes>
          <ActiveIndex active={true} />
          <ActiveIndex active={false} />
          <ActiveIndex active={false} />
          <ActiveIndex active={false} />
        </ActiveIndexes>
      </HeaderSlider>
      <CarSlide source={{ uri: images[0] }} resizeMode="contain" />

     <Content showsVerticalScrollIndicator={false}>
        <Rent>
          <Car>
            <Brand>Lamborghini</Brand>
            <Model>Huracan</Model>
          </Car>
          <Price>
            <Period>Ao dia</Period>
            <Value>R$ 580</Value>
          </Price>
        </Rent>
        <FeaturesOfCar>
          <CardFeatureOfCar subTitle="380km/h" Icon={speed} />
          <CardFeatureOfCar subTitle="3.2s" Icon={Acceleration} />
          <CardFeatureOfCar subTitle="800 HP" Icon={force} />
          <CardFeatureOfCar subTitle="Gasolina" Icon={gasoline} />
          <CardFeatureOfCar subTitle="Auto" Icon={exchange} />
          <CardFeatureOfCar subTitle="2 pessoas" Icon={people} />

        </FeaturesOfCar>
        <Details>
          Este é automóvel desportivo. Surgiu do lendário touro de lide
          indultado na praça Real Maestranza de Sevilla. É um belíssimo carro
          para quem gosta de acelerar.
        </Details>       
      </Content>
    </Container>
  );
}
