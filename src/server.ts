import express from "express";
import getPort from "get-port";
import path from "path";
import { getMockApis, HTTP_METHODS, METHODS } from "./utils";

const app = express();

interface IServerOptions {
	https?: boolean; // 是否http请求
	port?: number; // 端口
	host?: string; // host地址
	resTime?: number; // 全局的数据返回时间，单位毫秒，默认为500（具体的 apis 也可以设置并且优先级更高）
	middlewares?: express.RequestHandler<any>[]; // 中间件
}

export default class Mock {
	private isHttps = false;
	private port = 1234;
	private host = "127.0.0.1";
	private resTime = 500;

	constructor(options: IServerOptions) {
		this.isHttps = options.https ?? this.isHttps;
		this.port = options.port ?? this.port;
		this.host = options.host ?? this.host;
		this.resTime = options.resTime ?? this.resTime;
		this.setMiddlewares(options.middlewares);
		this.onCreateServer();
	}

	setMiddlewares(middlewares?: express.RequestHandler<any>[]) {
		if (middlewares && middlewares.length) {
			middlewares.forEach((middleware) => {
				app.use(middleware);
			});
		}
	}

	onCreateServer() {
		const protocol = this.isHttps ? "https://" : "http://";
		app.use(express.static(path.join(__dirname, "./")));
		app.use((req, _res, next) => {
			console.log(require("chalk").default.green(`请求地址URL: ${protocol}${this.host}:${this.port}${req.url}`));
			next();
		});

		app.all("*", function (req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
			res.header("Access-Control-Allow-Methods", HTTP_METHODS.join());

			if (req.method == "OPTIONS") {
				res.send(200);
			} else {
				next();
			}
		});
		getMockApis().map((item) => {
			const { method, apiPath, result, responseTime } = item;
			switch (method) {
				case METHODS.GET:
					app.get(apiPath, (_req, res) => {
						setTimeout(() => {
							res.json(result);
						}, responseTime ?? this.resTime);
					});
					break;
				case METHODS.POST:
					app.post(apiPath, (_req, res) => {
						setTimeout(() => {
							res.json(result);
						}, responseTime ?? this.resTime);
					});
					break;
				case METHODS.HEAD:
					app.head(apiPath, (_req, res) => {
						setTimeout(() => {
							res.json(result);
						}, responseTime ?? this.resTime);
					});
					break;
				case METHODS.PUT:
					app.put(apiPath, (_req, res) => {
						setTimeout(() => {
							res.json(result);
						}, responseTime ?? this.resTime);
					});
					break;
				case METHODS.DELETE:
					app.delete(apiPath, (_req, res) => {
						setTimeout(() => {
							res.json(result);
						}, responseTime ?? this.resTime);
					});
					break;
				case METHODS.CONNECT:
					app.connect(apiPath, (_req, res) => {
						setTimeout(() => {
							res.json(result);
						}, responseTime ?? this.resTime);
					});
					break;
				case METHODS.OPTIONS:
					app.options(apiPath, (_req, res) => {
						setTimeout(() => {
							res.json(result);
						}, responseTime ?? this.resTime);
					});
					break;
				case METHODS.TRACE:
					app.trace(apiPath, (_req, res) => {
						setTimeout(() => {
							res.json(result);
						}, responseTime ?? this.resTime);
					});
					break;
				case METHODS.PATCH:
					app.patch(apiPath, (_req, res) => {
						setTimeout(() => {
							res.json(result);
						}, responseTime ?? this.resTime);
					});
					break;
				default:
					app.get(apiPath, (_req, res) => {
						setTimeout(() => {
							res.json(result);
						}, responseTime ?? this.resTime);
					});
			}
		});
	}

	async start() {
		const port = await getPort({ port: this.port });
		const protocol = this.isHttps ? "https://" : "http://";
		app.listen(port, this.host, () => {
			console.log(require("chalk").default.green(`\n数据 mock 服务已启动，Server 地址: ${protocol}${this.host}:${port}`));
		});
	}
}
