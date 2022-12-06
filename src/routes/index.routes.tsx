import { NavigationContainer } from "@react-navigation/native";
import { useAuthContext } from "../context/Auth";
import { TabRoutes } from "./tab.routes";
import { AuthRoutes } from "./auth.routes";

import { Loading } from "../components/Loading";

export function Routes() {
  const { user, loading } = useAuthContext();

  return loading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      {user?.id ? <TabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
