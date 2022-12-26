module.exports = {
  locales: ['ko', 'en-US'],
  defaultLocale: 'ko',
  pages: {
    '/': ['home'],
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./src/locales/${locale}/${namespace}`).then((m) => m.default),
};
