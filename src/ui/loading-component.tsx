import styled, { keyframes } from 'styled-components';

const LoadingWrapper = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

const loading = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingAnimation = styled.div<{ color?: string }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-name: ${loading};
  animation-iteration-count: infinite;

  & > div {
    display: block;
    position: absolute;
    width: 1rem;
    height: 1rem;
    border: 3px solid ${(props) => props.color || '#fff'};
    border-radius: 50%;
    animation: loading-animation 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${(props) => props.color || '#fff'} transparent transparent transparent;
  }

  & > div::nth-child(1) {
    animation-delay: -0.45s;
  }

  & > div::nth-child(2) {
    animation-delay: -0.3s;
  }

  & > div::nth-child(3) {
    animation-delay: -0.15s;
  }
`;

interface ComponentLoadingProps {
  color?: string;
}

function ComponentLoading({ color }: ComponentLoadingProps) {
  return (
    <LoadingWrapper>
      <LoadingAnimation color={color}>
        <div />
        <div />
        <div />
        <div />
      </LoadingAnimation>
    </LoadingWrapper>
  );
}

export default ComponentLoading;
