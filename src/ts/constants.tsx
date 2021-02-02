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
import { Platform, Category } from '.';

export const platforms: Platform[] = [
  'ios',
  'android',
  'windows',
  'macOS',
  'linux',
  'all',
];

export const categories: Category[] = [
  { id: 'education', displayName: 'Education' },
  { id: 'finances', displayName: 'Finances' },
  { id: 'graphicsAndDesign', displayName: 'Graphics and Design' },
  { id: 'music', displayName: 'Music' },
  { id: 'productivity', displayName: 'Productivity' },
  { id: 'socialMedia', displayName: 'Social Media' },
  { id: 'entertainment', displayName: 'Entertainment' },
  { id: 'utilities', displayName: 'Utilities' },
  { id: 'photoAndVideo', displayName: 'Photo and Video' },
  { id: 'lifestyle', displayName: 'Lifestyle' },
  { id: 'news', displayName: 'News' },
  { id: 'travel', displayName: 'Travel' },
  { id: 'games', displayName: 'Games' },
  { id: 'weather', displayName: 'Weather' },
  { id: 'developerTools', displayName: 'Developer Tools' },
  { id: 'healthAndFitness', displayName: 'Health and fitness' },
  { id: 'medicine', displayName: 'Medicine' },
  { id: 'referenceBooks', displayName: 'Reference Books' },
  { id: 'addons', displayName: 'Addons' },
  { id: 'sport', displayName: 'Sport' },
  { id: 'economy', displayName: 'Economy' },
];

export const testerTabNames = ['today', 'apps', 'games', 'categories', 'news'];
export const testerTabIcons = [
  [<AiOutlineHome />, <AiFillHome />],
  [<AiOutlineAppstore />, <AiFillAppstore />],
  [<IoGameControllerOutline />, <IoGameController />],
  [<RiStackLine />, <RiStackFill />],
  [<IoNewspaperOutline />, <IoNewspaper />],
];

export const devTabNames = ['dashboard', 'apps', 'feedback'];
export const devTabIcons = [
  [<AiOutlineDashboard />, <AiFillDashboard />],
  [<AiOutlineAppstore />, <AiFillAppstore />],
  [<FaRegComment />, <FaComment />],
];

export const api_url = 'https://api.beta-app-store.com';
