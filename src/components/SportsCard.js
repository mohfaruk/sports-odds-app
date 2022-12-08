import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { PatchMinus } from "react-bootstrap-icons";
import Image from "react-bootstrap/Image";
import { footballIcons } from "../constants";
import { getDate, filterTeam } from "../utils";
import "../stylesheets/SportsCard.scss";

export function SportsCard(props) {
  const { sportsGame, showOdds } = props;

  const homeTeam = sportsGame.home_team;
  const awayTeam = sportsGame.away_team;

  const homeFiltered = filterTeam(homeTeam);
  const awayFiltered = filterTeam(awayTeam);

  return (
    <Card className="sports-card">
      <Card.Body>
        <Row>
          <Card.Subtitle className="mb-2 text-muted">
            Game Date: {getDate(sportsGame.commence_time)}
          </Card.Subtitle>
          <Card.Text>
            <Image
              className="sports-card__image"
              src={footballIcons[homeFiltered]}
              rounded
            />
            {homeTeam}: {sportsGame.bookmakers[0].markets[0].outcomes[0].price}
          </Card.Text>
          <Card.Text>
            <PatchMinus className="sports-card__draw" size={25} /> Draw:{" "}
            {sportsGame.bookmakers[0].markets[0].outcomes[2].price}
          </Card.Text>
          <Card.Text>
            <Image
              className="sports-card__image"
              src={footballIcons[awayFiltered]}
              rounded
            />
            {awayTeam}: {sportsGame.bookmakers[0].markets[0].outcomes[1].price}
          </Card.Text>
          <Card.Text>
            <Button
              className="sports-card__see-more-odds"
              variant="link"
              onClick={() => showOdds(sportsGame)}
            >
              Check out more odds
            </Button>
          </Card.Text>
        </Row>
      </Card.Body>
    </Card>
  );
}
