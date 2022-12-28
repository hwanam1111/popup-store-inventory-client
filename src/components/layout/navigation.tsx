import styled from 'styled-components';

import LayoutNavigationMenu from '@components/layout/navigation-menu';

const Container = styled.nav`
  position: fixed;
  top: 70px;
  left: 0;
  width: 100px;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.BG30};
  border-right: 1px solid ${({ theme }) => theme.color.G20};
  padding: 2rem 1rem;
`;

const MenuList = styled.ul`
  display: flex;
  flex-flow: column;
  justify-content: center;
  gap: 2rem;
`;

export default function LayoutNavigation() {
  return (
    <Container>
      <MenuList>
        <LayoutNavigationMenu imageName="dashboard" menuName="Dashboard" />
        <LayoutNavigationMenu imageName="germany" menuName="Germany" />
        <LayoutNavigationMenu imageName="belgium" menuName="Belgium" />
        <LayoutNavigationMenu imageName="spain" menuName="Spain" />
        <LayoutNavigationMenu imageName="france" menuName="France" />
      </MenuList>
    </Container>
  );
}
