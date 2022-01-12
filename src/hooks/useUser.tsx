import { useEffect, useState } from "react";
import { User } from "ts";
import { AuthContextType } from "context/user-context";
import { useCookies } from "react-cookie";
import axios from "axios";

export const useUser = (): AuthContextType => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [canHaveUser, setCanHaveUser] = useState<boolean>(false);
  const [cookie, setCookie] = useCookies(["uid"]);

  const renewUid = async (
    currentUserId: string,
    expiresTomorrow = false
  ): Promise<void> => {
    await setCookie("uid", currentUserId, {
      sameSite: "strict",
      secure: true,
      path: "/",
      expires: new Date("1900-01-01"),
    });
    let newExpireDate = new Date();
    const daysUntilExpiry = expiresTomorrow ? 1 : 30;
    newExpireDate.setDate(newExpireDate.getDate() + daysUntilExpiry);
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
    const timeout = setTimeout(() => {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/getUser`, {
          userid: currentUserId,
        })
        .then((res) => {
          setCurrentUser({ ...res.data.user });
          setCanHaveUser(true);
        })
        .catch((error) => {
          console.log(error.response.data.err);
        });
    }, 500);

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

  return { currentUser, canHaveUser, logout, renewUid };
};
