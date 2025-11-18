import React from "react";
import { Button } from "react-bootstrap";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import "./Datatable.css";

type PaginationProps = {
  itemsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  setCurrentPage,
  currentPage,
  setItemsPerPage,
  totalPages,
}) => {
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const generatePaginationButtons = (): number[] => {
    const visibleButtons = 5;
    const totalButtons = Math.min(visibleButtons, totalPages);

    let startPage = Math.max(currentPage - Math.floor(totalButtons / 2), 1);
    const endPage = startPage + totalButtons - 1;

    if (endPage > totalPages) {
      startPage = Math.max(totalPages - totalButtons + 1, 1);
    }

    return Array.from({ length: totalButtons }, (_, index) => startPage + index);
  };

  return (
    <div className="pagination-wrapper">
      {/* Row Per Page */}
      <div className="items-per-page">
        <span className="label">Rows:</span>
        <select
          className="items-select"
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}
        >
          {[10, 25, 50, 100].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {/* Pagination */}
      <ul className="pagination-list">
        {/* First Page */}
        <li>
          <button
            className="nav-btn"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            <BiChevronsLeft />
          </button>
        </li>

        {/* Prev */}
        <li>
          <button
            className="nav-btn"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>
        </li>

        {/* Page Numbers */}
        {generatePaginationButtons().map((page) => (
          <li key={page}>
            <button
              className={`page-btn ${page === currentPage ? "active" : ""}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Next */}
        <li>
          <button
            className="nav-btn"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>

        {/* Last */}
        <li>
          <button
            className="nav-btn"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            <BiChevronsRight />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
