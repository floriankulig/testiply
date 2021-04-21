import axios from "axios";

const setAPIHeaders = (): void => {
  axios.defaults.headers.common["api_key"] = process.env.NEXT_PUBLIC_API_KEY;
};

export default setAPIHeaders;
