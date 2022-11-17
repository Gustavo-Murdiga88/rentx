import react, { useEffect, useRef, useState } from "react";
import { ViewToken } from "react-native";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";

import { CarsProps } from "../Home";
import { BackButtonComponent } from "../../components/BackButton";
import { CardFeatureOfCar } from "../../components/FeaturesOfCarCards";
import {
  Container,
  HeaderSlider,
  ActiveIndexes,
  CarSlide,
  Content,
  Car,
  Brand,
  Model,
  Price,
  Period,
  Value,
  Rent,
  FeaturesOfCar,
  Footer,
  Label,
  RentDetails,
  CalendarContent,
  Icon,
  RentDateContent,
  Date,
  RentTotal,
  RentTotalDetails,
  TotalDescription,
  Total,
} from "./styles";

interface CarDetails {
  images?: string[];
}

import Acceleration from "../../assets/acceleration.svg";
import force from "../../assets/force.svg";
import gasoline from "../../assets/gasoline.svg";
import exchange from "../../assets/exchange.svg";
import people from "../../assets/people.svg";
import speed from "../../assets/speed.svg";
import { Button } from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { api } from "../../services/api";
import { Loading } from "../../components/Loading/newLoading";
import { Bubble } from "../../components/Bubble";
import { FlatList } from "react-native-gesture-handler";

type SchedulingDetailsInfo = {
  rentalInfo: {
    start: number;
    end: number;
    totalDays: number;
    startFormatted: string;
    endFormatted: string;
  };
  id: string;
};

type ChangeImage = {
  viewableItems: ViewToken[];
  changed: ViewToken[];
};

export function SchedulingDetails({ images }: CarDetails) {
  const theme = useTheme();
  const route = useRoute();
  const { rentalInfo, id } = route.params as SchedulingDetailsInfo;
  const navigation = useNavigation();
  const [index, setIndex] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [car, setCar] = useState({} as CarsProps);

  const totalRent = car.rent?.price * rentalInfo.totalDays;

  const carIndexChange = useRef((info: ChangeImage) => {
    const index = info.viewableItems[0].index;
    if (typeof index === "number") {
      setIndex(index);
    }
  });

  useEffect(() => {
    async function getCar() {
      const response = await api.get<void, { data: Array<CarsProps> }>(
        "/cars",
        {
          params: {
            id,
          },
        }
      );

      if (response.data.length > 0) {
        setCar(response.data[0]);
        setIsLoading(false);
      } else {
        navigation.goBack();
      }
    }
    getCar();
  }, []);

  async function AcceptedSchedunling() {
    setIsSubmit(true);
    const startDate = rentalInfo.startFormatted;
    const endDate = rentalInfo.endFormatted;
    api
      .post("/schedules_byuser", {
        user_id: 1,
        car,
        startDate,
        endDate,
      })
      .then(() => {
        navigation.navigate(
          "confirmation" as never,
          {
            message: `Agora você só precisa ir\naté a concessionária da RENTX`,
            nextScreen: "Home",
            title: "Carro alugado!",
          } as never
        );
      })
      .catch(() => {
        setIsSubmit(false);
      });
  }

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <HeaderSlider>
            <BackButtonComponent
              type="dark"
              onPress={() => navigation.goBack()}
            />
            <ActiveIndexes>
              {car.photos.map((photo, indexPhoto) => (
                <Bubble key={photo} active={indexPhoto === index} />
              ))}
            </ActiveIndexes>
          </HeaderSlider>

          <FlatList
            data={car.photos}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <CarSlide
                source={{ uri: car.photos?.[0] }}
                resizeMode="contain"
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={carIndexChange.current}
          />

          <Content showsVerticalScrollIndicator={false}>
            <Rent>
              <Car>
                <Brand>{car.brand}</Brand>
                <Model>{car.name}</Model>
              </Car>
              <Price>
                <Period>Ao dia</Period>
                <Value>{`R$ ${car.rent?.price || 0}`}</Value>
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

            <RentDetails>
              <CalendarContent>
                <Icon
                  name="calendar"
                  size={24}
                  color={theme.colors.background_primary}
                />
              </CalendarContent>
              <RentDateContent>
                <Label>De</Label>
                <Date>{rentalInfo.startFormatted}</Date>
              </RentDateContent>
              <Icon
                name="chevron-right"
                size={RFValue(15)}
                color={theme.colors.text}
              />
              <RentDateContent>
                <Label>Até</Label>
                <Date>{rentalInfo.endFormatted}</Date>
              </RentDateContent>
            </RentDetails>

            <RentTotal>
              <Label>Total</Label>
              <RentTotalDetails>
                <TotalDescription>
                  {`R$ ${car.rent?.price || 0} x ${rentalInfo.totalDays}`}
                </TotalDescription>
                <Total>{`R$ ${totalRent}`}</Total>
              </RentTotalDetails>
            </RentTotal>
          </Content>
          <Footer>
            <Button
              title="Alugar agora"
              onPress={AcceptedSchedunling}
              color={theme.colors.success}
              isLoading={isSubmit}
              enabled={!isSubmit}
            />
          </Footer>
        </>
      )}
    </Container>
  );
}
