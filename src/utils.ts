import path from "path";
import glob from "glob";
import fs from "fs";
import { pathToRegexp } from "path-to-regexp";

export const MOCK_DIR = "mock";
export const HTTP_METHODS = ["GET", "POST", "HEAD", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"];


export function getMockConfigs({ appPath, mocks }: { appPath: string, mocks?: { [key: string]: any } }) {
  const mockDir = path.join(appPath, MOCK_DIR)
  let mockConfigs = {}
  if (fs.existsSync(mockDir)) {
    const mockFiles = glob.sync("**/*.[tj]s", {
      cwd: mockDir
    })

    if (mockFiles.length) {
      const absMockFiles = mockFiles.map(file => path.join(mockDir, file))

      absMockFiles.forEach(absFile => {
        try {
          const file = require(`../${absFile}`)
          mockConfigs = Object.assign({}, mockConfigs, file)
        } catch (error) {
          console.error(error)
        }
      })
    }
  }
  if (mocks) {
    mockConfigs = Object.assign({}, mockConfigs, mocks)
  }

  return mockConfigs
}

export function parseMockApis(mockConfigs: { [x: string]: any; }) {
  const apiList: any[] = []
  Object.keys(mockConfigs).map(key => {
    const result = mockConfigs[key]
    let method = "GET"
    let apiPath = ""
    const keySplit = key.split(/\s+/g)
    if (keySplit.length === 2) {
      method = keySplit[0] || method
      apiPath = keySplit[1]
      if (!HTTP_METHODS.includes(method)) {
        throw `配置的 HTTP 方法名 ${method} 不正确，应该是 ${HTTP_METHODS.toString()} 中的一员！`
      }
    } else if (keySplit.length === 1) {
      apiPath = keySplit[0]
    }
    const keys: import("path-to-regexp").Key[] | undefined = []
    const reg = pathToRegexp(apiPath, keys)
    apiList.push({
      apiPath,
      reg,
      keys,
      method,
      result
    })
  })
  console.log(apiList)
  return apiList
}

export function getMockApis() {
  const mockConfigs = getMockConfigs({ appPath: "./" })
  return parseMockApis(mockConfigs)
}