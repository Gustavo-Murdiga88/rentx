import { View, Text as TextReact} from "react-native";
import styled from "styled-components/native";

export const Container = styled(View)`
    flex-direction: column;
`;

export const PeriodContainer = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 23px;
    background-color: ${({ theme}) => theme.colors.background_secondary};

    margin-top: -11px;
    margin-bottom: 16px;
`; 

type TextProps = {
    fontFamily?: string; 
    size?: number;
    color?: string;
    marginRight?: number; 
    marginLeft?: number;
}

export const Text = styled(TextReact)<TextProps>`
    color: ${({ color, theme}) => color ?? theme.colors.text };
    text-transform: uppercase;
    font-family: ${({ fontFamily, theme}) => fontFamily ?? theme.fonts.secondary_500};
    font-size: ${({ size }) => size ?? 10}px;

    margin-right: ${({ marginRight }) => marginRight || 0}px;
    margin-left: ${({ marginLeft }) => marginLeft || 0}px;

`; 


export const Period = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`; 