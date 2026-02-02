import leftArrow from "../../assets/icons/left-arrow.svg";
import rightArrow from "../../assets/icons/right-arrow.svg";

import styles from "./Shop.module.css";

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const createPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 4) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = createPages();

  return (
    <div className={styles.pagination}>
      <div
        className={`${styles.button} ${styles.left}`}
        role="button"
        aria-label="Prev page"
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
      >
        <img src={leftArrow} alt="Left Arrow" />
      </div>

      <div className={styles.pages}>
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className={styles.dots}>
              ...
            </span>
          ) : (
            <div
              key={page}
              className={`${styles.page} ${
                currentPage === page ? styles.active : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </div>
          )
        )}
      </div>

      <div
        className={`${styles.button} ${styles.right}`}
        role="button"
        aria-label="Next page"
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
      >
        <img src={rightArrow} alt="Right Arrow" />
      </div>
    </div>
  );
}
