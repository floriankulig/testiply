import { useEffect, useState } from "react";
import { User } from "ts";
import { AuthContextType } from "context/user-context";
import { useCookies } from "react-cookie";
import axios from "axios";

export const useUser = (): AuthContextType => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cookie, setCookie] = useCookies(["uid"]);

  const renewUid = async (currentUserId: {
    [name: string]: any;
  }): Promise<void> => {
    await setCookie("uid", currentUserId, {
      sameSite: "strict",
      secure: true,
      path: "/",
      expires: new Date("1900-01-01"),
    });
    let newExpireDate = new Date();
    newExpireDate.setDate(newExpireDate.getDate() + 30);
    await setCookie("uid", currentUserId, {
      sameSite: "strict",
      secure: true,
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
    console.log("asking for user");
    const timeout = setTimeout(() => {
      axios
        .post(`${process.env.API_URL}/getUser`, { userid: currentUserId })
        .then((res) => setCurrentUser({ ...res.data.user }))
        .catch((error) => {
          console.log(error.response.data.err);
        });
    }, 1000);

    return () => clearTimeout(timeout);
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
    await setCookie("uid", "asdasd", {
      sameSite: "strict",
      secure: true,
      path: "/",
      expires: new Date("1900-01-01"),
    });
    await setCurrentUser(null);
  };

  return { currentUser, logout, renewUid };
};
