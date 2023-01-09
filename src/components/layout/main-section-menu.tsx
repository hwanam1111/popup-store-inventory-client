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
  padding: 0 1rem;
  gap: 5rem;
`;

export default function LayoutMainSectionMenu() {
  const { i18n } = useI18n(I18N_COMMON);
  return (
    <Container>
      <MenuList>
        <LayoutMainSectionMenuItem
          menuName={i18n('layout.main-section-menu.dashboard')}
          menuSlug="dashboard"
          imageName="dashboard"
        />
        <LayoutMainSectionMenuItem
          menuName={i18n('layout.main-section-menu.scan-product')}
          menuSlug="product-forwarding"
          imageName="barcode-scan"
        />
        <LayoutMainSectionMenuItem
          menuName={i18n('layout.main-section-menu.create-product')}
          menuSlug="create-product"
          imageName="create-product"
        />
        <LayoutMainSectionMenuItem
          menuName={i18n('layout.main-section-menu.products-list')}
          menuSlug="products-list"
          imageName="product-list"
        />
        <LayoutMainSectionMenuItem
          menuName={i18n('layout.main-section-menu.forwarded-products-history')}
          menuSlug="forwarded-products-history"
          imageName="inventory"
        />
        <LayoutMainSectionMenuItem
          menuName={i18n('layout.main-section-menu.revenue')}
          menuSlug="revenue"
          imageName="revenue"
        />
        <LayoutMainSectionMenuItem
          menuName={i18n('layout.main-section-menu.data-output')}
          menuSlug="data-output"
          imageName="download"
        />
      </MenuList>
    </Container>
  );
}
