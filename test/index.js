/*
 * @Description: test
 * @Author: Chenjiajing
 * @Date: 2020-07-15 22:55:37
 * @LastEditors: Chenjiajing
 * @LastEditTime: 2020-09-09 12:00:20
 */
// TEST
const mock = require("../dist/index");
const config = {
  host: "localhost",
  port: 1234,
  https: false
};

const server = new mock.Mock(config);

server.start();