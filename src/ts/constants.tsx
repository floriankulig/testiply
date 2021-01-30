import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineAppstore,
  AiFillAppstore,
  AiOutlineDashboard,
  AiFillDashboard,
} from 'react-icons/ai';
import { FaComment, FaRegComment } from 'react-icons/fa';
import {
  IoGameControllerOutline,
  IoGameController,
  IoNewspaperOutline,
  IoNewspaper,
} from 'react-icons/io5';
import { RiStackLine, RiStackFill } from 'react-icons/ri';

export const testerTabNames = ['today', 'apps', 'games', 'categories', 'news'];
export const testerTabIcons = [
  [<AiOutlineHome />, <AiFillHome />],
  [<AiOutlineAppstore />, <AiFillAppstore />],
  [<IoGameControllerOutline />, <IoGameController />],
  [<RiStackLine />, <RiStackFill />],
  [<IoNewspaperOutline />, <IoNewspaper />]
];

export const devTabNames = ['dashboard', 'apps', 'feedback'];
export const devTabIcons = [
  [<AiOutlineDashboard />, <AiFillDashboard />],
  [<AiOutlineAppstore />, <AiFillAppstore />],
  [<FaRegComment />, <FaComment />]
];

export const api_url = "https://api.beta-app-store.com"
