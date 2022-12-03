import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { getDate } from "../utils";

export function SportsCard(props) {
  const { sportsGame } = props;

  return (
    <Card>
      <Card.Body>
        <Row>
          <Card.Subtitle className="mb-2 text-muted">
            Game Date: {getDate(sportsGame.commence_time)}
          </Card.Subtitle>
          <Card.Text>
            {sportsGame.home_team}:{" "}
            {sportsGame.bookmakers[0].markets[0].outcomes[0].price}
          </Card.Text>
          <Card.Text>
            Draw: {sportsGame.bookmakers[0].markets[0].outcomes[2].price}
          </Card.Text>
          <Card.Text>
            {sportsGame.away_team}:{" "}
            {sportsGame.bookmakers[0].markets[0].outcomes[1].price}
          </Card.Text>
        </Row>
      </Card.Body>
    </Card>
  );
}
