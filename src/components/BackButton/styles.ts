import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { View } from 'react-native'
import styled from "styled-components/native";

interface BackIconProps{
    type: 'light' | 'dark';
};

export const Container = styled(BorderlessButton)`
    background-color:transparent;

`
export const BackIcon = styled(Feather)<BackIconProps>`
    background-color: transparent;
    color: ${({ theme, type}) => type === 'dark' ? theme.colors.title: theme.colors.background_primary};
`