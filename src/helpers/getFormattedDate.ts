const getFormattedDate = (stringDate: string) => {
  const date = new Date(stringDate);
  const days = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  const month =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;

  return days + "/" + month + "/" + date.getFullYear();
};

export default getFormattedDate;
