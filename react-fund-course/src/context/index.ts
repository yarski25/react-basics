import { SetStateAction, createContext } from "react";

export interface AuthContextInterface {
    isAuth: boolean;
    //setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    //setIsAuth: React.Dispatch<SetStateAction<boolean>>;

  }

  export const authContextDefaults: AuthContextInterface = {
    isAuth: false,
    //setIsAuth: React.Dispatch<SetStateAction<boolean>>(false);
  };

export const AuthContext = createContext<AuthContextInterface>(
    authContextDefaults
);