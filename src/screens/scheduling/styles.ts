import { View, Text, ScrollView } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(View)`
  flex: 1;
`;

export const Header = styled(View)`
  width: 100%;
  height: ${RFValue(325)}px;
  background-color: ${({ theme }) => theme.colors.header};
  flex-direction: column;
  justify-content: flex-end;

  padding: 32px 24px;
`;

export const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.background_primary};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(34)}px;
  margin-bottom: 32px;
  margin-top: ${RFValue(24)}px;
  max-width: ${RFValue(250)}px;
`;

export const DateContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

interface DateContent {
  isEmpty: boolean;
}
export const DateContent = styled(View)<DateContent>`
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme, isEmpty }) =>
    !isEmpty ? theme.colors.text : "transparent"};
  width: 120px;
`;

export const Label = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
  margin-bottom: 9px;
`;
export const RentalDate = styled(Text)`
  color: ${({ theme }) => theme.colors.background_primary};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
`;

export const Footer = styled(View)`
    flex:1;
    padding: 0px 16px 24px 16px;
`;

export const CalendarContent = styled(ScrollView)`
    flex: 1%;
`;