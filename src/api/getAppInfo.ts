import axios from "axios";
import { App } from "ts";
import { api_url } from "ts/constants";

const getAppInfo = async (id: string) => {
  const res = await axios.get(`${api_url}/appInfo?id=${id}`);
  const screenshots = await axios.get(
    `https://media.beta-app-store.com/apps/screenshots/${id}/config.json`
  );

  const returnType: App = {
    ...res.data,
    screenshots: [...screenshots.data],
    _id: id,
  };
  return returnType;
};

export default getAppInfo;
