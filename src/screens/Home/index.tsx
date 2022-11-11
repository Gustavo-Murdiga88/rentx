import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { StatusBar, BackHandler } from "react-native";
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

import { Loading } from "../../components/Loading";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Cart } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";

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
          <AmountCars>{`Total de ${cars.length} carros`}</AmountCars>
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
        />
      )}

      <MyCarsButton onPress={() => navigation.navigate("MyCars" as never)}>
        <Ionicons
          name="car-sport"
          size={30}
          color={theme.colors.background_primary}
        />
      </MyCarsButton>
    </Container>
  );
}
