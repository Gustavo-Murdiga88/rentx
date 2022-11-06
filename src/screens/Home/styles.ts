import {View, Text, FlatList } from 'react-native'
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize'

import {CarsProps} from './index'
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(View)`
    flex:1;
    background-color: ${({theme}) => theme.colors.background_primary};
`;

export const  Header = styled(View)`
    background-color: ${({theme}) => theme.colors.header};
    height: ${RFValue(113)}px;
    width: 100%;
    justify-content: flex-end;
`
export const  HeaderContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 32px 24px;
`
export const  AmountCars = styled(Text)`
    color: ${({theme}) => theme.colors.text};
    font-family:  ${({theme}) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;

`
export const CartList = styled(FlatList<CarsProps>)`
    flex: 1;
`

export const MyCarsButton = styled(RectButton)`
    height: 60px;
    width: 60px;

    align-items: center;
    justify-content: center;

    color: ${({theme}) => theme.colors.background_primary};

    position: absolute;
    bottom: 13px;
    right: 22px;

    background-color: ${({theme}) => theme.colors.main};
    border-radius: 30px;
`;
