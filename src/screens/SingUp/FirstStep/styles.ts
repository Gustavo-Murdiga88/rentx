import { View, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(View)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  padding: 0 24px;
`;

export const Header = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(52)}px;
`;
export const ActiveIndexContainer = styled(View)`
  flex-direction: row;
`;

interface Props {
  keyboardOpen: boolean;
}
export const Content = styled(View)<Props>`
  margin-top: ${({keyboardOpen}) => keyboardOpen ? RFValue(10) : RFValue(48)}px;
`;

export const Title = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(40)}px;
  color: ${({ theme}) => theme.colors.title};

`;
export const Subtitle = styled(Text)`
  margin-top: 16px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
  line-height: ${RFValue(25)}px;
`;

export const FormTitle = styled(Text)`
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.title};
    margin-top: 64px;
    margin-bottom: 24px;
    font-size: ${RFValue(20)}px;

`;

export const Form = styled(View)``;