import { View, Text} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(View)`
    background-color: ${({ theme }) => theme.colors.background_primary};
    padding: 0px 32px;

`

export const Content = styled(View)`
    margin-top: ${RFValue(64)}px;
`;

interface Props {
    keyboardOpen?: boolean;
}
export const Header = styled(View)<Props>`
    margin-top: ${({keyboardOpen}) => keyboardOpen ? RFValue(100): RFValue(145)}px;
    height: ${({keyboardOpen}) => keyboardOpen ? '0px': 'auto'};
`;

export const SubTitle = styled(Text)`
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(15)}px;
    line-height: 25px;

    margin-top: ${RFValue(15)}px;

`;

export const Title = styled(Text)`
    font-family: ${({theme}) => theme.fonts.secondary_500};
    color: ${({theme}) => theme.colors.title};
    line-height: 44px;
    font-size: ${RFValue(40)}px;
    text-align: left;

`;

export const Footer = styled(View)`
   margin-top: ${RFValue(39)}px;
`;