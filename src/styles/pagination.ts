import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  .pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 2rem;
    gap: 0.25rem;

    li {
      width: 2.125rem;
      height: 2.125rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
    }

    li:first-child {
      display: none;
    }

    li:last-child {
      display: none;
    }
    
    li a {
      text-decoration: none;
      font-size: 1rem;
      color: ${({ theme }) => theme.color.G50};
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border-radius: 0.5rem;
      transition: 0.2s;
    }
    
    li.active a {
      color: ${({ theme }) => theme.color.G0};
      background-color: ${({ theme }) => theme.color.PP600};
    }

    li.active a:hover {
      background-color: ${({ theme }) => theme.color.PP600} !important;
      color: ${({ theme }) => theme.color.G0} !important;
    }
    
    li a:hover,
    li a.active {
      background-color: ${({ theme }) => theme.color.G20};
      color: ${({ theme }) => theme.color.PP500};
    }
    
    .page-selection {
      width: 48px;
      height: 30px;
      color: ${({ theme }) => theme.color.PP600};
    }
  }
`;
