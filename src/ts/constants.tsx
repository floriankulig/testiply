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
  "ios",
  "android",
  "windows",
  "macos",
  "linux",
  "all",
];

export const categories: Category[] = [
  { id: "education", displayName: "Education", icon: RiBook2Line },
  { id: "finances", displayName: "Finance", icon: BsCreditCard },
  {
    id: "graphicsAndDesign",
    displayName: "Graphics And Design",
    icon: RiPencilLine,
  },
  { id: "music", displayName: "Music", icon: RiMusicLine },
  { id: "productivity", displayName: "Productivity", icon: RiTimerLine },
  { id: "socialMedia", displayName: "Social Media", icon: RiNotification2Line },
  { id: "entertainment", displayName: "Entertainment", icon: RiTv2Line },
  { id: "utilities", displayName: "Utilities", icon: RiToolsLine },
  {
    id: "photoAndVideo",
    displayName: "Photo and Video",
    icon: HiOutlinePhotograph,
  },
  { id: "lifestyle", displayName: "Lifestyle", icon: IoGlasses },
  { id: "travel", displayName: "Travel", icon: RiPlaneLine },
  { id: "games", displayName: "Games", icon: IoGameControllerOutline },
  { id: "weather", displayName: "Weather", icon: RiSunFoggyLine },
  {
    id: "developerTools",
    displayName: "Developer Tools",
    icon: RiCodeSSlashLine,
  },
  {
    id: "healthAndFitness",
    displayName: "Health And Fitness",
    icon: RiHeart2Line,
  },
  { id: "medicine", displayName: "Medicine", icon: RiMedicineBottleLine },
  { id: "news", displayName: "News", icon: FaRegNewspaper },
  {
    id: "referenceBooks",
    displayName: "Reference Books",
    icon: GiArchiveResearch,
  },
  { id: "addons", displayName: "Addons", icon: GoPackage },
  { id: "sport", displayName: "Sport", icon: IoFootballOutline },
  { id: "economy", displayName: "Economy", icon: BsGraphUp },
];

export const testerTabNames = ["today", "apps", "games", "categories", "news"];
export const testerTabIcons = [
  [<AiOutlineHome />, <AiFillHome />],
  [<AiOutlineAppstore />, <AiFillAppstore />],
  [<IoGameControllerOutline />, <IoGameController />],
  [<RiStackLine />, <RiStackFill />],
  [<IoNewspaperOutline />, <IoNewspaper />],
];

export const devTabNames = ["dashboard", "apps", "feedback"];
export const devTabIcons = [
  [<AiOutlineDashboard />, <AiFillDashboard />],
  [<AiOutlineAppstore />, <AiFillAppstore />],
  [<FaRegComment />, <FaComment />],
];

export const api_url = "https://api.beta-app-store.com";
