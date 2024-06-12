import React from "react";
import CarouselDisplay from "./carousel";
import FamoustCat from "./famoustCat";
import CatCategoryHeader from "./catCategoryHeader";

function Homepage() {
  return (
    <div>
      <CarouselDisplay />
      <FamoustCat />
      <CatCategoryHeader />
      {/* Add more components as needed */}
    </div>
  );
}

export default Homepage;
