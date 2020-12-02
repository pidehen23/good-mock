import path from "path";
import glob from "glob";
import fs from "fs";
const chalk = require("chalk");
import { Key, pathToRegexp } from "path-to-regexp";

export const MOCK_DIR = "mock/data";
export const enum METHODS {
	GET = "GET",
	POST = "POST",
	HEAD = "HEAD",
	PUT = "PUT",
	DELETE = "DELETE",
	CONNECT = "CONNECT",
	OPTIONS = "OPTIONS",
	TRACE = "TRACE",
	PATCH = "PATCH"
}

export const HTTP_METHODS = [
	METHODS.GET,
	METHODS.POST,
	METHODS.HEAD,
	METHODS.PUT,
	METHODS.DELETE,
	METHODS.CONNECT,
	METHODS.OPTIONS,
	METHODS.TRACE,
	METHODS.PATCH
];

export interface IApiInfo {
	method: string;
	apiPath: string;
	responseTime?: number;
	reg: RegExp;
	keys?: Key[];
	result: { [key: string]: any };
}

export function getMockConfigs({ appPath, mocks }: { appPath: string; mocks?: { [key: string]: any } }) {
	const mockDir = path.join(appPath, MOCK_DIR);
	let mockConfigs = {};
	if (fs.existsSync(mockDir)) {
		const mockFiles = glob.sync("**/*.[tj]s", {
			cwd: mockDir
		});

		if (mockFiles.length) {
			const absMockFiles = mockFiles.map((file) => path.join(mockDir, file));

			absMockFiles.forEach((absFile) => {
				try {
					const file = require(`${absFile}`);
					mockConfigs = Object.assign({}, mockConfigs, file);
				} catch (error) {
					console.error(error);
				}
			});
		}
	}
	if (mocks) {
		mockConfigs = Object.assign({}, mockConfigs, mocks);
	}

	return mockConfigs;
}

export function parseMockApis(mockConfigs: { [x: string]: any }) {
	const apiList: IApiInfo[] = [];
	Object.keys(mockConfigs).map((key) => {
		const result = mockConfigs[key];
		let method = METHODS.GET;
		let apiPath = "";
		let responseTime = 500; // 数据返回时间毫秒，默认为500
		const keyList = key.split(/\s+/g);
		if (keyList.length >= 2) {
			method = (keyList[0] as METHODS) || method;
			apiPath = keyList[1];
			responseTime = Number(keyList[2]);
			if (!HTTP_METHODS.includes(method)) {
				throw `配置的 HTTP 方法名 ${method} 不正确，应该是 ${HTTP_METHODS.toString()} 中的一员！`;
			}
		} else if (keyList.length <= 1) {
			apiPath = keyList[0] ?? "";
		}
		const keys: Key[] = [];
		const reg = pathToRegexp(apiPath, keys);
		apiList.push({
			method,
			apiPath,
			responseTime,
			reg,
			keys,
			result
		});
		console.log(chalk.cyan(`Generating api ${method} ${apiPath}`));
	});
	return apiList;
}

export function getMockApis() {
	const mockConfigs = getMockConfigs({ appPath: process.cwd() });
	return parseMockApis(mockConfigs);
}
