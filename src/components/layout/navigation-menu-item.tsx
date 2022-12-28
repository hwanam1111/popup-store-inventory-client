import Link from 'next/link';
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

const ImageBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.75rem;
  height: 3.75rem;
  background-color: ${({ theme }) => theme.color.G0};
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

const MenuName = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.G80};
`;

interface LayoutNavigationMenuItemProps {
  imageName: string;
  menuName: string;
}

export default function LayoutNavigationMenuItem({ imageName, menuName }: LayoutNavigationMenuItemProps) {
  return (
    <Item>
      <Link href="">
        <MenuLink>
          <ImageBlock>
            <img src={`/images/${imageName}.png`} alt={menuName} />
          </ImageBlock>
          <MenuName>{menuName}</MenuName>
        </MenuLink>
      </Link>
    </Item>
  );
}
