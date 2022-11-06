import React, { FC } from "react";
import { SvgProps } from "react-native-svg";
import {Container, Subtitle} from './style';
interface CardFeatureOfCarProps {
  subTitle: string;
  Icon: FC<SvgProps>;
}

export function CardFeatureOfCar({ subTitle, Icon }: CardFeatureOfCarProps) {
  return (
    <Container>
      <Icon />
      <Subtitle>{subTitle}</Subtitle>
    </Container>
  );
}
