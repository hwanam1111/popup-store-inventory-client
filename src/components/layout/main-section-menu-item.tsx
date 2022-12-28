import Link from 'next/link';
import styled from 'styled-components';

const Item = styled.li``;

const MenuLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover > span {
    transition: color 0.2s;
    color: ${({ theme }) => theme.color.PB600};
  }
`;

const ImageBlock = styled.div<{ backgroundColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

interface LayoutMainSectionMenuItemProps {
  menuName: string;
  menuLink: string;
  imageName: string;
  imageBgColor: string;
}

const MenuName = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.color.G70};
`;

export default function LayoutMainSectionMenuItem({
  menuName,
  menuLink,
  imageName,
  imageBgColor,
}: LayoutMainSectionMenuItemProps) {
  return (
    <Item>
      <Link href={menuLink}>
        <MenuLink>
          <ImageBlock backgroundColor={imageBgColor}>
            <img src={`/images/${imageName}.png`} alt={menuName} />
          </ImageBlock>
          <MenuName>{menuName}</MenuName>
        </MenuLink>
      </Link>
    </Item>
  );
}
