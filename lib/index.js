#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const goodMock = require("good-mock");

// 默认配置
const defaultConfig = {
	host: "0.0.0.0",
	port: 1234,
	https: false,
	resTime: 600
};

let config = defaultConfig;

try {
	if (fs.existsSync("./mock/config.ts")) {
		config = require(path.resolve(process.cwd(), "./mock/config.ts"));
	}
	if (fs.existsSync("./mock/config.js")) {
		config = require(path.resolve(process.cwd(), "./mock/config.js"));
	}
} catch (error) {
	console.error(error);
}

const server = new goodMock.Mock(config);
server.start();
