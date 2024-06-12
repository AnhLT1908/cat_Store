import { Col, Container, Row, Image, Modal, Button } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import {} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

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
    <Container>
      <Row>
        <h1>Our Gallery: </h1>
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
    </Container>
  );
};
export default Gallery;
