import { useEffect, useState } from "react";
import { User } from "ts";
import { AuthContextType } from "context/user-context";
import { useCookies } from "react-cookie";
import axios from "axios";

export const useUser = (): AuthContextType => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cookie, setCookie, removeCookie] = useCookies(["uid"]);

  const renewUid = async (currentUserId: {
    [name: string]: any;
  }): Promise<void> => {
    await removeCookie("uid");
    let newExpireDate = new Date();
    newExpireDate.setDate(newExpireDate.getDate() + 30);
    await setCookie("uid", currentUserId, {
      sameSite: true,
      path: "/",
      expires: newExpireDate,
    });
  };

  useEffect(() => {
    const currentUserId = cookie["uid"];
    if (!currentUserId) {
      setCurrentUser(null);
      return;
    }

    axios
      .post(`${process.env.API_URL}/getUser`, { userid: currentUserId })
      .then((res) => setCurrentUser({ ...res.data.user }))
      .catch((error) => {
        return;
      });
  }, [cookie]);

  // Renew Cookie on App Mount and set Session User
  useEffect(() => {
    const currentUserId = cookie["uid"];

    if (currentUserId) {
      renewUid(currentUserId);
    }
  }, []);

  // Set Cookie to date in past / non-existant date
  const logout = async (): Promise<void> => {
    await removeCookie("token");
    await setCurrentUser(null);
  };

  return { currentUser, logout, renewUid };
};
