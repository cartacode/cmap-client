var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  entry: [
    './client/index.js',
    './client/styles/main.scss',
    ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist')
  },

  context: __dirname,

  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', "stage-2"]
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader","sass-loader"],
          fallback: "style-loader",
        })
      },
      {
        test: /\.css$/,
        loaders: ["style-loader","css-loader"]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.COSMIC_BUCKET': JSON.stringify(process.env.COSMIC_BUCKET),
      'process.env.COSMIC_READ_KEY': JSON.stringify(process.env.COSMIC_READ_KEY),
      'process.env.COSMIC_WRITE_KEY': JSON.stringify(process.env.COSMIC_WRITE_KEY)
    }),
    new LiveReloadPlugin({appendScriptTag: true}),
    new ExtractTextPlugin("bundle.css"),

  ]
};