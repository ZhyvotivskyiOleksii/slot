const path = require('path');

module.exports = {
  mode: 'development',
  entry: './slot-machine-project/frontend/src/index.js',
  output: {
    path: path.resolve(__dirname, 'slot-machine-project/frontend/public'),
    filename: 'bundle.js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'slot-machine-project/frontend/public'),
    },
    compress: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  }
};
