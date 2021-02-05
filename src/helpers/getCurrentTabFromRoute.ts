import { devTabNames, testerTabNames } from "ts/constants";

const getCurrentTabFromRoute = (pathname: string): string => {
  const pathArray = pathname.split("/");
  let tab: string;

  if (!pathArray[2] && pathArray[1] === "store") {
    tab = "today";
  } else if (
    testerTabNames.includes(pathArray[2]) ||
    devTabNames.includes(pathArray[2])
  ) {
    tab = pathArray[2];
  }

  return tab;
};

export default getCurrentTabFromRoute;
