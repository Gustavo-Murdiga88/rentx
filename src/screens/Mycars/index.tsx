import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import { BackButtonComponent } from "../../components/BackButton";
import { CardCarWithPeriod } from "../../components/CardCarWithPeriod";
import { Loading } from "../../components/Loading/newLoading";
import { api } from "../../services/api";
import { CarsProps } from "../Home";
import {
  Container,
  Header,
  Title,
  SubTitle,
  SchedulingDone,
  SchedulingContainer,
  SchedulingCount,
  InfoContainer,
  CarsList,
  CarsListContainer,
} from "./styles";
import { cars as ModelCar } from "../../database/models/cars";

export type SchedulesProps = {
  car: cars;
  start_date: string;
  end_date: string;
  id: string;
};

export function MyCars() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [schedules, setSchedules] = useState<SchedulesProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getSchedule() {
      try {
        const response = await api.get("/rentals");
        if (response.data) {
          setSchedules(response.data);
          setIsLoading(false);
        }
      } catch (e) {
        console.log("erros cars", e);
        setIsLoading(false);
      }
    }

    getSchedule();
  }, [isFocused]);

  return (
    <Container>
      <Header>
        <BackButtonComponent type="light" onPress={() => navigation.goBack()} />
        <Title>Seus agendamentos, estão aqui.</Title>
        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>

      <SchedulingContainer>
        <InfoContainer>
          <SchedulingDone>Agendamentos feitos</SchedulingDone>
          <SchedulingCount> {schedules.length} </SchedulingCount>
        </InfoContainer>
      </SchedulingContainer>
      <CarsListContainer>
        {isLoading ? (
          <Loading />
        ) : (
          <CarsList
            data={schedules}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardCarWithPeriod
                data={item.car}
                endDate={item.end_date}
                startDate={item.start_date}
              />
            )}
          ></CarsList>
        )}
      </CarsListContainer>
    </Container>
  );
}
