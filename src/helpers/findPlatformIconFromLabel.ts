import { AiOutlineApple } from "react-icons/ai";
import { IoIosGlobe } from "react-icons/io";
import { IconType } from "react-icons/lib";

const findPlatformIconFromLabel = (label: string): IconType =>
  label.startsWith("i") && label.endsWith("OS")
    ? AiOutlineApple
    : label === "Web"
    ? IoIosGlobe
    : null;

export default findPlatformIconFromLabel;
