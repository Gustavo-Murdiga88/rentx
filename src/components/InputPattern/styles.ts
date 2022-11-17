import { View } from "react-native";
import {RectButton, TextInput} from 'react-native-gesture-handler'
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

type Props = {
    hasBorder: boolean;
}

export const Container = styled(View)<Props>`
    flex-direction: row;
    margin-bottom: 8px;
    background-color: ${({ theme }) => theme.colors.background_secondary};
    border-bottom-width: 2px;
    border-bottom-color: ${({ theme, hasBorder }) => hasBorder ? theme.colors.main : 'transparent'};
`;

export const InputText = styled(TextInput)`
    flex: 1;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color:  ${({ theme }) => theme.colors.header};
    padding: 0 23px;
    background-color: ${({ theme }) => theme.colors.background_secondary};
`

export const ContainerIcon = styled(View)`
    height: 55px;
    width: 56px;
    align-items: center;
    justify-content: center;
`

export const Space = styled(View)`
    width: 4px;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const InputContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    align-items: center;

`;

export const ContainerIconRight = styled(RectButton)`
    height: 55px;
    width: 56px;
    align-items: center;
    justify-content: center;
`