const getFormattedDate = (date: Date) =>
  date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

export default getFormattedDate;
