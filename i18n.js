module.exports = {
  locales: ['ko', 'en-US'],
  defaultLocale: 'ko',
  pages: {
    '*': ['common'],
    '/': ['home'],
    '/auth/login': ['login'],
    '/countries/[country]/create-product': ['create-product'],
    '/countries/[country]/products-list': ['products-list'],
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./src/locales/${locale}/${namespace}`).then((m) => m.default),
};
