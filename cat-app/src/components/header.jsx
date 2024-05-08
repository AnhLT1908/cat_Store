import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Header = () => {
  return (
    <Container className="nav" fluid style={{ marginTop: "5px" }}>
      <Row style={{ backgroundColor: "gray" }}>
        <Col
          md={12}
          className="nav-content"
          style={{ backgroundColor: "gray" }}
        >
          ha
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
