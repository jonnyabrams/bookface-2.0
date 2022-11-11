import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { ILogin, UserType } from "../typings";

interface IAuthContext {
  currentUser: UserType;
  login: (inputs: ILogin) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [currentUser, setCurrentUser] = useState(
    // typecast returned value to string to stop it expecting string | null
    JSON.parse(localStorage.getItem("user") as string) || null
  );

  const login = async (inputs: ILogin) => {
    const res = await axios.post("http://localhost:8000/api/auth/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data);
  };

  const logout = () => {
    axios.post("http://localhost:8000/api/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    // stringify because you can't store object in localStorage
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    // will be "cannot find namespace" error here unless you give this file a .tsx extension
    <AuthContext.Provider value={{ login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
