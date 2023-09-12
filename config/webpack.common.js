const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');
const devMode = process.argv[5] !== 'prod';

module.exports = {
  module: {
    rules: [
      //Allows use javascript
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, //don't test node_modules folder
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
        resolve: {
          extensions: ['.js', '.jsx'],
        },
      },
      //Allows use of CSS
      {
        test: /(\.css|\.scss)$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      //Allows use of images
      {
        test: /\.(png|jpg|jpeg|svg|gif|woff|woff2|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(txt|md)$/,
        loader: 'raw-loader',
      },
    ],
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    //Allows remove/clean the build folder
    new CleanWebpackPlugin(),
    //Allows update react components in real time
    new HotModuleReplacementPlugin(),
    // ESlint
    new ESLintPlugin(),
    //Allows to create an index.html in our build folder
    new HtmlWebpackPlugin({
      baseUrl: '/',
      title: 'React Login Animated',
      // template: path.resolve(__dirname, 'public/index.html'), //we put the file that we created in public folder
      // favicon: path.resolve(__dirname, 'public/favicon.ico'),
      template: './public/index.html', //we put the file that we created in public folder
      favicon: './public/favicon.ico',
      // inject: true,
    }),
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
    }),
    //This get all our css and put in a unique file
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src'),
    },
  },
};
