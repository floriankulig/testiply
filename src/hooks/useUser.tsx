import { useEffect, useState } from "react";
import { User } from "ts";
import { AuthContextType } from "context/user-context";
import { useCookies } from "react-cookie";
import * as jwt from "jsonwebtoken";

export const useUser = (): AuthContextType => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  const renewUid = async (currentToken: {
    [name: string]: any;
  }): Promise<void> => {
    await removeCookie("token");
    let newExpireDate = new Date();
    newExpireDate.setDate(newExpireDate.getDate() + 30);
    await setCookie("token", currentToken, {
      sameSite: true,
      path: "/",
      expires: newExpireDate,
    });
  };

  useEffect(() => {
    if (!cookie["token"]) return;
    let decoded: any;
    try {
      decoded = jwt.verify(cookie["token"], process.env.JWT_SECRET);
    } catch (error) {
      setCurrentUser(null);
      return;
    }
    setCurrentUser({
      email: "meine@mail.mail",
      is_dev: false,
      _id: decoded.id,
      ownedApps: ["ansdopauidiau"],
    });
  }, [cookie]);

  // Renew Cookie on App Mount and set Session User
  useEffect(() => {
    const currentToken = cookie["token"];

    if (currentToken) {
      renewUid(currentToken);
    }
  }, []);

  // Set Cookie to date in past / non-existant date
  const logout = async (): Promise<void> => {
    await removeCookie("token");
    await setCurrentUser(null);
  };

  return { currentUser, logout, renewUid };
};
