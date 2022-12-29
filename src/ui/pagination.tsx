import React from 'react';
import PaginationItem from 'react-js-pagination';

import PaginationStyles from '@styles/pagination';

interface PaginationProps {
  page: number;
  totalItemCount: number;
  maxPageItemCount: number;
  onChangePage: (page: number) => void;
}

function Pagination({ page, onChangePage, totalItemCount, maxPageItemCount }: PaginationProps) {
  return (
    <>
      <PaginationStyles />
      <PaginationItem
        activePage={page}
        itemsCountPerPage={maxPageItemCount}
        totalItemsCount={totalItemCount}
        pageRangeDisplayed={5}
        prevPageText="‹"
        nextPageText="›"
        onChange={onChangePage}
      />
    </>
  );
}

export default Pagination;
