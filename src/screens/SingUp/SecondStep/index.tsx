import react, { useState } from "react";
import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import * as yup from "yup";

import { BackButtonComponent } from "../../../components/BackButton";
import { Bubble } from "../../../components/Bubble";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/InputPattern";
import {
  Container,
  Header,
  ActiveIndexContainer,
  Content,
  Form,
  FormTitle,
} from "./styles";
import { useNavigation, useRoute} from "@react-navigation/native";
import { useTheme } from "styled-components";
import { api } from "../../../services/api";

interface RouteParams {
    name: string;
    email: string; 
    licenseDriver: string;
}


export function SingUpSecondStep() {
  const router = useRoute();
  const {licenseDriver, name, email} = router.params as RouteParams
  const theme = useTheme();
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleCreateAccount() {
    const scheme = yup.object().shape({
      password: yup
        .string()
        .required("A senha é obrigatória")
        .min(8, "A senha dever conter no mínimo 8 caracteres"),
      confirmPassword: yup.string()
      .min(8, "A confirmação de senha dever conter no mínimo 8 caracteres")
      .required("A senha é obrigatória"),
    });
    const data = {
      confirmPassword,
      password,
    };

    try {
      if(password !== confirmPassword) {
        Alert.alert('As senhas não coincidem');
        return;
      }
      await scheme.validate(data);

      await api.post('/users', {
        email,
        password,
        driver_license: licenseDriver,
        name,
      }).then(() => {
      navigation.navigate("confirmation" as never, {
        message: '',
        nextScreen: 'SingIn',
        title: 'Conta criada!'
      } as never);
    }).catch((err) => {
      Alert.alert('Opa', 'Problemas ao criar uma nova conta, por favor tente mais tarde.')
    })
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        Alert.alert(e.message);
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="height">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButtonComponent
              type="dark"
              onPress={() => navigation.goBack()}
            />
            <ActiveIndexContainer>
              <Bubble active={false} />
              <Bubble active={true} />
            </ActiveIndexContainer>
          </Header>
          <Content>
            <FormTitle>02. Senha</FormTitle>
            <Form>
              <Input
                iconLeft="lock"
                value={password}
                type="password"
                placeholder="Senha"
                onChangeText={setPassword}
              />
              <Input
                iconLeft="lock"
                value={confirmPassword}
                type="password"
                placeholder="Repetir senha"
                onChangeText={setConfirmPassword}
              />
              <Button
                title="Proximo"
                color={password && confirmPassword && theme.colors.success}
                onPress={handleCreateAccount}
              />
            </Form>
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
