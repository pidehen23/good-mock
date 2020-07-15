import express from "express";
import getPort from "get-port";
import path from "path";
import { getMockApis, HTTP_METHODS, METHODS } from "./utils";

const app = express();

interface IServerOptions {
  https?: boolean
  port?: number
  host?: string
  middlewares?: express.RequestHandler<any>[]
}

export default class Mock {
  private isHttps = false
  private port = 3000
  private host = "127.0.0.1"

  constructor(options: IServerOptions) {
    this.isHttps = options.https || this.isHttps;
    this.port = options.port || this.port;
    this.host = options.host || this.host;
    this.setMiddlewares(options.middlewares);
    this.onCreateServer();
  }

  setMiddlewares(middlewares?: express.RequestHandler<any>[]) {
    if (middlewares && middlewares.length) {
      middlewares.forEach(middleware => {
        app.use(middleware);
      });
    }
  }

  onCreateServer() {
    app.use(express.static(path.join(__dirname, "./")));
    app.use((req, _res, next) => {
      console.log("req.url:" + req.url);
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
    getMockApis().map(item => {
      switch (item.method) {
        case METHODS.GET:
          app.get(item.apiPath, (_req, res) => {
            setTimeout(() => {
              res.json(item.result);
            }, Math.random() * 500 + 500);
          });
          break;
        case METHODS.POST:
          app.post(item.apiPath, (_req, res) => {
            setTimeout(() => {
              res.json(item.result);
            }, Math.random() * 500 + 500);
          });
          break;
        case METHODS.HEAD:
          app.head(item.apiPath, (_req, res) => {
            setTimeout(() => {
              res.json(item.result);
            }, Math.random() * 500 + 500);
          });
          break;
        case METHODS.PUT:
          app.put(item.apiPath, (_req, res) => {
            setTimeout(() => {
              res.json(item.result);
            }, Math.random() * 500 + 500);
          });
          break;
        case METHODS.DELETE:
          app.delete(item.apiPath, (_req, res) => {
            setTimeout(() => {
              res.json(item.result);
            }, Math.random() * 500 + 500);
          });
          break;
        case METHODS.CONNECT:
          app.connect(item.apiPath, (_req, res) => {
            setTimeout(() => {
              res.json(item.result);
            }, Math.random() * 500 + 500);
          });
          break;
        case METHODS.OPTIONS:
          app.options(item.apiPath, (_req, res) => {
            setTimeout(() => {
              res.json(item.result);
            }, Math.random() * 500 + 500);
          });
          break;
        case METHODS.TRACE:
          app.trace(item.apiPath, (_req, res) => {
            setTimeout(() => {
              res.json(item.result);
            }, Math.random() * 500 + 500);
          });
          break;
        case METHODS.PATCH:
          app.patch(item.apiPath, (_req, res) => {
            setTimeout(() => {
              res.json(item.result);
            }, Math.random() * 500 + 500);
          });
          break;
        default:
          app.get(item.apiPath, (_req, res) => {
            setTimeout(() => {
              res.json(item.result);
            }, Math.random() * 500 + 500);
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


