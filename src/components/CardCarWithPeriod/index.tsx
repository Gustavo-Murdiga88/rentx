import react from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { Cart } from "../../components/Car";
import { CarsProps } from "../../screens/Home";

import { Container, PeriodContainer, Text, Period } from "./styles";

interface CardCarWithPeriod {
    data: CarsProps;
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
            {startDate}
          </Text>
          <FontAwesome name="long-arrow-right" color={theme.colors.text}/>
          <Text marginLeft={10} size={13} color={theme.colors.title} fontFamily={theme.fonts.primary_400}>
          {endDate}
          </Text>
        </Period>
      </PeriodContainer>
    </Container>
  );
}
