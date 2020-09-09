#!/usr/bin/env node

const goodMock = require("good-mock");
const chokidar = require("chokidar");

const config = {
  host: "127.0.0.1",
  port: 1234,
  https: false,
};

// const server = new goodMock.Mock(config);

// server.start();

chokidar.watch(`${process.cwd()}/mock/data`, { persistent: true,}).on("all", (event, path) => {
  console.log(event, path);
  const server = new goodMock.Mock(config);
  server.start();
});