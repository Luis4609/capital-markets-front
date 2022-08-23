import React, { createContext, ReactNode, useContext, useState } from "react";
import { boolean } from "yup";
import type { AuthContextType } from "../types/user";
// function AuthUserContext() {
//   return <div>AuthUserContext</div>;
// }

// export default AuthUserContext;

const authContextDefaultValues: AuthContextType = {
  mail: "",
  password: "",
  isLogging: false,
};

const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState({
    mail: "",
    password: "",
    isLogging: false,
  });

  const value = {
    user,
    setUser,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
