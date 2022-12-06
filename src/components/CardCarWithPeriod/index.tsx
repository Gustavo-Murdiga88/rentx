import react from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { Cart } from "../../components/Car";
import { CarsProps } from "../../screens/Home";

import { Container, PeriodContainer, Text, Period } from "./styles";
import { cars as ModelCar } from "../../database/models/cars";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlataformDate";

interface CardCarWithPeriod {
    data: ModelCar;
    startDate: string;
    endDate: string;
}

export function CardCarWithPeriod({data, startDate, endDate}: CardCarWithPeriod) {
  const theme = useTheme();
  return (
    <Container>
      <Cart data={data} />
      <PeriodContainer>
        <Text>Período</Text>
        <Period>
          <Text marginRight={10} size={13} color={theme.colors.title} fontFamily={theme.fonts.primary_400}>
            {format(getPlatformDate(new Date(startDate)), 'dd/MM/yyyy')}
          </Text>
          <FontAwesome name="long-arrow-right" color={theme.colors.text}/>
          <Text marginLeft={10} size={13} color={theme.colors.title} fontFamily={theme.fonts.primary_400}>
          {format(new Date(endDate), 'dd/MM/yyyy')}
          </Text>
        </Period>
      </PeriodContainer>
    </Container>
  );
}
