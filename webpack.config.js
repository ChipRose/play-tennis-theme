const path = require('path');

const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

function optimization() {
  let configObj = [];

  if (isProd) {
    configObj = [
      new TerserWebpackPlugin({
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
            ],
          },
        },
      }),
      new CssMinimizerPlugin(),
      new HtmlMinimizerPlugin(),
    ];
  }

  return configObj;
};

const plugins = () => {
  const basePlugins = [
    new MiniCssExtractPlugin({
      filename: 'css/style.min.css',
    }),
    new ImageminWebpWebpackPlugin(),
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'source/fonts'), to: 'fonts', noErrorOnMissing: true },
        { from: path.resolve(__dirname, 'source/json'), to: 'json', noErrorOnMissing: true },
        { from: path.resolve(__dirname, 'source/img'), to: 'img', noErrorOnMissing: true },
      ],
    }),
    new HTMLPlugin({
      template: path.resolve(__dirname, 'source/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new HTMLPlugin({
      template: path.resolve(__dirname, 'source/category.html'),
      filename: 'category.html',
      inject: 'body',
    }),
    new HTMLPlugin({
      template: path.resolve(__dirname, 'source/single.html'),
      filename: 'single.html',
      inject: 'body',
    }),
    new HTMLPlugin({
      template: path.resolve(__dirname, 'source/404.html'),
      filename: '404.html',
      inject: 'body',
    }),
  ];

  return basePlugins;
};

module.exports = {
  context: path.resolve(__dirname, 'source'),
  mode: 'development',

  entry: {
    main: './js/main.js',
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },

  devtool: isProd ? false : 'source-map',

  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    open: true,
    compress: true,
    port: 3000,
  },

  optimization: {
    minimize: isProd,
    minimizer: optimization(),
  },
  plugins: plugins(),

  module: {
    rules: [
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/i,
        exclude: path.resolve(__dirname, 'source/img/icons'),
        type: 'asset',
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'source/img/icons'),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: './img/sprite.svg',
            }
          },
        ],
      },
      {
        test: /\.js$/i,
        exclude: '/node_modules/',
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true, url: false } },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true, url: false } }
        ],
      },
    ],
  },
}