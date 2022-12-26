const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = withBundleAnalyzer({
  env: {
    FRONTEND_SERVER_URL: process.env.FRONTEND_SERVER_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    BACKEND_SERVER_URL: process.env.BACKEND_SERVER_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_COOKIE_NAME: process.env.JWT_COOKIE_NAME,
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
    KAKAO_CLIENT_SECRENT: process.env.KAKAO_CLIENT_SECRENT,
    NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
    NAVER_CLIENT_SECRENT: process.env.NAVER_CLIENT_SECRENT,
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
