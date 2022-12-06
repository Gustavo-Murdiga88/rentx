import react, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

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
import { Bubble } from "../../components/Bubble";
import { cars as CarsModel } from "../../database/models/cars";
import { api } from "../../services/api";
import { useNetInfo } from "@react-native-community/netinfo";

type Car = {
  car: CarsModel;
};

type ChangeCard = {
  viewableItems: ViewToken[];
  changed: ViewToken[];
};

export function CarDetails({ images }: CarDetails) {
  const netInfo = useNetInfo();
  const route = useRoute();
  const isConnected = netInfo.isConnected === true;
  const [carsUpdated, setCarsUpdated] = useState<CarsProps>({} as CarsProps);

  const { car } = route.params as Car;

  const heightFlatList = useSharedValue(0);

  const [imageIndex, setImageIndex] = useState<number>(0);
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
    const { index } = info.viewableItems[0];
    if (typeof index === "number") setImageIndex(index);
  });

  const scrollHandle = useAnimatedScrollHandler({
    onScroll: (event) => (heightFlatList.value = event.contentOffset.y),
  });

  const style = useAnimatedStyle(() => {
    const height = 250 - heightFlatList.value;

    return {
      height: height > 0 ? height : 0,
      opacity: interpolate(
        heightFlatList.value,
        [50, 100, 200],
        [1, 0.7, 0],
        Extrapolate.CLAMP
      ),
    };
  });

  useEffect(() => {
    async function getCarUpdated() {
      const response = await api.get<CarsProps>(`cars/${car.id}`);
      setCarsUpdated(response.data);
    }

    if (netInfo.isConnected === true) {
      getCarUpdated();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <HeaderSlider>
        <BackButtonComponent type="dark" onPress={() => navigation.goBack()} />
        <ActiveIndexes>
          {(isConnected && carsUpdated?.photos ? carsUpdated.photos : [car.thumbnail]).map((_, index) => (
            <Bubble key={index} active={imageIndex === index} />
          ))}
        </ActiveIndexes>
      </HeaderSlider>

      <Animated.ScrollView style={[style]} scrollEventThrottle={16}>
        <FlatList
          data={ isConnected && carsUpdated?.photos ? carsUpdated.photos : [car.thumbnail as any]}
          initialScrollIndex={0}
          keyExtractor={(item) => isConnected && carsUpdated?.photos ? item?.id : item}
          renderItem={({ item }) => (
            <CarSlide source={{ uri: isConnected ? item.photo : item }} resizeMode="contain" />
          )}
          horizontal
          onViewableItemsChanged={cards.current}
          showsHorizontalScrollIndicator={false}
        />
      </Animated.ScrollView>

      <Content showsVerticalScrollIndicator={false} onScroll={scrollHandle}>
        <Rent>
          <Car>
            <Brand>{car.brand}</Brand>
            <Model>{car.name}</Model>
          </Car>
          <Price>
            <Period>{carsUpdated?.period || "Ao dia"}</Period>
            <Value>R$ {netInfo.isConnected === true ? carsUpdated.price : '...'}</Value>
          </Price>
        </Rent>
        {isConnected && carsUpdated?.accessories && (
          <FeaturesOfCar>
            {carsUpdated.accessories.map((accessories) => {
              return (
                <CardFeatureOfCar
                  key={accessories.name}
                  subTitle={accessories.name}
                  Icon={getAccessoryIcon(accessories.type)}
                />
              );
            })}
          </FeaturesOfCar>
        )}
        <Details>{car.about}</Details>
        <Details>{car.about}</Details>
      </Content>
      <Footer>
        <Button
          title={netInfo.isConnected === true ? "Escolher o período do aluguel": "Conecte-se a rede novamente"}
          onPress={handleRentalPeriod}
          enabled={netInfo.isConnected === true ? true: false}
        />
      </Footer>
    </Container>
  );
}
