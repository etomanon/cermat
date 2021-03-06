const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const PATH_BUILD = path.join(__dirname, '..', 'build');
const PATH_PUBLIC = path.join(__dirname, '..', 'public')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: path.resolve(__dirname, '..', 'src', 'index.tsx'),
  stats: isDev ? 'errors-warnings' : 'normal',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "@": path.resolve(__dirname, '..', 'src'),
      'react-dom': '@hot-loader/react-dom',
    }
  },
  output: {
    path: PATH_BUILD,
    filename: '[name].[contenthash].bundle.js'
  },
  devtool: isDev ? 'cheap-module-source-map' : undefined,
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-syntax-dynamic-import',
              'babel-plugin-styled-components',
              ...(isDev ? ['react-hot-loader/babel'] : [])
            ],
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          // disable type checker - we will use it in Fork TS Checker Webpack Plugin
          transpileOnly: isDev,
        }
      }
    ]
  },
  plugins: [
    // clean build folder
    new CleanWebpackPlugin(),
    // access process.env.NODE_ENV
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new HtmlWebpackPlugin({
      template: path.join(PATH_PUBLIC, 'index.html'),
      favicon: path.join(PATH_PUBLIC, 'icon.svg'),
    }),
    // extracts CSS into separate files.
    // It creates a CSS file per JS file which contains CSS.
    new MiniCssExtractPlugin(),
    ...(isDev ? [new ForkTsCheckerWebpackPlugin({
      async: true,
    }), new webpack.HotModuleReplacementPlugin()] : []),

  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  },
  devServer: {
    open: false,
    hot: true,
    port: 3000,
    historyApiFallback: true,
    static: PATH_BUILD,
    proxy: {
      '/api': 'http://localhost:3002'
    },
  },
  infrastructureLogging: {
    level: 'warn',
  },
}
