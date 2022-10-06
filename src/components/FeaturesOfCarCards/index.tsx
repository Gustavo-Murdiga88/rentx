import React, { FC } from "react";
import {Container, Subtitle} from './style';

import Accelerator from '../../assets/acceleration.svg';

interface CardFeatureOfCarProps {
  subTitle: string;
  Icon: FC;
}

export function CardFeatureOfCar({ subTitle, Icon }: CardFeatureOfCarProps) {
  return (
    <Container>
      <Icon />
      <Subtitle>{subTitle}</Subtitle>
    </Container>
  );
}
