import axios from "axios";
import { App } from "ts";

const getAppInfo = async (id: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/getApp?appid=${id}`
  );
  const returnData: App = {
    ...res.data.app,
    screenshots: ["0.webp", "1.webp", "2.webp", "3.webp"],
    _id: id,
  };
  return returnData;
};

export default getAppInfo;
