// converts date to dashed format
export const getDate = date => {
  const value = new Date(date);
  return `${
    value.getUTCMonth() + 1
  }-${value.getUTCDate()}-${value.getFullYear()}`;
};

// formats team name to match JSON data
export const filterTeam = team => {
  return team
    .toLowerCase() // changes to lowercase
    .trim() // trim string
    .split(/\s+/) // get rids of blank
    .join("_"); // joins with underscore
};
