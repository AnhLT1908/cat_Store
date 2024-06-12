import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import Cat1 from "../images/c1.jpg";
import Cat2 from "../images/c8.jpg";
import Cat3 from "../images/c9.jpg";
import Cat4 from "../images/c12.jpg";

function CarouselDisplay() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img className="img-fluid w-100" src={Cat1} alt="First slide" />
        <Carousel.Caption>
            <h3>Munchkin Cat</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="img-fluid w-100" src={Cat2} alt="Second slide" />
        <Carousel.Caption>
            <h3>Scottish Fold Cat</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Cat3} alt="Third slide" />
        <Carousel.Caption>
            <h3>Maine Coon Cat</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Cat4} alt="Fourth slide" />
        <Carousel.Caption>
            <h3>Persian Longhair Cat</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselDisplay;
