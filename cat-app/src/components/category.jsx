import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardImg,
  Col,
  Container,
  Row,
  CardTitle,
  CardText,
  ProgressBar,
  CardSubtitle,
  Button,
  CardFooter,
  CardHeader,
  Form,
  Pagination,
  FormGroup,
  FormCheck,
} from "react-bootstrap";

const CatCategory = () => {
  const [catCard, setCatCard] = useState([]);
  const [catCardNotRandom, setCatCardNotRandom] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [catFilter, setCatFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState(null);
  const cardsPerPage = 6;

  // Fetch data and shuffle it on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9999/category");
        const data = await response.json();
        setCatCard(shuffleArray(data));
        setCatCardNotRandom(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Shuffles the array
  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  // Handles page change
  const handlePageChange = (number) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentPage(number);
      setTransitioning(false);
    }, 500);
  };

  // Handles filter change
  const handleFilterChange = (e) => {
    const filter = e.target.id;
    setCatFilter(filter);
    setSortOrder(null); // Reset sort order when changing filter
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  // Handles sorting by price
  const handleSortChange = (order) => {
    setSortOrder(order);
    setCurrentPage(1); // Reset to the first page when sort order changes
  };

  // Get filtered and sorted cards
  const getFilteredAndSortedCards = () => {
    let filteredCards =
      catFilter === "All" ? catCardNotRandom : catCardNotRandom.filter((card) => card.breeds[0].name === catFilter);

    if (sortOrder === "Ascending") {
      filteredCards = filteredCards.sort((a, b) => a.height - b.height);
    } else if (sortOrder === "Descending") {
      filteredCards = filteredCards.sort((a, b) => b.height - a.height);
    }

    return filteredCards;
  };

  // Pagination logic
  const filteredCards = getFilteredAndSortedCards();
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredCards.length / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Cat category</h1>
        </Col>
      </Row>
      <Row>
        <Col md={3} lg={2}>
          {/* Filter Section */}
          <h3>Sort by Category</h3>
          <Form>
            <div className="mb-3">
              <FormCheck
                type="radio"
                label="All"
                name="catFilter"
                id="All"
                checked={catFilter === "All"}
                onChange={handleFilterChange}
              />
              {/* Dynamic Filter Radio Buttons */}
              {[...new Set(catCardNotRandom.map((cat) => cat.breeds[0].name))].map((filterName, index) => (
                <FormCheck
                  key={index}
                  type="radio"
                  label={filterName}
                  name="catFilter"
                  id={filterName}
                  checked={catFilter === filterName}
                  onChange={handleFilterChange}
                />
              ))}
            </div>
          </Form>
          <h3>Sort by Price</h3>
          <Form>
            <div className="mb-3">
              <FormCheck
                type="radio"
                label="Ascending"
                name="sortOrder"
                id="Ascending"
                checked={sortOrder === "Ascending"}
                onChange={() => handleSortChange("Ascending")}
              />
              <FormCheck
                type="radio"
                label="Descending"
                name="sortOrder"
                id="Descending"
                checked={sortOrder === "Descending"}
                onChange={() => handleSortChange("Descending")}
              />
            </div>
          </Form>
        </Col>
        <Col md={9} lg={10}>
          <Row>
            {/* Render Cards */}
            {currentCards.map((category) => (
              <Col key={category.id} lg={2}>
                <Card
                  className={`mb-3 ${
                    transitioning ? "card-exit" : "card-enter"
                  }`}
                >
                  <CardImg
                    variant="top"
                    src={category.url}
                    style={{
                      width: "100%",
                      height: "350px",
                      objectFit: "fill",
                    }}
                  />
                  <CardHeader>
                    <CardTitle>{category.breeds[0].name}</CardTitle>
                    <CardSubtitle>Price: {category.height}$</CardSubtitle>
                  </CardHeader>
                  <CardBody>
                    <CardText>
                      <label htmlFor="adaptability">Adaptability</label>
                      <ProgressBar
                        id="adaptability"
                        variant="success"
                        now={category.breeds[0].adaptability * 10}
                      />
                      <label htmlFor="stranger_friendly">
                        Stranger Friendly
                      </label>
                      <ProgressBar
                        id="stranger_friendly"
                        variant="info"
                        now={category.breeds[0].stranger_friendly * 10}
                      />
                      <label htmlFor="shedding_level">Shedding Level</label>
                      <ProgressBar
                        id="shedding_level"
                        variant="warning"
                        now={category.breeds[0].shedding_level * 10}
                      />
                      <label htmlFor="intelligence">Intelligence</label>
                      <ProgressBar
                        id="intelligence"
                        variant="danger"
                        now={category.breeds[0].intelligence * 10}
                      />
                    </CardText>
                  </CardBody>
                  <CardFooter>
                    <Button variant="primary">Buy Now!</Button>
                  </CardFooter>
                </Card>
              </Col>
            ))}
          </Row>
          {/* Pagination */}
          <Row>
            <Col>
              <Pagination>
                {pageNumbers.map((number) => (
                  <Pagination.Item
                    key={number}
                    onClick={() => handlePageChange(number)}
                  >
                    {number}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CatCategory;
