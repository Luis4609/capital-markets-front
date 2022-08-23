import React, { createContext, ReactNode, useContext, useState } from "react";
import { boolean } from "yup";
import type { AuthContextType } from "../types/user";
// function AuthUserContext() {
//   return <div>AuthUserContext</div>;
// }

// export default AuthUserContext;

const authContextDefaultValues: Iuser = {
  user: {
    mail: "",
    password: "",
    isLogging: false,
  },
  setUser: () => {}
};

interface Iuser {
  user: AuthContextType
  setUser: Function
}


const AuthContext = createContext<any>(authContextDefaultValues);

export function useAuth() {
  const useAuthContext = useContext(AuthContext);

  if (!useAuthContext) {
    throw new Error('useAuthContext is not defined probably is not inside a AuthProvider')
  }
  return useAuthContext
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState({
    
  });

  return (
    <>
      <AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>
    </> 
  );
}
