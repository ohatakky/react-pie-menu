const path = require('path');

module.exports = (baseConfig, env, defaultConfig) => ({
  ...defaultConfig,
  resolve: {
    ...defaultConfig.resolve,
    alias: {
      'react-pie-menu': path.resolve(__dirname, '../'),
    },
  },
  module: {
    ...defaultConfig.module,
    rules: [
      // Temp fix for issue: https://github.com/storybooks/storybook/issues/4066 and https://github.com/storybooks/storybook/issues/3346
      ...defaultConfig.module.rules.filter(rule => !(
        (rule.loader && rule.loader.includes(require.resolve('svg-url-loader')))
        || (rule.use && rule.use.length && rule.use.find(({ loader }) => loader === 'babel-loader'))
      )),
      {
        test: /\.svg/,
        loader: require.resolve('file-loader'),
        query: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.jsx?$/,
        include: path.resolve('./'),
        exclude: /(node_modules|dist)/,
        loader: 'babel-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'source-map-loader',
        enforce: 'pre',
      },
    ],
  },
});
