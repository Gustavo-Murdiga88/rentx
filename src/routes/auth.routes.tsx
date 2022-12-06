import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/scheduling";
import { SchedulingDetails } from "../screens/schedulingDetails";
import { Confirmation } from "../screens/Confirmation";
import { MyCars } from "../screens/Mycars";
import { Splash } from "../screens/splash";
import { SingIn } from "../screens/SingIn";
import { SingUpFirstStep } from "../screens/SingUp/FirstStep";
import { SingUpSecondStep } from "../screens/SingUp/SecondStep";

const { Navigator, Screen } = createNativeStackNavigator();
export function AuthRoutes() {
  return (
    <Navigator initialRouteName="Splash">
      <Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Screen
        name="sing_up_firstStep"
        component={SingUpFirstStep}
        options={{ headerShown: false }}
      />
      <Screen
        name="second_step"
        component={SingUpSecondStep}
        options={{ headerShown: false }}
      />
      <Screen
        name="SingIn"
        component={SingIn}
        options={{ headerShown: false }}
      />
      <Screen
        name="CarDetails"
        component={CarDetails}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}
