import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Item = styled.li``;

const MenuLink = styled.a`
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 0.875rem;

  &:hover > div {
    transition: background-color 0.2s;
    background-color: ${({ theme }) => theme.color.G30};
  }
`;

const ImageBlock = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.75rem;
  height: 3.75rem;
  background-color: ${({ active, theme }) => (active ? theme.color.G30 : theme.color.G0)};
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

const MenuName = styled.span<{ active: boolean }>`
  font-size: 0.725rem;
  font-weight: ${({ active }) => (active ? 900 : 600)};
  color: ${({ active, theme }) => (active ? theme.color.PP600 : theme.color.G80)};
`;

interface LayoutNavigationMenuItemProps {
  country: string;
  imageName: string;
  menuName: string;
}

export default function LayoutNavigationMenuItem({ country, imageName, menuName }: LayoutNavigationMenuItemProps) {
  const { query } = useRouter();
  const currentCountry = query.country as string;

  return (
    <Item>
      <Link href="/countries/[country]/dashboard" as={`/countries/${country}/dashboard`}>
        <MenuLink>
          <ImageBlock active={currentCountry === country}>
            <img src={`/images/${imageName}.png`} alt={menuName} />
          </ImageBlock>
          <MenuName active={currentCountry === country}>{menuName}</MenuName>
        </MenuLink>
      </Link>
    </Item>
  );
}
