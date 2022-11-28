import axios from "axios";

const options = key => {
  return {
    method: "GET",
    url: "https://odds.p.rapidapi.com/v4/sports/soccer_epl/odds",
    params: {
      sport: key,
      regions: "uk",
      oddsFormat: "decimal",
      //oddsFormat: "american",
      markets: "h2h,spreads",
      dateFormat: "iso",
    },
    headers: {
      "X-RapidAPI-Key": "77a9ffa732mshd0cdd33fc94ceb0p1e8b61jsn321cfb09b499",
      "X-RapidAPI-Host": "odds.p.rapidapi.com",
    },
  };
};

export const fetchOdds = async key => {
  const fetchOptions = options(key);

  try {
    const result = await axios.request(fetchOptions);
    return {
      success: true,
      data: result.data,
    };
  } catch (e) {
    return {
      error: true,
      data: e,
    };
  }
};
