import React from "react";
import "./style.css";
export default function Pagination({
  totalProduct,
  setCurrentPage,
  currentPage,
}: {
  totalProduct: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}) {
  const handleNext = () => {
    if (currentPage < Math.ceil(totalProduct / 10)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </button>
      {Array.from({ length: Math.ceil(totalProduct / 10) }, (_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={index + 1 === currentPage ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === Math.ceil(totalProduct / 10)}
      >
        Next
      </button>
    </div>
  );
}
