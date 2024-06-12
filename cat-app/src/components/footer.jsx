// Footer.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>Information about the company.</p>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <p>Email: contact@company.com</p>
            <p>Phone: +123 456 7890</p>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Instagram
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
