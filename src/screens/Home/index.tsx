import React, { useEffect, useState } from "react";
import { StatusBar, BackHandler } from "react-native";
// import { PanGestureHandler } from "react-native-gesture-handler";
// import { Ionicons } from "@expo/vector-icons";
import { synchronize } from "@nozbe/watermelondb/sync";
import { cars as Car } from "../../database/models/cars";
import { database } from "../../database";
import NetInfo from "@react-native-community/netinfo";

import { api } from "../../services/api";

import {
  Container,
  Header,
  HeaderContainer,
  AmountCars,
  CartList,
  // MyCarsButton,
} from "./styles";

import { Loading } from "../../components/Loading/newLoading";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Cart } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   useAnimatedGestureHandler,
//   withSpring,
// } from "react-native-reanimated";

export type CarsProps = {
  id: string;
  brand: string;
  name: string;
  about: string;
  price: number;
  period: string;
  fuel_type: string;
  thumbnail: string;
  accessories: {
    type: string;
    name: string;
  }[];
  photos: { photo: string; id: string }[];
};

interface ResponseData {
  created: Car[];
  updated: Car[];
  deleted: [];
}

interface ResponseSync {
  latestVersion: number;
  changes: ResponseData;
}

export function Home() {
  // const theme = useTheme();
  const navigation = useNavigation();
  const [loading, setIsLoading] = useState(true);
  const [cars, setCars] = useState<Car[]>([]);

  const netInfo = NetInfo.useNetInfo();

  // const positionX = useSharedValue(0);
  // const positionY = useSharedValue(0);

  // const Event = useAnimatedGestureHandler({
  //   onStart: (event, ctx) => {
  //     positionX.value = event.translationX;
  //     positionY.value = event.translationY;
  //   },
  //   onActive: (event, ctx) => {
  //     positionX.value = event.translationX;
  //     positionY.value = event.translationY;
  //   },
  //   onEnd: (event, ctx) => {
  //     positionX.value = withSpring(0);
  //     positionY.value = withSpring(0);
  //   },
  // });

  // const styles = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateX: positionX.value,
  //       },
  //       {
  //         translateY: positionY.value,
  //       },
  //     ],
  //   };
  // });

  async function synchronization() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get<ResponseSync>(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt}`
        );

        const { changes, latestVersion: timestamp } = response.data as any;
        return { changes, timestamp };
      },
      pushChanges: async ({ changes }) => {
        const users = changes.users;
        if (Boolean(users)) {
          api.post(`users/sync`, users);
        }
      },
    });
  }

  function handleRental(value: Car) {
    const { id, id_car, price, name, about, fuel_type, thumbnail } = value;
    const car = {id, id_car, price, name, about, fuel_type, thumbnail};
    navigation.navigate(
      "CarDetails" as never,
      { car } as never
    );
  }

  useEffect(() => {
    if (netInfo.isConnected === true) {
      synchronization();
    }
  }, [netInfo.isConnected]);

  useEffect(() => {
    let isMounted = true;
    async function fetchCars() {
      try {
        const collection = database.get<Car>("cars");
        const cars = await collection.query().fetch();
        if (isMounted) setCars(cars);
      } catch (err) {
        console.log(err, "error cars");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCars();
    BackHandler.addEventListener("hardwareBackPress", () => {
      return null;
    });

    return () => {
      isMounted = false;
    };
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
          {!loading && (
            <AmountCars>{`Total de ${cars.length} carros`}</AmountCars>
          )}
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
      {/* {!loading && (
        <PanGestureHandler onGestureEvent={Event}>
          <Animated.View style={[styles]}>
            <MyCarsButton
              onPress={() => navigation.navigate("MyCars" as never)}
            >
              <Ionicons
                name="car-sport"
                size={30}
                color={theme.colors.background_primary}
              />
            </MyCarsButton>
          </Animated.View>
        </PanGestureHandler>
      )} */}
    </Container>
  );
}
