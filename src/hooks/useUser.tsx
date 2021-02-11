import { useEffect, useState } from "react";
import { User } from "ts";
import { AuthContextType } from "context/user-context";
import { useCookies } from "react-cookie";
import * as jwt from "jsonwebtoken";

export const useUser = (): AuthContextType => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    if (!cookie["token"]) return;
    let decoded: any;
    try {
       decoded = jwt.verify(cookie["token"], process.env.JWT_SECRET);
    } catch (error) {
      setCurrentUser(null)
      return
    }
    setCurrentUser({
      email: "meine@mail.mail",
      is_dev: false,
      _id: decoded.id,
    });
  }, [cookie]);

  // Renew Cookie on App Mount and set Session User
  useEffect(() => {
    const currentToken = cookie["token"];

    if (currentToken) {
      removeCookie("token");
      let newExpireDate = new Date();
      newExpireDate.setDate(newExpireDate.getDate() + 30);
      setCookie("token", currentToken, {
        sameSite: true,
        expires: newExpireDate,
      });
    }
  }, []);

  // Set Cookie to date in past / non-existant date
  const logout = (): void => {
    removeCookie("token");
    setCurrentUser(null);
  };

  return { currentUser, logout };
};
