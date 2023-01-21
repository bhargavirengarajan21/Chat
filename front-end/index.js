const express = require("express");
var bodyParser = require('body-parser')
const { config } = require("./config");
const redis = require('./redis-store/redis');
const webpack = require("webpack");
const userApi = require("./api/userApi");
const chatApi = require("./api/chatApi");
const eventApi = require("./api/eventApi");
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require("./webpack.config");
const compiler = webpack(webpackConfig);
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);


app.use("/user",userApi);
app.use("/chat",chatApi);
app.use("/event",eventApi);
app.use((req,res,next) => {
  redis.startRedis();
  next();
});

console.log(config.port);
app.listen(config.port, () => {
  console.log("App started");
});