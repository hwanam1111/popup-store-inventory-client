import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Item = styled.li``;

const MenuLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover > div {
    transition: background-color 0.2s;
    background-color: ${({ theme }) => theme.color.G30};
  }

  &:hover > span {
    transition: color 0.2s;
    color: ${({ theme }) => theme.color.PP600};
  }
`;

const ImageBlock = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${({ active, theme }) => (active ? theme.color.G30 : theme.color.G0)};
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

const MenuName = styled.span<{ active: boolean }>`
  font-weight: ${({ active }) => (active ? 900 : 600)};
  color: ${({ active, theme }) => (active ? theme.color.PP600 : theme.color.G80)};
`;

interface LayoutMainSectionMenuItemProps {
  menuName: string;
  menuSlug: string;
  imageName: string;
}

export default function LayoutMainSectionMenuItem({ menuName, menuSlug, imageName }: LayoutMainSectionMenuItemProps) {
  const { asPath, query } = useRouter();
  const country = query.country as string;

  return (
    <Item>
      <Link href={`/countries/[country]/${menuSlug}`} as={`/countries/${country}/${menuSlug}`}>
        <MenuLink>
          <ImageBlock active={asPath.indexOf(menuSlug) !== -1}>
            <img src={`/images/${imageName}.png`} alt={menuName} />
          </ImageBlock>
          <MenuName active={asPath.indexOf(menuSlug) !== -1}>{menuName}</MenuName>
        </MenuLink>
      </Link>
    </Item>
  );
}
