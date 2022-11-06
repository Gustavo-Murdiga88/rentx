import { View, Text, Image, ScrollView } from "react-native";
// use later Dimensions for 'react-native'
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(View)`
  flex: 1;
  margin: 40px 24px;
`;
export const Title = styled(Text)``;

export const HeaderSlider = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;
export const ActiveIndexes = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

type ActiveIndex = {
  active: boolean;
};
export const ActiveIndex = styled(View)<ActiveIndex>`
  height: 6px;
  width: 6px;
  margin-left: 8px;
  border-radius: 3px;

  background-color: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.text_detail};
`;

export const CarSlide = styled(Image)`
  width: 100%;
  height: ${RFValue(133)}px;
  align-items: center;
  justify-content: center;
`;

export const Content = styled(ScrollView)`
    width: 100%;
    margin-top: 36px;
`;

export const Car = styled(View)``;

export const Brand = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text_detail};
  font-size: ${RFValue(11)}px;

  text-transform: uppercase;
`;

export const Model = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(25)}px;
`;

export const Price = styled(View)``;

export const Period = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text_detail};
  font-size: ${RFValue(10)}px;

  text-transform: uppercase;
`;

export const Value = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.main};
  font-size: ${RFValue(25)}px;
`;

export const Details = styled(Text)`
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
    font-size:${RFValue(14)}px;

    margin-top: 24px;

    line-height: 25px;
`;

export const Rent = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

`

export const FeaturesOfCar = styled(View)`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 18px;

`

export const Footer = styled(View)``;