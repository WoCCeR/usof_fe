import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MaxPagePostCount } from "../config";

const PageList = ({ postsLength, totalPages }) => {
  const pagesOffset = 2; // Number of pages shown around the selected page
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPage, setSelectedPage] = useState(
      parseInt(searchParams.get("page")) || 1
  );

  const updatePageList = (pageNumber) => {
    if (pageNumber === selectedPage) return; // Avoid unnecessary updates
    searchParams.set("page", pageNumber);
    setSearchParams(searchParams);
    setSelectedPage(pageNumber);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [selectedPage]);

  if (postsLength < MaxPagePostCount || totalPages <= 1) {
    return null; // No pagination required
  }

  const renderPages = () => {
    const pages = [];
    const minPage = Math.max(1, selectedPage - pagesOffset);
    const maxPage = Math.min(totalPages, selectedPage + pagesOffset);

    // Add the first page and ellipsis if necessary
    if (minPage > 1) {
      pages.push(renderPageButton(1));
      if (minPage > 2) pages.push(renderEllipsis("start"));
    }

    // Render pages around the selected page
    for (let i = minPage; i <= maxPage; i++) {
      pages.push(renderPageButton(i));
    }

    // Add ellipsis and last page if necessary
    if (maxPage < totalPages) {
      if (maxPage < totalPages - 1) pages.push(renderEllipsis("end"));
      pages.push(renderPageButton(totalPages));
    }

    return pages;
  };

  const renderPageButton = (pageNumber) => (
      <button
          key={pageNumber}
          className={`page ${selectedPage === pageNumber ? "selected" : ""}`}
          onClick={() => updatePageList(pageNumber)}
          disabled={selectedPage === pageNumber}
      >
        <span>{pageNumber}</span>
      </button>
  );

  const renderEllipsis = (key) => (
      <span key={key} className="ellipsis">
      ...
    </span>
  );

  return <div className="pageList">{renderPages()}</div>;
};

export default PageList;
