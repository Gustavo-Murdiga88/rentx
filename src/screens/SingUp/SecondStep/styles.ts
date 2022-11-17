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
  keyboardOpen?: boolean;
}
export const Content = styled(View)<Props>`
  margin-top: ${RFValue(31)}px;
`;

export const FormTitle = styled(Text)`
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.title};
    margin-top: 64px;
    margin-bottom: 24px;
    font-size: ${RFValue(20)}px;

`;

export const Form = styled(View)``;