import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const TableScroll = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
`;

const TableBlock = styled.table`
  width: 100%;
`;

const TableHeader = styled.thead`
  border-bottom: 1px solid ${({ theme }) => theme.color.G20};
`;

const TableHeaderItem = styled.th`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.G80};
  font-weight: 500;
  padding: 1.5rem 0.875rem;
  display: table-cell;
`;

const TableBody = styled.tbody``;

const TableStyled = createGlobalStyle`
  table tr {}

  table td {
    font-size: 0.825rem;
    color: ${({ theme }) => theme.color.G70};
    padding: 1.5rem 0.875rem;
    border-bottom: 1px solid ${({ theme }) => theme.color.G20};
    vertical-align: middle;
  }
`;

interface TableProps {
  children: React.ReactNode;
  th: (string | boolean)[];
}

function Table({ children, th }: TableProps) {
  return (
    <TableScroll>
      <TableBlock>
        <TableStyled />
        <TableHeader>
          <tr>
            {th
              .filter((thName) => thName !== false)
              .map((thName) => (
                <TableHeaderItem key={thName as string}>{thName}</TableHeaderItem>
              ))}
          </tr>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </TableBlock>
    </TableScroll>
  );
}

export default Table;
