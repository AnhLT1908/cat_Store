import React, { useState, useEffect } from "react";
import {
  Card,
  CardGroup,
  Col,
  Container,
  Image,
  Placeholder,
  Row,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPaw } from "@fortawesome/free-solid-svg-icons";

function FamoustCat() {
  const [catImages, setCatImages] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9999/information")
      .then((res) => res.json())
      .then((data) => {
        const limitData = data.slice(0, 8);
        console.log(limitData);
        setCatImages(limitData);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      <Row>
        <h1>Top famous cats:</h1>
      </Row>
      <Row>
        {catImages.map((catImg) => (
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={catImg.id}
            className="d-flex flex-column align-items-center mb-4"
          >
            <Image src={catImg.url} roundedCircle className="m-1" />
            <h3 style={{ textAlign: "center" }}>{catImg.breeds[0].name}</h3>
          </Col>
        ))}
      </Row>
      <Row className="d-flex align-items-center justify-content-center">
          <span className="line"></span>
          <FontAwesomeIcon icon={faPaw} />
          <span className="line"></span>
      </Row>
    </Container>
  );
}
export default FamoustCat;
