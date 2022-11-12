import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { StatusBar, BackHandler } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import { api } from "../../services/api";

import {
  Container,
  Header,
  HeaderContainer,
  AmountCars,
  CartList,
  MyCarsButton,
} from "./styles";

import { Loading } from "../../components/Loading/newLoading";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Cart } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

export type CarsProps = {
  id: string;
  brand: string;
  name: string;
  about: string;
  rent: {
    period: string;
    price: number;
  };
  fuel_type: string;
  thumbnail: string;
  accessories: {
    type: string;
    name: string;
  }[];
  photos: string[];
};

export function Home() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [loading, setIsLoading] = useState(true);
  const [cars, setCars] = useState<CarsProps[]>([]);

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const Event = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      positionX.value = event.translationX;
      positionY.value = event.translationY;
    },
    onActive: (event, ctx) => {
      positionX.value = event.translationX;
      positionY.value = event.translationY;
    },
    onEnd: (event, ctx) => {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  const styles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: positionX.value,
        },
        {
          translateY: positionY.value,
        },
      ],
    };
  });

  function handleRental(car: CarsProps) {
    navigation.navigate("CarDetails" as never, { car } as never);
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get<void, { data: CarsProps[] }>("cars");
        setCars(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCars();
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

  return (
    <Container>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContainer>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && (<AmountCars>{`Total de ${cars.length} carros`}</AmountCars>)}
        </HeaderContainer>
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <CartList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Cart data={item} onPress={() => handleRental(item)} />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    {!loading && (
      <PanGestureHandler onGestureEvent={Event}>
        <Animated.View style={[styles]}>
          <MyCarsButton onPress={() => navigation.navigate("MyCars" as never)}>
            <Ionicons
              name="car-sport"
              size={30}
              color={theme.colors.background_primary}
            />
          </MyCarsButton>
        </Animated.View>
      </PanGestureHandler>
      )}
    </Container>
  );
}
