const path = require("path");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { webpack, DefinePlugin } = require("webpack");

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "build"),
    publicPath: '/'
  },
  target: 'web',
  externalsPresets: { node: true },
  devtool: 'source-map',
  devServer: {
    host:"localhost",
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    open: "Chrome",
  },
  module: {
    // exclude node_modules
    rules: [
      {
        test: /\.(js|jsx)$/,         // <-- added `|jsx` here
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      { 
        test: /\.(png|jpg)$/,
        include: path.join(__dirname, 'src', 'images'),
        loader: 'url-loader'
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".mjs"], 
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      assert: false,
    },   // <-- added `.jsx` here
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: '/public/index.html',
      title: 'Eventica'
    }),
    new DefinePlugin(envKeys),
  ],
};