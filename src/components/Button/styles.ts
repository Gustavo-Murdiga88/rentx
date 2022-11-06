import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components';

interface ButtonProps {
    color?: string; 
}

export const Container = styled(RectButton)<ButtonProps>`
    width: 100%;
    flex-direction: row;
    justify-content: center;

    background-color: ${({ theme, color}) => color ? color : theme.colors.main};
    padding: 19px;
    border-radius: 8px;
    margin-top: 25px;
`;
export const Title = styled(Text)`

    color:  ${({ theme}) => theme.colors.background_primary};
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme}) => theme.fonts.primary_500};
`;