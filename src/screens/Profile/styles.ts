import {
  View,
  Text as TextComponent,
  Image as ImageComponent,
} from "react-native";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(View)``;

export const Header = styled(View)`
  height: ${RFValue(227)}px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.shape_dark};
  padding: 60px 24px;
`;

export const HeaderControls = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled(TextComponent)`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(25)}px;
`;

export const ButtonLogout = styled(RectButton)``;

export const ImageContainer = styled(View)`
  height: 180px;
  width: 180px;

  border-radius: 90px;
  background-color: ${({ theme }) => theme.colors.text};
  align-self: center;

  margin-top: 50px;
`;
export const ButtonCam = styled(RectButton)`
  height: 40px;
  width: 40px;

  background-color: ${({ theme }) => theme.colors.main};
  border-radius: 8px;

  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const Image = styled(ImageComponent)`
  height: 180px;
  width: 180px;

  border-radius: 90px;
`;

export const Content = styled(View)`
  margin: 122px 24px;
`;

export const BoxButtons = styled(View)`
  flex-direction: row;
  margin-bottom: 24px;
  justify-content: center;
  align-items: center;
`;

interface ControlledFormProps {
  isActive: Boolean;
}

export const ButtonControl = styled(TouchableOpacity)<ControlledFormProps>`
  height: 38px;
  border-bottom-width: 3px;
  border-bottom-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.main : "transparent"};
  margin: 0px 12px;
`;

export const Text = styled(TextComponent)<ControlledFormProps>`
  height: 100%;
  font-family: ${({ theme, isActive }) =>
    isActive ? theme.fonts.secondary_600 : theme.fonts.secondary_400};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.gray : theme.colors.text};
  font-size: ${RFValue(20)}px;
  margin-bottom: 16px;
`;
export const Form = styled(View)``;
