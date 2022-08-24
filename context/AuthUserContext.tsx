import { createContext, ReactNode, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

interface IUser {
  name: string;
  auth: boolean;
}

export const UserContext = createContext<any>({ name: "", auth: false });

export const UserProvider = ({ children }: Props) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({ name: "", auth: true });

  const useUserContext = useContext(UserContext);

  // if(!useUserContext){
  //   throw new Error('useAuthContext is not defined probably is not inside a AuthProvider')
  // }
  // return useUserContext

  const login = (name: string) => {
    setUser((user) => ({
      name: name,
      auth: true,
    }));
  };

  const logout = () => {
    setUser((user) => ({
      name: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
