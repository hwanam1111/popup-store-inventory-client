import styled from 'styled-components';

import LayoutMainSectionMenuItem from '@components/layout/main-section-menu-item';
import useI18n from '@hooks/useI18n';
import { I18N_COMMON } from '@constants/i18n-namespace';

const Container = styled.nav`
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.G30};
`;

const MenuList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
`;

export default function LayoutMainSectionMenu() {
  const { i18n } = useI18n(I18N_COMMON);
  return (
    <Container>
      <MenuList>
        <LayoutMainSectionMenuItem
          menuName={i18n('layout.main-section-menu.dashboard')}
          menuLink=""
          imageBgColor="#c1ffdb69"
          imageName="dashboard"
        />
        <LayoutMainSectionMenuItem
          menuName={i18n('layout.main-section-menu.scan-product')}
          menuLink=""
          imageBgColor="#faffc56f"
          imageName="barcode-scan"
        />
        <LayoutMainSectionMenuItem
          menuName={i18n('layout.main-section-menu.create-product')}
          menuLink=""
          imageBgColor="#d0ffffa4"
          imageName="create-product"
        />
        <LayoutMainSectionMenuItem
          menuName={i18n('layout.main-section-menu.products-list')}
          menuLink=""
          imageBgColor="#d49e9e37"
          imageName="product-list"
        />
        <LayoutMainSectionMenuItem
          menuName={i18n('layout.main-section-menu.products-inventory-status')}
          menuLink=""
          imageBgColor="#82aae339"
          imageName="inventory"
        />
        <LayoutMainSectionMenuItem
          menuName={i18n('layout.main-section-menu.revenue')}
          menuLink=""
          imageBgColor="#c37aff3e"
          imageName="revenue"
        />
      </MenuList>
    </Container>
  );
}
