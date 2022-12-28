import Login from '@components/login';
import { I18N_AUTH_LOGIN } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import RootLayout from '@ui/root-layout';

export default function LoginPage() {
  const { i18n } = useI18n(I18N_AUTH_LOGIN);

  return (
    <RootLayout metaTitle={i18n('meta-title')} isLoginPage>
      <Login />
    </RootLayout>
  );
}
