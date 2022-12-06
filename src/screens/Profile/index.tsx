import react, { useState } from "react";
import { useTheme } from "styled-components";
import { BackButtonComponent } from "../../components/BackButton";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Header,
  HeaderControls,
  Title,
  ButtonLogout,
  ImageContainer,
  ButtonCam,
  Image,
  Content,
  BoxButtons,
  ButtonControl,
  Text,
  Form,
} from "./styles";
import { Input } from "../../components/InputPattern";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ToastAndroid,
} from "react-native";
import { useAuthContext } from "../../context/Auth";
import { Button } from "../../components/Button";
import { database } from "../../database";
import { users } from "../../database/models/users";
import { useNetInfo } from "@react-native-community/netinfo";

export function Profile() {
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const theme = useTheme();
  const { user, singOut } = useAuthContext();

  const [imageUri, setImageUri] = useState<string>(user.avatar);
  const [typeOfForm, setTypeOfTheForm] = useState<"Data" | "Password">("Data");

  const [name, setName] = useState<string>(user.name);
  const [driverLicense, setDriverLicense] = useState<string>(
    user.driver_license
  );

  function logout() {
    Alert.alert(
      "Tem certeza?",
      "Você tem certeza que gostaria de sair do App? Após a confirmação será necessário acesso a internet para acesso ao app.",
      [
        {
          style: "cancel",
          text: "Cancelar",
          onPress: () => {},
        },
        {
          style: "default",
          onPress: () => {
            singOut();
          },
          text: "Sair",
        },
      ]
    );
  }

  async function handleUpdateUser() {
    try {
      if(user.id){
      await database.write(async () => {
        const response = await database.get<users>("users").find(user.id);
        await response.update((user) => {
          user.name = name;
          user.driver_license = driverLicense;
          user.avatar = imageUri;
        });

        ToastAndroid.showWithGravityAndOffset(
          "Sucesso, conta alterada com sucesso!",
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          100,
          100
        );
      });
    }
    } catch (e) {
      console.log(e, 'erro de update')
      ToastAndroid.showWithGravityAndOffset(
        "Ops, algo de errado aconteceu!",
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        50,
        50
      );
    }
  }

  async function imagePicker() {
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (image.cancelled) {
      return;
    }

    setImageUri(image.uri);
  }

  return (
    <KeyboardAvoidingView behavior="position">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderControls>
              <BackButtonComponent
                type="light"
                onPress={() => {
                  navigation.navigate("Initial" as never);
                }}
              />
              <Title>Editar Perfil</Title>
              <ButtonLogout onPress={logout}>
                <Feather name="power" size={24} color={theme.colors.text} />
              </ButtonLogout>
            </HeaderControls>
            <ImageContainer>
              <Image
                style={{ height: 180, width: 180 }}
                source={{
                  uri:
                    imageUri ||
                    `https://ui-avatars.com/api/?size=255&font-size=0.4&name=${user.name}`,
                }}
              />
              <ButtonCam onPress={imagePicker}>
                <Feather
                  name="camera"
                  size={24}
                  color={theme.colors.background_primary}
                />
              </ButtonCam>
            </ImageContainer>
          </Header>

          <Content>
            <BoxButtons>
              <ButtonControl
                isActive={typeOfForm === "Data"}
                onPress={() => setTypeOfTheForm("Data")}
              >
                <Text isActive={typeOfForm === "Data"}>Dados</Text>
              </ButtonControl>
              <ButtonControl
                isActive={typeOfForm === "Password"}
                onPress={() => {
                  if(netInfo.isConnected === false){
                    Alert.alert('Aviso', 'Conecte-se novamente a rede pra alterar a senha');
                  }else{
                    setTypeOfTheForm("Password")  
                  }
                }}
              >
                <Text isActive={typeOfForm === "Password"}>Trocar senha</Text>
              </ButtonControl>
            </BoxButtons>

            <Form>
              {typeOfForm === "Data" ? (
                <>
                  <Input
                    iconLeft="user"
                    placeholder="Nome"
                    type="text"
                    defaultValue={user.name}
                    onChangeText={setName}
                  />
                  <Input
                    iconLeft="mail"
                    defaultValue={user.email}
                    editable={false}
                    keyboardType="email-address"
                  />
                  <Input
                    iconLeft="credit-card"
                    defaultValue={user.driver_license}
                    placeholder="CNH"
                    keyboardType="numeric"
                    onChangeText={setDriverLicense}
                  />
                </>
              ) : (
                <>
                  <Input
                    iconLeft="lock"
                    placeholder="Senha atual"
                    type="password"
                    keyboardType="default"
                  />
                  <Input
                    iconLeft="lock"
                    placeholder="Senha"
                    type="password"
                    keyboardType="default"
                  />
                  <Input
                    iconLeft="lock"
                    placeholder="Repetir senha"
                    type="password"
                    keyboardType="default"
                  />
                </>
              )}
            </Form>
            <Button
              title="Salvar alterações"
              mt={16}
              onPress={handleUpdateUser}
            />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
