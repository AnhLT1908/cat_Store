import { useState, useRef, useEffect, useContext } from "react";

import {
  Card,
  CardBody,
  CardGroup,
  CardImg,
  CardSubtitle,
  CardTitle,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faArrowRightLong,
  faArrowRightToBracket,
  faClose,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { UserContext } from "./userContext";

export default function CatCategoryHeader() {
  const [cateList, setCateList] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:9999/information")
      .then((res) => res.json())
      .then((cate) => {
        const min = 9;
        const max = 64;
        const randomCategory =
          Math.floor(Math.random() * (max - min + 1)) + min;
        const dta = cate.slice(randomCategory, randomCategory + 3);
        setCateList(dta);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      <link
        href="https://fonts.googleapis.com/css2?family=Just+Another+Hand&display=swap"
        rel="stylesheet"
      />
      <Row>
        <h1
          style={{ fontFamily: "Just Another Hand, cursive", fontSize: "75px" }}
        >
          Best Seller:
        </h1>
      </Row>
      <Row xs={1} sm={2} md={3} lg={3} xl={3} xxl={3}>
        {cateList.map((catCard) => (
          <Col key={catCard.id}>
            <Card>
              <CardImg
                className="cat-card"
                src={catCard.url}
                style={{ objectFit: "fill", width: "100%", height: "350px" }}
              ></CardImg>
              <CardBody>
                <CardTitle>{catCard.breeds[0].name}</CardTitle>
                <CardSubtitle>{catCard.height}$</CardSubtitle>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        {user ? (
          <Col>
            <Link to="/category" style={{ textDecoration: "none" }}>
              <button
                className="button-74 d-flex align-items-center"
                style={{
                  fontFamily: "Just Another Hand, cursive",
                  fontSize: "30px",
                  margin: "20px 0",
                  borderRadius: "20px",
                  backgroundColor: "#fbeee0",
                  boxShadow: '#422800 4px 4px 0 0',
                }}
              >
                Show More
                <FontAwesomeIcon icon={faArrowRightLong} className="ml-2" />
              </button>
            </Link>
          </Col>
        ) : (
          <Col>
            <Link to="/unauthenticated" style={{ textDecoration: "none" }}>
              <button
                className="button-74 d-flex align-items-center"
                style={{
                  fontFamily: "Just Another Hand, cursive",
                  fontSize: "30px",
                  margin: "20px 0",
                  borderRadius: "20px",
                  backgroundColor: "#fbeee0",
                  boxShadow: '#422800 4px 4px 0 0',
                }}
              >
                Show More
                <FontAwesomeIcon icon={faArrowRightLong} className="ml-2" />
              </button>
            </Link>
          </Col>
        )}
      </Row>
    </Container>
  );
}
