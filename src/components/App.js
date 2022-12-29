import { useEffect, useState } from "react";
import { fetchOdds } from "../API/fetchOdds";
import { sportsList } from "../constants";
import { SportsCard } from "./SportsCard";
import { OddsModal } from "./OddsModal";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";

import "../stylesheets/App.scss";

function App() {
  const [odds, setOdds] = useState(null);
  const [activeSport, setActiveSport] = useState("soccer_epl");
  const [activeGame, setActiveGame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getOdds = async () => {
      const result = await fetchOdds(activeSport);

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

  const showOdds = game => {
    setActiveGame(game);
    setShowModal(true);
  };

  console.log(odds, "::odds"); // logs odds
  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-2">
        <Container>
          <Navbar.Brand>Sports Bets List</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12} md={2}>
            <ListGroup>
              {sportsList.map(sport => {
                return (
                  <ListGroup.Item
                    key={sport.key}
                    as="button"
                    onClick={() => setActiveSport(sport.key)}
                    active={activeSport === sport.key}
                  >
                    {sport.view}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
          <Col xs={12} md={10}>
            {error ? (
              <h4>
                Sports Odds Not Available At Present. Please Check Back Later.
              </h4>
            ) : (
              <Row>
                {odds[activeSport] ? (
                  odds[activeSport].map(sportsGame => {
                    return (
                      <Col
                        key={sportsGame.id}
                        xs={12}
                        md={4}
                        className="mb-3 sports-grid-container"
                      >
                        <SportsCard
                          sportsGame={sportsGame}
                          showOdds={showOdds}
                        />
                      </Col>
                    );
                  })
                ) : (
                  <div>
                    Betting Odds For This Sport Is Not Available At This Time...
                  </div>
                )}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
      <OddsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        activeGame={activeGame}
      />
    </>
  );
}

export default App;
