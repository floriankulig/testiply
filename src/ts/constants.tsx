import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineAppstore,
  AiFillAppstore,
  AiOutlineDashboard,
  AiFillDashboard,
} from "react-icons/ai";
import { FaComment, FaRegComment, FaRegNewspaper } from "react-icons/fa";
import { HiOutlinePhotograph } from "react-icons/hi";
import { GiArchiveResearch } from "react-icons/gi";
import {
  IoGameControllerOutline,
  IoGameController,
  IoNewspaperOutline,
  IoNewspaper,
  IoFootballOutline,
  IoGlasses,
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
import { BsCreditCard, BsGraphUp } from "react-icons/bs";
import { Platform, Category } from ".";
import { GoPackage } from "react-icons/go";

export const platforms: Platform[] = [
  { displayName: "iOS", id: "ios" },
  { displayName: "Android", id: "android" },
  { displayName: "Windows", id: "windows" },
  { displayName: "MacOS", id: "macos" },
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
  {
    id: "lifestyle",
    displayName: "Lifestyle",
    icon: IoGlasses,
    color: "#58d130",
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
  {
    id: "medicine",
    displayName: "Medicine",
    icon: RiMedicineBottleLine,
    color: "#ff6be8",
  },
  { id: "news", displayName: "News", icon: FaRegNewspaper, color: "#8e8e93" },
  {
    id: "referenceBooks",
    displayName: "Reference Books",
    icon: GiArchiveResearch,
    color: "#73ce2d",
  },
  { id: "addons", displayName: "Addons", icon: GoPackage, color: "#f4ff32" },
  {
    id: "sport",
    displayName: "Sport",
    icon: IoFootballOutline,
    color: "#00cbff",
  },
  { id: "economy", displayName: "Economy", icon: BsGraphUp, color: "#b25803" },
];

export const testerTabNames = ["today", "apps", "games", "categories"];
export const testerTabIcons = [
  [<AiOutlineHome />, <AiFillHome />],
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
