#!/usr/bin / env node

const path = require("path");
const goodMock = require("good-mock");
const chokidar = require("chokidar");

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

let isLockReConnect = false; // 加锁，防止重连多次触发

chokidar.watch(`${process.cwd()}/mock/data`, { persistent: true, }).on("all", (event, path) => {
  if (isLockReConnect) {
    return;
  }
  isLockReConnect = false;
  setTimeout(() => {
    if (event !== "addDir") {
      console.log(`文件更改类型为：${event} ,更改的路径为： ${path}`);
      server.onCreateServer();
      isLockReConnect = false;
    }
  }, 200);
});