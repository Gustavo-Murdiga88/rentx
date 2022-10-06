import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";

import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";

import { Home } from "./src/screens/Home";
import { theme } from "./src/styles/theme";
import { CarDetails } from "./src/screens/CarDetails";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <Home /> */}
        <CarDetails
          images={[
            "https://w7.pngwing.com/pngs/833/338/png-transparent-audi-rs5-car-audi-q5-audi-s5-audi-convertible-car-performance-car.png",
          ]}
        />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
