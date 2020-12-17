const postData = async (url: string, data) => {
  const response = await fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "test@",
    }),
  });

  return response;
};

export default postData;
