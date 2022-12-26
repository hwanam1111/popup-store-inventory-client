const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = withBundleAnalyzer({
  env: {
    FRONTEND_SERVER_URL: process.env.FRONTEND_SERVER_URL,
    BACKEND_SERVER_URL: process.env.BACKEND_SERVER_URL,
    JWT_COOKIE_NAME: process.env.JWT_COOKIE_NAME,
  },
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === 'prod';
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      plugins: [
        ...config.plugins,
      ],
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.svg$/,
            use: ["@svgr/webpack"]
          }
        ],
      },
    };
  },
});

module.exports = nextConfig;
