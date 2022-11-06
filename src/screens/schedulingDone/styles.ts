import { View, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(View)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.header};
    align-items: center;
`;
export const XContainer = styled(View)``;

export const Header = styled(View)`
    width: 100%;
    flex-direction: column;
    margin-top: ${RFValue(40)}px;
    align-items: center;

`;
export const DoneContainer = styled(View)``;
export const Content = styled(View)`
    flex: 1;
`;
export const Title = styled(Text)`
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    font-size: ${RFValue(30)}px;
    color: ${({ theme }) => theme.colors.background_primary};
    
    text-align: center;
    margin-top: 46px;
`;
export const Description = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;
    line-height: 25px;
    color: ${({ theme }) => theme.colors.text_detail};
    
    margin-top: 16px;
    text-align: center;

`;
export const Footer = styled(View)`
    flex: 1;
    justify-content: flex-end;
    align-items: center;

    margin: 0 auto;
    margin-bottom: 40px;

    width: ${RFValue(80)}px;
`;