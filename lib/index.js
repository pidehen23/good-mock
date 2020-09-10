#!/usr/bin / env node

const path = require("path");
const goodMock = require("good-mock");

// 默认配置
const defaultConfig = {
  host: "127.0.0.1",
  port: 1234,
  https: false,
};

let config = defaultConfig;

try {
  config = require(path.resolve(process.cwd(), "./mock/config.js"));
} catch (error) {
  console.error(error);
}

const server = new goodMock.Mock(config);
server.start();