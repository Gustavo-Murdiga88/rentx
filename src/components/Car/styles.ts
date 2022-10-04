import { Text, View, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components";

export const Container = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;

  background-color: ${({ theme }) => theme.colors.background_secondary};
  padding: 24px;
`;

export const AsideContent = styled(View)``;

export const Brand = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.text_detail};
  margin-bottom: 4px;

  text-transform: uppercase;
`;

export const BrandContent = styled(View)``;

export const Model = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
  margin-bottom: 16px;
`;

export const RentContainer = styled(View)``;

export const Description = styled(Text)`
 font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.text_detail};
  margin-bottom: 4px;

  text-transform: uppercase;
`;

export const PriceRentContainer = styled(View)`
    flex-direction: row;
`;

export const PriceRent = styled(Text)`
 font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.main};
  margin-bottom: 4px;
  margin-right: 24px;

  text-transform: uppercase;
`;

export const Car = styled(Image)`
    width: 160px;
    height: 92px;
`;
