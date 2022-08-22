import React, { createContext, ReactNode, useContext, useState } from "react";
import { boolean } from "yup";
import type { AuthContextType } from "../types/user";
// function AuthUserContext() {
//   return <div>AuthUserContext</div>;
// }

// export default AuthUserContext;

const authContextDefaultValues: AuthContextType = {
  user: false,
  login: () => {},
  register: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState(false);

  const login = () => {
    setUser(true);
  };

  const register = (data: any) => {
    setUser(data);
  };

  const logout = (data: any) => {
    setUser(data);
  };

  const value = {
    user,
    login,
    register,
    logout,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
