import React from "react";
import { UilApps } from "@iconscout/react-unicons";
import { useSearchParams } from "react-router-dom";

const Category = ({ id, title, isActiveButton, setButtonId, buttonId }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategoryClick = () => {
    setSearchParams({ category: id });
    setButtonId(buttonId);
  };

  return (
      <div
          onClick={handleCategoryClick}
          className={`category-card ${
              isActiveButton(buttonId) ? "active" : "inactive"
          }`}
      >
        {/*<UilApps size="32" color={isActiveButton(buttonId) ? "#ff9800" : "#757575"} />*/}
        <span className="category-title">{title}</span>
      </div>
  );
};

export default Category;
