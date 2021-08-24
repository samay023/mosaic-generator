const config = {
  images: {
    domains: [''],
  },

  webpack5: true,
  poweredByHeader: false,
  reactStrictMode: true,

  experimental: { esmExternals: true },

  target: 'experimental-serverless-trace',

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('_http_common', 'bufferutil', 'utf-8-validate');
    }
    return config;
  },
};

module.exports = config;
