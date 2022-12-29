import styled from 'styled-components';

const Container = styled.div``;

const Title = styled.h1`
  color: ${({ theme }) => theme.color.G100};
  font-weight: 600;
  font-size: 1.35rem;
`;

interface MainSectionTitleProps {
  title: string;
}

export default function MainSectionTitle({ title }: MainSectionTitleProps) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}
