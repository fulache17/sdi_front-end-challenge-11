import React, { useState, useEffect } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import downloadImage from './image/tmsph-launches-toyota-rentacar.png';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDate, setCurrentDate] = useState('');

  const maxPages = 57;
  const displayPages = 14;

  useEffect(() => {
    const date = new Date();
    const formattedDate = formatDate(date);
    setCurrentDate(formattedDate);
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const padZero = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    const ellipsis = <span className="ellipsis">...</span>;
    const totalPages = maxPages;

    let start = Math.max(1, currentPage - Math.floor(displayPages / 2));
    let end = Math.min(totalPages, start + displayPages - 1);

    if (end - start + 1 < displayPages) {
      start = Math.max(1, end - displayPages + 1);
    }

    if (currentPage > 1) {
      pages.push(
        <a
          key="prev"
          href="#"
          className="page-link"
          onClick={() => goToPage(currentPage - 1)}
        >
          &laquo;
        </a>
      );
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <a
          key={i}
          href="#"
          className={i === currentPage ? 'page-link active' : 'page-link'}
          onClick={() => goToPage(i)}
        >
          {i}
        </a>
      );
    }

    if (start > 1) {
      pages.splice(1, 0, ellipsis);
    }

    if (end < totalPages) {
      pages.push(ellipsis);
      pages.push(
        <a
          key="last"
          href="#"
          className="page-link"
          onClick={() => goToPage(totalPages)}
        >
          {totalPages}
        </a>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
        <a
          key="next"
          href="#"
          className="page-link"
          onClick={() => goToPage(currentPage + 1)}
        >
          &raquo;
        </a>
      );
    }

    return pages;
  };

  return (
    <div className="container">
      <div className="image-container">
        <img src={downloadImage} alt="Download" />
        <div className="share-icon">
          <FaShareAlt /> share
        </div>
        <p className="date">{currentDate}</p>
      </div>
      <p
        style={{
          color: 'red',
          textAlign: 'left',
          fontWeight: 'bold',
          fontSize: '14px',
        }}
      >
        Darwin Tumaneng
      </p>
      <h4>TMSPH launches Toyota Rent&#x3B1;Car</h4>

      <p style={{ fontSize: '14px' }}>
        Toyota Mobility Solutions Philippines, Inc. (TMSPH) marked another
        milestone in its first year of operations with the introduction of its
        new and exciting car rental service, the Toyota Rent&#x3B1;Car. This
        service provides affordable and secure transportation through its
        convenient and flexible car rental options – both for short-term and
        long-term use.
      </p>

      <button
        style={{
          textDecoration: 'underline',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
      >
        READ ARTICLE
      </button>
      <br />
      <div className="pagination">{renderPagination()}</div>
    </div>
  );
}

export default App;
