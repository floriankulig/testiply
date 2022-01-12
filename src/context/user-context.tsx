import { useUser } from "hooks";
import { createContext, useContext } from "react";
import { User } from "ts";
export type AuthContextType = {
  currentUser: User | null;
  canHaveUser: boolean;
  logout: () => void;
  renewUid: (token: string, expiresTomorrow?: boolean) => Promise<void>;
};

const AuthContext = createContext<Partial<AuthContextType>>({});

export const AuthProvider = ({ children }) => {
  const auth = useUser();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthValue = () => useContext(AuthContext);
