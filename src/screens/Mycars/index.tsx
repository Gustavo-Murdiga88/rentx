import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
  CarsListContainer
} from "./styles";

export type SchedulesProps = {
  car: CarsProps;
  startDate: string;
  endDate: string;
  id: string;
};

export function MyCars() {
  const navigation = useNavigation();
  const [schedules, setSchedules] = useState<SchedulesProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getSchedule() {
      try{
      const response = await api.get("/schedules_byuser");
      if (response.data) {
        setSchedules(response.data);
        setIsLoading(false); 
      }
    }catch {
      setIsLoading(false);
    }
    }

    getSchedule();
  }, []);
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
        {isLoading ? <Loading /> : (
          <CarsList
            data={schedules}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardCarWithPeriod
                data={item.car}
                endDate={item.endDate}
                startDate={item.startDate}
              />
            )}
          ></CarsList>
        )}
        </CarsListContainer>
    </Container>
  );
}
