import React, { ComponentProps, ForwardRefRenderFunction, forwardRef, useState } from "react";
import {
  Container,
  InputText,
  ContainerIcon,
  Space,
  InputContainer,
  ContainerIconRight,
} from "./styles";
import { TextInput } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

interface InputProps extends ComponentProps<typeof TextInput> {
  iconLeft?: ComponentProps<typeof Feather>["name"];
  onPressIconRight?: () => void;
  type?: "text" | "password";
}

const input: ForwardRefRenderFunction<ComponentProps<typeof TextInput>, InputProps> = ({
  iconLeft,
  onPressIconRight,
  type = 'text',
  ...props
}: InputProps, ref) => {
  const theme = useTheme();
  const [isFocused, setFocused] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false);

  function handleChangeShowPassword() {
  setShowPassword(!showPassword);
  }
  function onFocus(){
    setFocused(!isFocused);
  }

  function onBlur(){
    setFocused(!isFocused);
  }

  return (
    <Container hasBorder={isFocused}>
      <ContainerIcon>
        <Feather 
        size={20} 
        name={iconLeft} 
        color={
          props.value ? theme.colors.main : theme.colors.text
        } />
      </ContainerIcon>
      <Space />
      <InputContainer>
        <InputText {...props} 
          secureTextEntry={!showPassword && type === 'password'}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {type === 'password' && (
          <ContainerIconRight
            onPress={handleChangeShowPassword}
          >
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color={theme.colors.text} />
          </ContainerIconRight>
        )}
      </InputContainer>
    </Container>
  );
}
export const Input  = forwardRef(input);
