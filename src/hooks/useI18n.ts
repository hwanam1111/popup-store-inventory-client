import useTranslation from 'next-translate/useTranslation';

export default (namespace: string) => {
  const { t, lang } = useTranslation(namespace);

  return {
    i18n: t,
    lang,
  };
};
