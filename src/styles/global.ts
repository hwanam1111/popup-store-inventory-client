import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    font-size: 16px;
    font-family: -apple-system, "Apple SD Gothic Neo", "Pretendard Variable", Pretendard, Roboto, "Noto Sans KR", "Segoe UI", "Malgun Gothic", "Apple Color Emoji", sans-serif;
    font-weight: 400;
    color: #242C34;
    min-width: 1280px;
  }

  a {
    cursor: pointer;
  }

  button {
    cursor: pointer;
  }
`;
