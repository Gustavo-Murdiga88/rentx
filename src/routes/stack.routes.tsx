import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/scheduling";
import { SchedulingDetails } from "../screens/schedulingDetails";
import { SchedulingDone } from "../screens/schedulingDone";
import {MyCars} from '../screens/Mycars'
import {Splash} from '../screens/splash'


const { Navigator, Screen } = createNativeStackNavigator();
export function StackRoutes() {
  return (
    <Navigator initialRouteName="Splash">
       <Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Screen name="Home" component={Home} options={{ headerShown: false, gestureEnabled: false }} />
      <Screen
        name="CarDetails"
        component={CarDetails}
        options={{ headerShown: false }}
      />
      <Screen
        name="Scheduling"
        component={Scheduling}
        options={{ headerShown: false }}
      />
      <Screen
        name="SchedulingDetails"
        component={SchedulingDetails}
        options={{ headerShown: false }}
      />
      <Screen
        name="SchedulingDone"
        component={SchedulingDone}
        options={{ headerShown: false }}
      />
       <Screen
        name="MyCars"
        component={MyCars}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}
