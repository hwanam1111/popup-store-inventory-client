import styled from 'styled-components';

import CreateOrEditProductForm from '@components/create-or-edit-product/form';

const Container = styled.div`
  margin: 3rem auto 0 auto;
  width: 700px;
`;

export default function CreateOrEditProduct() {
  return (
    <Container>
      <CreateOrEditProductForm />
    </Container>
  );
}
