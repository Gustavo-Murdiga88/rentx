import react from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

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
  Footer,
} from "./styles";

interface CarDetails {
  images?: string[];
}

import { Button } from "../../components/Button";
import { CarsProps } from "../Home";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

type Car = {
  car: CarsProps; 
}

export function CarDetails({ images }: CarDetails) {

  const route = useRoute();
  const { car } = route.params as Car
  const navigation = useNavigation();
  function handleRentalPeriod(){
    navigation.navigate('Scheduling' as never, { 
      id: car.id,
    } as never)
  }

  return (
    <Container>
      <HeaderSlider>
        <BackButtonComponent type="dark" onPress={() => navigation.goBack()} />
        <ActiveIndexes>
          <ActiveIndex active={true} />
          <ActiveIndex active={false} />
          <ActiveIndex active={false} />
          <ActiveIndex active={false} />
        </ActiveIndexes>
      </HeaderSlider>
      <CarSlide source={{ uri: car.photos[0] }} resizeMode="contain" />

     <Content showsVerticalScrollIndicator={false}>
        <Rent>
          <Car>
            <Brand>{car.brand}</Brand>
            <Model>{car.name}</Model>
          </Car>
          <Price>
            <Period>{car.rent.period}</Period>
            <Value>R$ {car.rent.price}</Value>
          </Price>
        </Rent>
        <FeaturesOfCar>
          {car.accessories.map((accessories) => {
           return  <CardFeatureOfCar key={accessories.name} subTitle={accessories.name} Icon={getAccessoryIcon(accessories.type)} />
          })}
        </FeaturesOfCar>
        <Details>{car.about}</Details>       
      </Content>
      <Footer>
        <Button title="Escolher o período do aluguel" onPress={handleRentalPeriod} />
      </Footer>
    </Container>
  );
}
