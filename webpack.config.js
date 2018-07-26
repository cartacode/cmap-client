/* eslint-disable import/unambiguous */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = function getWebpackConfig() {
  const isDev = (process.env.NODE_ENV === 'development');

  return {
    devServer: {
      compress: true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      port: 3001,
      stats: 'errors-only',
    },

    devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',

    entry: getEntry(isDev),

    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [
                    require('precss'),
                    require('autoprefixer'),
                  ];
                },
              },
            },
          ],
        },
        {
          test: /\.(eot|svg|ttf)(\?[a-z0-9]+)?$/,
          loader: 'file-loader',
        },
        {
          test: /\.(gif|jpg|png)$/,
          use: [
            {
              loader: 'url-loader',
              options: { limit: 8192 },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [
            { loader: 'babel-loader' },
            { loader: `preprocess-loader?${isDev ? '+DEVELOPMENT' : ''}` },
          ],
        },
        {
          test: /\.woff(2)?(\?[a-z0-9]+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        },
      ],
    },

    output: {
      filename: '[name].[hash].js',
      path: path.join(__dirname, 'public'),
      publicPath: '/',
    },

    plugins: getPlugins(isDev),

    resolve: {
      extensions: ['.js', '.json'],
      modules: [
        path.join(__dirname, 'client'),
        'node_modules',
      ],
    },

    target: 'web',
  };
};

function getEntry(isDev) {
  const middlewares = [
    'babel-polyfill',
  ];

  if (isDev) {
    middlewares.push(
      'react-hot-loader/patch'
    );
  }

  return {
    app: [...middlewares, './client/index'],
  };
}

function getPlugins(isDev) {
  const plugins = [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.join(__dirname, 'client/index.html'),
    }),
  ];

  if (isDev) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
  }

  return plugins;
}
