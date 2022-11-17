import react, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import {} from "react";
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
  Title,
  Subtitle,
  Form,
  FormTitle,
} from "./styles";
import { useNavigation } from "@react-navigation/native";

export function SingUpFirstStep() {
  const navigation = useNavigation();
  const [keyboardOpen, setKeyBoardOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [licenseDriver, setLicenseDriver] = useState("");

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setKeyBoardOpen(true);
    });
    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
    };
  }, []);

  async function handleSecondaryStep() {
    const scheme = yup.object().shape({
      licenseDriver: yup.string().required("CNH é obrigatória"),
      email: yup
        .string()
        .email("insira um e-mail válido")
        .required("Email é obrigatório"),
      name: yup.string().required("O nome é obrigatório"),
    });
    const data = {
      name,
      email,
      licenseDriver,
    };

    try {
      await scheme.validate(data);
      navigation.navigate("second_step" as never, data as never);
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        Alert.alert(e.message);
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="height">
      <TouchableWithoutFeedback
        onPress={() => {
          setKeyBoardOpen(false);
          Keyboard.dismiss();
        }}
      >
        <Container>
          <Header>
            <BackButtonComponent
              type="dark"
              onPress={() => navigation.goBack()}
            />
            <ActiveIndexContainer>
              <Bubble active={true} />
              <Bubble active={false} />
            </ActiveIndexContainer>
          </Header>
          <Content keyboardOpen={keyboardOpen}>
            {!keyboardOpen && (
              <>
                <Title>Crie sua {"\n"}conta</Title>
                <Subtitle>
                  Faça seu cadastro de{"\n"}forma rápida e fácil.
                </Subtitle>
              </>
            )}
            <FormTitle>1. Dados</FormTitle>
            <Form>
              <Input
                iconLeft="user"
                value={name}
                placeholder="Nome"
                onChangeText={setName}
              />
              <Input
                iconLeft="mail"
                value={email}
                placeholder="E-mail"
                onChangeText={setEmail}
              />
              <Input
                iconLeft="credit-card"
                value={licenseDriver}
                placeholder="CNH"
                onChangeText={setLicenseDriver}
                keyboardType="number-pad"
              />
              <Button title="Proximo" onPress={handleSecondaryStep} />
            </Form>
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
