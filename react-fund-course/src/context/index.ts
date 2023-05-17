import { SetStateAction, createContext } from "react";

interface IAuthContext {
    isAuth: boolean;
    setIsAuth: React.Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
  }

  export const authContextDefaults: IAuthContext = {
    isAuth: false,
    setIsAuth: () => false,
    isLoading: true
  };

export const AuthContext = createContext<IAuthContext>(
    authContextDefaults
);