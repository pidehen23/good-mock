import axios from "axios";

import { IServerMap, IApiMap } from './type'

class Apis {
  private serverMap: IServerMap;
  private apiMap: IApiMap;
  private instance: any;
  static reqMiddleware: any[];
  static resMiddleware: any[];
  static useReq: (...rest: any) => void;
  static useRes: (...rest: any) => void;

  constructor(serverMap: IServerMap, apiMap: IApiMap) {
    this.serverMap = serverMap;
    this.apiMap = apiMap;
    this.instance = {
      gRequest: axios.request,
    };

    if (this.validate) {
      this.format();
      this.middleware();
      this.combine();
      return this.instance;
    } else {
      console.error("apis: 参数不合法，请检查你的配置参数");
    }
  }

  get validate() {
    return true;
  }

  get base() {
    let base = "";

    for (const key of Object.keys(this.serverMap)) {
      if (!base) {
        base = key;
      }

      if (this.serverMap[key].default) {
        base = key;
      }
    }

    if (!base) {
      console.error("apis: 找不到默认服务器配置");
    }

    return base;
  }

  private format() {
    for (const key of Object.keys(this.apiMap)) {
      const item = this.apiMap[key];

      if (!item.server) {
        item.server = this.base;
      }

      this.apiMap[key] = Object.assign({}, this.serverMap[item.server], item);
    }
  }

  private middleware() {
    Apis.reqMiddleware.map(function (middleware: any) {
      axios.interceptors.request.use(...middleware);
    });

    Apis.resMiddleware.map(function (middleware: any) {
      axios.interceptors.response.use(...middleware);
    });
  }

  private restful(url: string, rest: { [x: string]: any; }) {
    const regex = /\:[^/]*/g;

    return url.replace(regex, (p) => {
      const key = p.slice(1);
      if (rest[key]) {
        return rest[key];
      }
      return p;
    });
  }

  private comboo(bf: { server?: string | undefined; url: any; method?: "get" | "post" | "put" | "delete"; },
    af: { rest: { [x: string]: any; }; url: string; }) {
    if (af.rest) {
      af.url = this.restful(bf.url, af.rest);
    }

    return Object.assign({}, bf, af);
  }

  private namespace(obj: { [x: string]: any; }, keys: string | any[], cb: (config: any) => Promise<import("axios").AxiosResponse<any>>) {
    const key = keys[0];

    if (keys.length === 1) {
      obj[key] = obj[key] || cb;
    } else {
      obj[key] = obj[key] || {};
      this.namespace(obj[key], keys.slice(1), cb);
    }
  }

  private combine() {
    for (const key of Object.keys(this.apiMap)) {
      const keys = key.replace(/^\//, "").split("/");
      this.namespace(this.instance, keys, (config) => {
        let result = this.apiMap[key];
        if (config) {
          result = this.comboo(this.apiMap[key], config);
        }
        return axios.request(result);
      });
    }
  }
}

Apis.reqMiddleware = [];
Apis.resMiddleware = [];

Apis.useReq = function () {
  Apis.reqMiddleware.push(arguments);
};
Apis.useRes = function () {
  Apis.resMiddleware.push(arguments);
};

export default Apis;
