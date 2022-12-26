import { BodyScrollBlock } from '@styles/common';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  width: 100%;
  height: 100vh;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.6);
`;

const LoadingBlock = styled.div<{ color: 'black' | 'white' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 4.125rem;
  height: 4.125rem;
  border-radius: 1.25rem;
  background-color: ${({ theme, color }) => (color === 'black' ? '#2D2D2D' : theme.color.G0)};
`;

const Snippet = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: 0.5s;
`;

const Flashing = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: 0.5s;

  &::before,
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
  }

  &::before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #9880ff;
    color: #9880ff;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 0s;
  }

  &::after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #9880ff;
    color: #9880ff;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 1s;
  }

  @keyframes dotFlashing {
    0% {
      background-color: #9880ff;
    }
    50%,
    100% {
      background-color: #ebe6ff;
    }
  }
`;

interface LoadingProps {
  theme: 'white' | 'black';
}

export default function Loading({ theme }: LoadingProps) {
  return (
    <>
      <BodyScrollBlock />
      <LoadingContainer>
        <LoadingBlock color={theme}>
          <Snippet>
            <div className="stage">
              <Flashing />
            </div>
          </Snippet>
        </LoadingBlock>
      </LoadingContainer>
    </>
  );
}
