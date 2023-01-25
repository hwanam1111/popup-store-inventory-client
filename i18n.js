module.exports = {
  locales: ['ko', 'en-US'],
  defaultLocale: 'ko',
  pages: {
    '*': ['common'],
    '/': ['home'],
    '/auth/login': ['login'],
    '/countries/[country]/dashboard': ['dashboard'],
    '/countries/[country]/create-product': ['create-product'],
    '/countries/[country]/products-list': ['products-list', 'edit-product-quantity'],
    '/countries/[country]/product-forwarding': ['product-forwarding'],
    '/countries/[country]/forwarded-products-history': ['forwarded-products-history'],
    '/countries/[country]/data-output': ['data-output'],
    '/countries/[country]/cancel-forwarding': ['cancel-forwarding'],
    '/countries/[country]/defective-damage-product': ['defective-damage-product'],
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./src/locales/${locale}/${namespace}`).then((m) => m.default),
};
