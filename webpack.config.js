const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './slot-machine-project/frontend/src/index.js',
  output: {
    path: path.resolve(__dirname, 'slot-machine-project/frontend/public'),
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'slot-machine-project/frontend/public'),
    },
    compress: true,
    port: 8086,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './slot-machine-project/frontend/public/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
