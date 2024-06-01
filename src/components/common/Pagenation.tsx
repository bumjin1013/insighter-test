import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPrevPage: () => void;
  goToNextPage: () => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  goToPrevPage,
  goToNextPage,
}: PaginationProps) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
    >
      <button
        onClick={goToPrevPage}
        disabled={currentPage === 1}
        style={{ background: "black", color: "white", padding: "8px" }}
      >
        {"<"}
      </button>
      <span style={{ margin: "0 16px" }}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        style={{ background: "black", color: "white", padding: "8px" }}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
