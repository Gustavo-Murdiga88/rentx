import { View, Text, FlatList, FlatListProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { SchedulesProps } from ".";

export const Container = styled(View)`
  flex: 1;
`;

export const Header = styled(View)`
  width: 100%;
  height: 263px;
  background-color: ${({ theme }) => theme.colors.header};
  flex-direction: column;
  justify-content: flex-end;

  padding: 32px 24px;

`;

export const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.background_primary};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;
  margin-bottom: 18px;
  margin-top: ${RFValue(22)}px;
  max-width: 350px;
  width: 100% !important;
`;

export const SubTitle = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(15)}px;
`;

export const SchedulingDone = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(15)}px;

  padding: 0px 8px;
`;
export const SchedulingCount = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const InfoContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SchedulingContainer = styled(View)`
  padding: 24px 16px;
`;

export const CarsList = styled(FlatList as typeof FlatList<SchedulesProps>)``;

export const CarsListContainer = styled(View)`
  
  flex: 1;
  height: 100%;
  padding-bottom: 15px;
  
`;