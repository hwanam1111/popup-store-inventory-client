import styled from 'styled-components';

import LayoutNavigationMenuItem from '@components/layout/navigation-menu-item';

const Container = styled.nav`
  position: fixed;
  top: 70px;
  left: 0;
  width: 100px;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.BG30};
  border-right: 1px solid ${({ theme }) => theme.color.G20};
  padding: 2rem 1rem;
  z-index: 10;
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
        <LayoutNavigationMenuItem country="all" imageName="all" menuName="All Countries" />
        <LayoutNavigationMenuItem country="germany" imageName="germany" menuName="Germany" />
        <LayoutNavigationMenuItem country="belgium" imageName="belgium" menuName="Belgium" />
        <LayoutNavigationMenuItem country="spain" imageName="spain" menuName="Spain" />
        <LayoutNavigationMenuItem country="france" imageName="france" menuName="France" />
      </MenuList>
    </Container>
  );
}
