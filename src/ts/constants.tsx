import {
  AiOutlineAppstore,
  AiFillAppstore,
  AiOutlineDashboard,
  AiFillDashboard,
} from "react-icons/ai";
import { FaComment, FaRegComment, FaRegNewspaper } from "react-icons/fa";
import { HiOutlinePhotograph } from "react-icons/hi";
import {
  IoGameControllerOutline,
  IoGameController,
  IoFootballOutline,
} from "react-icons/io5";
import {
  RiStackLine,
  RiStackFill,
  RiBook2Line,
  RiPencilLine,
  RiMusicLine,
  RiTimerLine,
  RiNotification2Line,
  RiTv2Line,
  RiPlaneLine,
  RiSunFoggyLine,
  RiCodeSSlashLine,
  RiHeart2Line,
  RiMedicineBottleLine,
  RiToolsLine,
} from "react-icons/ri";
import { BsCreditCard } from "react-icons/bs";
import { Platform, Category } from ".";
import { GoPackage } from "react-icons/go";
import { FiLock } from "react-icons/fi";
import { Variants } from "framer-motion";

export const platforms: Platform[] = [
  { displayName: "iOS", id: "ios" },
  { displayName: "Android", id: "android" },
  { displayName: "Windows", id: "windows" },
  { displayName: "iPadOS", id: "ipados" },
  { displayName: "Linux", id: "linux" },
  { displayName: "All", id: "all" },
];

export const categories: Category[] = [
  {
    id: "education",
    displayName: "Education",
    icon: RiBook2Line,
    color: "#49497c",
  },
  {
    id: "finances",
    displayName: "Finance",
    icon: BsCreditCard,
    color: "#ffd400",
  },
  {
    id: "graphicsAndDesign",
    displayName: "Graphics And Design",
    icon: RiPencilLine,
    color: "#e0269c",
  },
  { id: "music", displayName: "Music", icon: RiMusicLine, color: "#02ff41" },
  {
    id: "productivity",
    displayName: "Productivity",
    icon: RiTimerLine,
    color: "#0a84ff",
  },
  {
    id: "socialMedia",
    displayName: "Social Media",
    icon: RiNotification2Line,
    color: "#c6116c",
  },
  {
    id: "entertainment",
    displayName: "Entertainment",
    icon: RiTv2Line,
    color: "#ff1d11",
  },
  {
    id: "utilities",
    displayName: "Utilities",
    icon: RiToolsLine,
    color: "#2c2c2e",
  },
  {
    id: "photoAndVideo",
    displayName: "Photo and Video",
    icon: HiOutlinePhotograph,
    color: "#fc6602",
  },
  { id: "travel", displayName: "Travel", icon: RiPlaneLine, color: "#99f9ff" },
  {
    id: "games",
    displayName: "Games",
    icon: IoGameControllerOutline,
    color: "#b608c9",
  },
  {
    id: "weather",
    displayName: "Weather",
    icon: RiSunFoggyLine,
    color: "#f2ff00",
  },
  {
    id: "developerTools",
    displayName: "Developer Tools",
    icon: RiCodeSSlashLine,
    color: "#394647",
  },
  {
    id: "healthAndFitness",
    displayName: "Health And Fitness",
    icon: RiHeart2Line,
    color: "#00fff0",
  },
  { id: "news", displayName: "News", icon: FaRegNewspaper, color: "#8e8e93" },
  { id: "addons", displayName: "Addons", icon: GoPackage, color: "#f4ff32" },
  {
    id: "sport",
    displayName: "Sport",
    icon: IoFootballOutline,
    color: "#00cbff",
  },
];

export const testerTabNames = ["today", "apps", "games", "categories"];
export const testerTabIcons = [
  // [<AiOutlineHome />, <AiFillHome />],
  [<FiLock />, <FiLock />],
  [<AiOutlineAppstore />, <AiFillAppstore />],
  [<IoGameControllerOutline />, <IoGameController />],
  [<RiStackLine />, <RiStackFill />],
];

export const devTabNames = ["dashboard", "apps", "feedback"];
export const devTabIcons = [
  [<AiOutlineDashboard />, <AiFillDashboard />],
  [<AiOutlineAppstore />, <AiFillAppstore />],
  [<FaRegComment />, <FaComment />],
];

export const fadeInOutVariants: Variants = {
  open: {
    opacity: 1,
  },
  closed: { opacity: 0 },
};
