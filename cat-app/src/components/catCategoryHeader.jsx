import { useState, useRef, useEffect } from "react";

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
} from "react-bootstrap";

import {Link} from "react-router-dom";

export default function CatCategoryHeader() {
  const [cateList, setCateList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/information")
      .then((res) => res.json())
      .then((cate) => {
        const min = 9;
        const max = 64;
        const randomCategory =
          Math.floor(Math.random() * (max - min + 1)) + min;
        const dta = cate.slice(randomCategory, randomCategory + 3)
        setCateList(dta);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      <Row>
        <h1>Best Seller:</h1>
      </Row>
      <Row
        xs={1}
        sm={2}
        md={3}
        lg={3}
        xl={3}
        xxl={3}
        style={{ marginBottom: "50px" }}
      >
        {cateList.map((catCard) => (
          <Col key={catCard.id}>
            <Card>
              <CardImg className="cat-card" src={catCard.url} style={{objectFit: 'fill', width: '100%', height: '350px'}}></CardImg>
              <CardBody>
                <CardTitle>{catCard.breeds[0].name}</CardTitle>
                <CardSubtitle>{catCard.height}$</CardSubtitle>
              </CardBody>
            </Card>
          </Col>
        ))}
        <Link to="/category">Show more</Link>
      </Row>
    </Container>
  );
}
