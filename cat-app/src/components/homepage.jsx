import React from "react";
import CarouselDisplay from "./carousel";
import FamoustCat from "./famoustCat";
import CatCategoryHeader from "./catCategoryHeader";
import { Container, Row, Col, Image } from "react-bootstrap";
import rightTop from "../images/bgRightTop.png";
import rightMid from "../images/bgRightMid.png";
import rightBot from "../images/bgRightBot.png";
import leftTop from "../images/bgLeftTop.png";
import leftMid from "../images/bgLeftMid.png";
import leftBot from "../images/bgLeftBot.png";

function Homepage() {
  return (
    <Container fluid style={{padding: '0px 0px'}}>
      <link
        href="https://fonts.googleapis.com/css2?family=Just+Another+Hand&display=swap"
        rel="stylesheet"
      />
      <CarouselDisplay />
      <Row>
        <Col
          lg={2}
          style={{ padding: "0px 0px" }}
          className="d-flex flex-column justify-content-between"
        >
          <Image src={rightTop} style={{ width: "80%" }} />
          <Image src={rightMid} style={{ width: "80%" }} />
          <Image src={rightBot} style={{ width: "80%" }} />
        </Col>
        <Col lg={8}>
          <FamoustCat />
          <CatCategoryHeader />
        </Col>
        <Col
          lg={2}
          style={{ padding: "0px 0px" }}
          className="d-flex flex-column justify-content-between align-items-end"
        >
          <Image src={leftTop} style={{ width: "80%" }} />
          <Image src={leftMid} style={{ width: "80%" }} />
          <Image src={leftBot} style={{ width: "80%" }} />
        </Col>
      </Row>
    </Container>
  );
}

export default Homepage;
