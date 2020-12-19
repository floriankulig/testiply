import axios from "axios";

const postData = (url: string, data: Object): Promise<any> => {
  const promise = axios({
    method: "post",
    url: url,
    data: data,
  });

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

export default postData;
