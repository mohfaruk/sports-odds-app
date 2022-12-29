import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import { footballIcons } from "../constants";
import { filterTeam, calculateOdds } from "../utils";

export function OddsModal(props) {
  const { activeGame } = props;

  if (!activeGame) {
    return null;
  }

  const homeTeam = activeGame.home_team;
  const awayTeam = activeGame.away_team;

  const homeFiltered = filterTeam(homeTeam);
  const awayFiltered = filterTeam(awayTeam);

  return (
    <Modal
      className="odds-modal"
      onHide={props.onHide}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <Image
            className="odds-modal__image"
            src={footballIcons[homeFiltered]}
            rounded
          />
          {homeTeam} vs.{" "}
          <Image
            className="odds-modal__image"
            src={footballIcons[awayFiltered]}
            rounded
          />{" "}
          {awayTeam}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Sports Odds</th>
              <th>{homeTeam}</th>
              <th>Draw</th>
              <th>{awayTeam}</th>
            </tr>
          </thead>
          <tbody>
            {activeGame.bookmakers.map(bookmaker => {
              return (
                <tr key={bookmaker.key}>
                  <td>{bookmaker.title}</td>
                  <td>
                    {calculateOdds(bookmaker.markets[0].outcomes[0].price)}
                  </td>
                  <td>
                    {calculateOdds(bookmaker.markets[0].outcomes[2].price)}
                  </td>
                  <td>
                    {calculateOdds(bookmaker.markets[0].outcomes[1].price)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
