import react, { useRef, useState }from "react";
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
import { FlatList, ViewToken } from "react-native";

type Car = {
  car: CarsProps;
};

type ChangeCard ={
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function CarDetails({ images }: CarDetails) {
  const route = useRoute();
  const { car } = route.params as Car;

  const [imageIndex, setImageIndex] = useState<number>(0)
  const navigation = useNavigation();
  function handleRentalPeriod() {
    navigation.navigate(
      "Scheduling" as never,
      {
        id: car.id,
      } as never
    );
  }

  const cards = useRef((info: ChangeCard) => {
    const {index} = info.viewableItems[0];
    if(typeof index === 'number') setImageIndex(index)
  })

  return (
    <Container>
      <HeaderSlider>
        <BackButtonComponent type="dark" onPress={() => navigation.goBack()} />
        <ActiveIndexes>
          {car.photos.map((_, index) => (
            <ActiveIndex key={index} active={imageIndex === index} />
          ))}
        </ActiveIndexes>
      </HeaderSlider>

      <FlatList
        data={car.photos}
        initialScrollIndex={0}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <CarSlide source={{ uri: item }} resizeMode="contain" />
        )}
        horizontal
        onViewableItemsChanged={cards.current}
        showsHorizontalScrollIndicator={false}
      />

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
            return (
              <CardFeatureOfCar
                key={accessories.name}
                subTitle={accessories.name}
                Icon={getAccessoryIcon(accessories.type)}
              />
            );
          })}
        </FeaturesOfCar>
        <Details>{car.about}</Details>
      </Content>
      <Footer>
        <Button
          title="Escolher o período do aluguel"
          onPress={handleRentalPeriod}
        />
      </Footer>
    </Container>
  );
}
