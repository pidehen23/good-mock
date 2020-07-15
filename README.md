# good-mock
[![npm version](https://img.shields.io/npm/v/good-mock.svg)](https://www.npmjs.com/package/@forchange/aui)

> 简单好用的 数据 Mock 插件

## 安装

在项目根目录下安装

```bash
$ yarn add good-mock -D
```

## 使用

在项目跟目录下新建文件夹 mock,在新建 data 目录和一个执行脚本文件 index.js（文件随意命名）
data (可多级目录和多个 js 文件)中 `.js` 中文件格式如下：
其中 `mock/data`中参数是用于设置数据 mock 接口，以 k-v 的方式进行设置，接口的 HTTP 方法通过在 key 中进行指定，支持的 HTTP 方法有：`['GET', 'POST', 'HEAD', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH']`

### 步骤一

`./mock/data/api.js` 或 `// mock/data/user/api.js`

```javascript
module.exports = {
	'GET /api/info/1': {
		name: 'xxx'
	},

	'POST     /api/info': {
		file: 'xxxx'
	}
};
```

### 步骤二

`./mock/index.js` 脚本文件

```js
const goodMock = require('good-mock')

const config = {
  host: 'localhost', // host，默认 127.0.0.1
  port: 1234, // 端口，默认 1234
  https: false，// 是否是 https 默认为 false
}

const server = new goodMock.Mock(config)

void server.start()

```

### 步骤三
shell中执行

```bash
node ./mock/index.js
```

也可以在 package.json 中添加脚本执行

```
 "scripts": {
   "mock": "node ./mock/index.js"
 }
```
end ```npm run mock ```

### 参数

`mock/index.js` 中可以接受如下参数：

| 参数项 | 类型    | 是否可选 | 用途                                     |
| :----- | :------ | :------- | :--------------------------------------- |
| host   | string  | 是       | 设置数据 mock 服务地址，默认为 127.0.0.1 |
| port   | number  | 是       | 设置数据 mock 服务端口，默认为 1234      |
| https  | boolean | 是       | 是否是 https                             |


