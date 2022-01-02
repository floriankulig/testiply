import { useAuthValue } from "context";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";

interface DevAuthorisationProps {
  children: React.ReactNode;
  serverSideDev?: boolean;
  serverSideLoggedIn?: boolean;
}

export const DevAuthorisation: React.FC<DevAuthorisationProps> = ({
  children,
  serverSideDev,
  serverSideLoggedIn,
}) => {
  const { currentUser, canHaveUser } = useAuthValue();
  const router = useRouter();

  useEffect(() => {
    if (canHaveUser) {
      if (!currentUser) router.push("/store");
      else if (!currentUser.isDev) router.push("/dev/upgrade");
    }
  }, [currentUser, canHaveUser]);

  return <Fragment>{children}</Fragment>;
};
