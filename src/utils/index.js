export const getDate = date => {
  const value = new Date(date);
  return `${
    value.getUTCMonth() + 1
  }-${value.getUTCDate()}-${value.getFullYear()}`;
};
