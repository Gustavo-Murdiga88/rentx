import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import NetInfo from "@react-native-community/netinfo";

import { Alert, ToastAndroid } from "react-native";
import { api } from "../services/api";

import { database } from "../database";
import { users } from "../database/models/users";

interface User {
  id: string;
  id_user: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextProps {
  user: User;
  singIn: (credentials: Credentials) => Promise<void>;
  singOut(): void;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const netInfo = NetInfo.useNetInfo()
  const [auth, setAuth] = useState<AuthState>({} as AuthState);
  const [loading, setIsLoading] = useState<boolean>(true);

  const { user } = auth;

  useEffect(() => {
    if (netInfo.isConnected === false) {
      ToastAndroid.show("Você está desconectado", ToastAndroid.LONG);
     }
  }, [netInfo.isConnected])

  async function singIn({ email, password }: Credentials) {
    try {
      const response = await api.post<AuthState>("/sessions", {
        email,
        password,
      });
      const { token, user } = response.data;
      api.defaults.headers.authorization = `Bearer ${token}`;

      await database.write(async () => {
        await database.get<users>("users").create((model) => {
          model.name = user.name;
          model.email = user.email;
          model.driver_license = user.driver_license;
          model.id_user = user.id;
          model.token = token;
        });
      });

      setAuth({ token, user });
    } catch (err) {
      Alert.alert("Ops!", "E-mail ou senha incorretos");
    }
  }

  async function singOut() {
    const {
      user: { id },
    } = auth;

    await database.write(async () => {
      const user = database.get("users");
      const response = await user.find(id)
      await response.destroyPermanently();
    });
    setAuth({} as AuthState);
  }

  useEffect(() => {
    async function getUserLogged() {
      const userCollection = database.get("users");
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const { token, avatar, email, driver_license, id_user, name, id } =
          response[0]._raw as unknown as users;
        const user = {
          avatar,
          driver_license,
          email,
          id_user,
          id,
          name,
        } as User;
        api.defaults.headers.authorization = `Bearer ${token}`;
        setAuth({ user, token });
      }
      setIsLoading(false);
    }

    getUserLogged();
  }, []);

  return (
    <AuthContext.Provider value={{ singIn, user, singOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}
