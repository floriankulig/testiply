import axios from "axios";
import { App } from "ts";

const getAppInfo = async (id: string): Promise<App> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/getApp?appid=${id}`
  );
  const returnData: App = {
    ...res.data.app,
    _id: id,
  };
  return returnData;
};

export default getAppInfo;
