import axios from "axios";

const uploadFile = async (
  file: File,
  name: string,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  appId: string
): Promise<void> => {
  const formData = new FormData();
  let url: string;

  formData.append("uploaded", file, `${name}.png`);
  formData.append("appid", appId);

  await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => (url = res.data.url))
    .catch((err) => setErrorMessage(err.response.data.err));
};

export default uploadFile;
