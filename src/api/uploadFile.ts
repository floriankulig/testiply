import axios from "axios";

const uploadFile = (
  file: File,
  i: number,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  appId: string
): Promise<string> =>
  new Promise<string>((res, rej) => {
    const formData = new FormData();
    let url: string;

    formData.append("uploaded", file, `${i + 1}.png`);
    formData.append("appid", appId);

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => (url = res.data.url))
      .catch((err) => setErrorMessage(err.response.data.err));
    return url;
  });

export default uploadFile;
