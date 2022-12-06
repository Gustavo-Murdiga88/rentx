import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { Button } from "../../components/Button";
import { Input } from "../../components/InputPattern";
import { Container, Content, Header, SubTitle, Title, Footer } from "./styles";
import { useAuthContext } from "../../context/Auth";

export function SingIn() {
  const { singIn } = useAuthContext();
  const navigation = useNavigation();
  const [keyboardOpen, setKeyBoardOpen] = useState(false);
  const theme = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleCreateANewAccount() {
    navigation.navigate("sing_up_firstStep" as never);
  }

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setKeyBoardOpen(true);
    });
    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
    };
  }, []);

 async function handleSingIn(){
    if(email && password){
    singIn({email, password})
    }
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled>
      <TouchableWithoutFeedback
        onPress={() => {
          setKeyBoardOpen(false);
          Keyboard.dismiss();
        }}
      >
        <Container>
          <Header keyboardOpen={keyboardOpen}>
            <Title>Estamos{"\n"}quase lá.</Title>
            <SubTitle>
              Faça seu login para começar{"\n"}uma experiência incrível.
            </SubTitle>
          </Header>
          <Content>
            <Input
              iconLeft="mail"
              autoCorrect={false}
              autoComplete="email"
              placeholder="Email"
              onChangeText={(value) => setEmail(value)}
              value={email}
            />
            <Input
              iconLeft="lock"
              autoCorrect={false}
              placeholder="Senha"
              type="password"
              onChangeText={(password) => setPassword(password)}
              value={password}
            />

            <Footer>
              <Button title="Login" color={theme.colors.main} onPress={handleSingIn}/>
              <Button
                title="Criar conta gratuita"
                mt={8}
                color={theme.colors.background_secondary}
                colorTitle={theme.colors.title}
                onPress={handleCreateANewAccount}
              />
            </Footer>
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
