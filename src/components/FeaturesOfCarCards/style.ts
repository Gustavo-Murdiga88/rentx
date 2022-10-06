import { View, Text} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";

export const Container = styled(View)`
    align-items: center;
    justify-content: center;
    height: 92px;
    width: 109px;
    padding:16px;
    

    background-color: ${({ theme}) => theme.colors.background_primary};

    margin-right: auto;
    margin-left: auto;
    margin-bottom: 7px;

`

export const Subtitle = styled(Text)`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.text}; 

    margin-top: 12px;
    font-size: ${RFValue(13)}px;
`