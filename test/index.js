// TEST
const mock = require("../dist/index");
// const mock = require("good-mock");

const config = {
  host: "localhost",
  port: 1234,
  https: false,
  resTime: 600
};

const server = new mock.Mock(config);

server.start();