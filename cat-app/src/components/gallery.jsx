import { Col, Container, Row, Image, Modal, Button } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import {} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import rightTop from "../images/bgRightTop.png";
import rightMid from "../images/bgRightMid.png";
import rightBot from "../images/bgRightBot.png";
import leftTop from "../images/bgLeftTop.png";
import leftMid from "../images/bgLeftMid.png";
import leftBot from "../images/bgLeftBot.png";

const Gallery = () => {
  const [show, setShow] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [urlImage, setUrlImage] = useState(null);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    fetch("http://localhost:9999/gallery")
      .then((res) => res.json())
      .then((allGallery) => {
        console.log(allGallery);
        setAllImages(allGallery);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleShow = (e, src) => {
    e.preventDefault();
    setUrlImage(src);
    setShow(true);
  };

  return (
    <Container fluid>
      <link
        href="https://fonts.googleapis.com/css2?family=Just+Another+Hand&display=swap"
        rel="stylesheet"
      />
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
          <Row>
            <Col>
              <h1 className="mt-3" style={{ fontFamily: "Just Another Hand, cursive", fontSize: '75px' }}>Our Gallery: </h1>
            </Col>
          </Row>
          <Row>
            {allImages.map((allImage) => (
              <Col key={allImage.id} xs={12} sm={6} md={4} lg={4}>
                <Image
                  src={allImage.url}
                  onClick={(e) => handleShow(e, allImage.url)}
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    height: "300px",
                    margin: "15px 0",
                  }}
                />
              </Col>
            ))}
          </Row>
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <Image src={urlImage} fluid />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
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
};
export default Gallery;
