import { useEffect, useState } from "react";
import { fetchOdds } from "../API/fetchOdds";
import "../stylesheets/App.scss";

function App() {
  const [odds, setOdds] = useState(null);

  useEffect(() => {
    const getOdds = async () => {
      const result = await fetchOdds("soccer_epl");

      if (result.success) {
        setOdds({ ...odds, soccer_epl: result.data });
      }

      if (result.error) {
        console.log("error");
      }
    };

    getOdds();
  }, []);

  if (!odds) {
    return null;
  }

  console.log(odds, "::odds");
  return (
    <ul>
      {odds["soccer_epl"].map(game => {
        return (
          <li>
            {game.home_team} vs {game.away_team}
          </li>
        );
      })}
    </ul>
  );
}

export default App;
