import styled from 'styled-components';

const Container = styled.div``;

const Title = styled.h1`
  color: ${({ theme }) => theme.color.G100};
  font-size: 1.5rem;
  font-weight: 600;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.color.G50};
  font-size: 0 9rem;
  margin-top: 1rem;
`;

interface CreateOrEditProductTitleProps {
  title: string;
  message: string;
}

export default function CreateOrEditProductTitle({ title, message }: CreateOrEditProductTitleProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Message>{message}</Message>
    </Container>
  );
}
