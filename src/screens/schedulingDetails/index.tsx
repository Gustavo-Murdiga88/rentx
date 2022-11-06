import react, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";

import { CarsProps } from "../Home";
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
  TotalDesctiption,
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
import { Loading } from "../../components/Loading";

const carImage =
  "https://w7.pngwing.com/pngs/833/338/png-transparent-audi-rs5-car-audi-q5-audi-s5-audi-convertible-car-performance-car.png";

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

export function SchedulingDetails({ images }: CarDetails) {
  const theme = useTheme();
  const route = useRoute();
  const { rentalInfo, id } = route.params as SchedulingDetailsInfo;
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [car, setCar] = useState({} as CarsProps);

  const totalRent = car.rent?.price * rentalInfo.totalDays;

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
        navigation.navigate("SchedulingDone" as never);
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
              <ActiveIndex active={true} />
              <ActiveIndex active={false} />
              <ActiveIndex active={false} />
              <ActiveIndex active={false} />
            </ActiveIndexes>
          </HeaderSlider>
          <CarSlide
            source={{ uri: car.photos?.[0] || carImage }}
            resizeMode="contain"
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
                <TotalDesctiption>
                  {`R$ ${car.rent?.price || 0} x ${rentalInfo.totalDays}`}
                </TotalDesctiption>
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
