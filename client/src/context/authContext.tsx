import { createContext, useEffect, useState } from "react";
import { UserType } from "../typings";

interface IAuthContext {
  currentUser: UserType;
  login: () => void;
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

  const login = () => {
    setCurrentUser({firstName: "Diego", lastName: "Abrams", email: "diego@diego.com", password: "diego", id: 2})
  };

  useEffect(() => {
    // stringify because you can't store object in localStorage
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    // will be "cannot find namespace" error here unless you give this file a .tsx extension
    <AuthContext.Provider value={{ login, currentUser }}>{children}</AuthContext.Provider>
  );
};
