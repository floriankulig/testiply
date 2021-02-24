import { useUser } from "hooks";
import { createContext, useContext } from "react";
import { User } from "ts";

export type AuthContextType = {
  currentUser: User | null;
  logout: () => void;
  renewToken: (token: { [name: string]: any }) => Promise<void>;
};

const AuthContext = createContext<Partial<AuthContextType>>({});

export const AuthProvider = ({ children }) => {
  const auth = useUser();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthValue = () => useContext(AuthContext);
