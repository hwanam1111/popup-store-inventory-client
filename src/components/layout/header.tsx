import { UserEntity } from '@apis/users/entities/user.entity';
import { I18N_COMMON } from '@constants/i18n-namespace';
import localesName from '@constants/locales-name';
import useI18n from '@hooks/useI18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';
import Cookies from 'universal-cookie';

const Container = styled.header`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.G0};
  border-bottom: 1px solid ${({ theme }) => theme.color.G20};
  padding: 0 1.25rem;
  width: 100%;
  height: 70px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.325rem;
  width: 250px;

  & > span {
    padding-top: 0.25rem;
    background: -webkit-linear-gradient(-70deg, #3d9ad8 0%, #b6d8ff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.875rem;
    font-weight: 900;
  }
`;

const HeaderContentBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  gap: 1rem;
`;

const ChangeLangBlock = styled.div`
  position: relative;
`;

const ChangeLangOpenButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  border: 1px solid #ccc;
  font-size: 0.75rem;
`;

const LangBlock = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  border-radius: 0.625rem;
  box-shadow: 0px 3px 6px #00000029;
  background-color: #fff;
  display: flex;
  flex-flow: column;
  gap: 1.25rem;
  padding: 1.25rem;
  z-index: 100;
`;

const ChangeLang = styled.a<{ active: boolean }>`
  display: block;
  width: 100%;
  color: ${(props) => (props.active ? '#1A7FCD' : '#222')};
  font-size: 0.75rem;
  min-width: 5rem;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  border: 1px solid #ccc;
  font-size: 0.75rem;
`;

const ProfileBlock = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-left: 1rem;
`;

const ProfileImageBlock = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.color.G20};
  background-color: ${({ theme }) => theme.color.G0};
  padding: 0.5rem;
`;

const ProfileTextBlock = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  gap: 0.25rem;
  margin-right: 0.5rem;
`;

const UserName = styled.div`
  color: ${({ theme }) => theme.color.G50};
  font-size: 0.875rem;
  font-weight: 800;
`;

const UserRole = styled.div`
  color: ${({ theme }) => theme.color.G80};
  font-size: 0.775rem;
  font-weight: 600;
`;

interface LayoutHeaderProps {
  me: UserEntity;
}

export default function LayoutHeader({ me }: LayoutHeaderProps) {
  const { i18n } = useI18n(I18N_COMMON);
  const cookies = new Cookies();
  const router = useRouter();

  const [langBlockOpend, setLangBlockOpend] = useState<boolean>(false);
  const onLangBlockOpend = useCallback(() => {
    setLangBlockOpend(true);
  }, []);
  const onLangBlockClosed = useCallback(() => {
    setLangBlockOpend(false);
  }, []);

  const onLogout = useCallback(() => {
    cookies.remove(process.env.JWT_COOKIE_NAME, { path: '/' });
    router.reload();
  }, []);

  // TODO: 프로필 셋팅

  return (
    <Container>
      <Logo>
        <img src="/images/symbol.png" alt="logo symbol" width={42} />
        <span>POPUP STORE</span>
      </Logo>
      <HeaderContentBlock>
        <OutsideClickHandler onOutsideClick={onLangBlockClosed}>
          <ChangeLangBlock>
            <ChangeLangOpenButton type="button" onClick={onLangBlockOpend}>
              {i18n('layout.current-lang')}
            </ChangeLangOpenButton>
            {langBlockOpend && (
              <LangBlock>
                {router.locales.map((lang) => (
                  <Link key={lang} href={router.query.page ? router.pathname : router.asPath} locale={lang}>
                    <ChangeLang active={lang === router.locale}>{localesName[lang]}</ChangeLang>
                  </Link>
                ))}
              </LangBlock>
            )}
          </ChangeLangBlock>
        </OutsideClickHandler>
        <LogoutButton type="button" onClick={onLogout}>
          {i18n('layout.logout')}
        </LogoutButton>
        <ProfileBlock>
          <ProfileTextBlock>
            <UserName>{me.name}</UserName>
            <UserRole>{me.role}</UserRole>
          </ProfileTextBlock>
          <ProfileImageBlock>
            <img src="/images/symbol.png" alt="profile" />
          </ProfileImageBlock>
        </ProfileBlock>
      </HeaderContentBlock>
    </Container>
  );
}