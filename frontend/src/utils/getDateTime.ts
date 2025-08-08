export const getDate = (separator = ".") => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`;
};
export const getTime = (separator = ":") => {
  let newDate = new Date();
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();
  return `${hours < 10 ? `0${hours}` : `${hours}`}${separator}${minutes < 10 ? `0${minutes}` : `${minutes}`}`;
};
