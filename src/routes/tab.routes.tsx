import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StackRoutes } from "./stack.routes";
import { MyCars } from "../screens/Mycars";
import { useTheme } from "styled-components";

import HomeIcon from "../assets/home.svg";
import CarIcon from "../assets/car.svg";
import PeopleIcon from "../assets/people.svg";
import { Profile } from "../screens/Profile";

const { Navigator, Screen } = createBottomTabNavigator();
export function TabRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      initialRouteName="Initial"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 78,
          backgroundColor: theme.colors.background_secondary,
        },

        tabBarIcon: ({ color }) => {
          if (route.name === "Initial") {
            return <HomeIcon fill={color} height={22} width={22} />;
          }
          if (route.name === "Cars") {
            return <CarIcon fill={color} height={22} width={22} />;
          }
          if (route.name === "User") {
            return <PeopleIcon fill={color} height={22} width={22} />;
          }
        },
      })}
    >
      <Screen
        name="Initial"
        component={StackRoutes}
        options={{ headerShown: false }}
      />
      <Screen name="Cars" component={MyCars} options={{ headerShown: false}} />
      <Screen name="User" component={Profile} options={{ headerShown: false }} />
    </Navigator>
  );
}
