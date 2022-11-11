import { BackButtonComponent } from "../../components/BackButton";
import { format } from "date-fns";

import { getPlatformDate } from "../../utils/getPlataformDate";

import {
  Container,
  Title,
  DateContainer,
  DateContent,
  Header,
  Label,
  RentalDate,
  Footer,
  CalendarContent,
} from "./styles";

import Arrow from "../../assets/arrow.svg";
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar, DayProps, MarkedDateProps } from "../../components/calendar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { getGenerateInterval } from "../../components/calendar/getDateInterval";

type RentalPeriod = {
  start: number;
  end: number;
  totalDays: number;
  startFormatted: string;
  endFormatted: string;
};

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as {id: string}; 
  function handleSchedulingDetails() {
    navigation.navigate("SchedulingDetails" as never, { 
      rentalInfo: rentalPeriod, 
      id, 
    } as never);
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = getGenerateInterval(start, end);
    setMarkedDates(interval);

    new Date();
    const startPeriod = Object.keys(interval)[0];
    const endPeriod = Object.keys(interval)[Object.keys(interval).length - 1];
    const totalDays = Object.keys(interval).length; 
    setRentalPeriod({
      end: end.timestamp,
      start: start.timestamp,
      endFormatted: format(getPlatformDate(new Date(endPeriod)), "dd/MM/yyyy"),
      startFormatted: format(
        getPlatformDate(new Date(startPeriod)),
        "dd/MM/yyyy"
      ),
      totalDays,
    });
  }
  
  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <Header>
        <BackButtonComponent type="light" onPress={() => navigation.goBack()} />
        <Title>Escolha uma data de início e fim do aluguel</Title>
        <DateContainer>
          <DateContent isEmpty={!!rentalPeriod.start}>
            <Label>De</Label>
            <RentalDate>{rentalPeriod.startFormatted}</RentalDate>
          </DateContent>
          <Arrow />
          <DateContent isEmpty={!!rentalPeriod.end}>
            <Label>Até</Label>
            <RentalDate>{rentalPeriod.endFormatted}</RentalDate>
          </DateContent>
        </DateContainer>
      </Header>
      <Footer>
        <CalendarContent showsVerticalScrollIndicator={false}>
          <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
        </CalendarContent>
        <Button
          title="Confirmar"
          enabled={!!rentalPeriod.start && !!rentalPeriod.end}
          
          style={{ alignSelf: "flex-end" }}
          onPress={handleSchedulingDetails}
        />
      </Footer>
    </Container>
  );
}
