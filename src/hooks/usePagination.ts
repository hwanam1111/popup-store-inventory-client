import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

export default (defaultPage: number) => {
  const [page, setPage] = useState<number>(defaultPage);
  const {
    asPath,
    query,
    query: { page: currentPage },
  } = useRouter();

  useEffect(() => {
    setPage(Number(currentPage) || 1);
  }, [currentPage]);

  const onChangePage = (changedPage: number) => {
    const excludePageQueries = Object.keys(query).filter((key) => key !== 'page');

    if (currentPage) {
      Router.push(asPath.replace(`page=${currentPage}`, `page=${changedPage}`));
    }

    // 항상 query에 country가 있기때문에 1부터 측정
    if (!currentPage && excludePageQueries.length === 1) {
      Router.push(`${asPath}?page=${changedPage}`);
    }
    if (!currentPage && excludePageQueries.length > 1) {
      Router.push(`${asPath}&page=${changedPage}`);
    }
  };

  return [page, onChangePage, setPage] as const;
};
