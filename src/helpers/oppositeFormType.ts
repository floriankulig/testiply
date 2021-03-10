import { FormType } from "ts";

const oppositeFormType = (initial: FormType): FormType => {
  if (initial === "login") return "register";
  else if (initial.includes("register")) return "login";
};

export default oppositeFormType;
