import path from "path";
import glob from "glob";
import fs from "fs";

export const MOCK_DIR = "mock"; // mock数据目录
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
      console.log(absMockFiles)
      // absMockFiles.forEach(absFile => {
      //   let mockConfig = {}
      //   try {
      //     delete require.cache[absFile]
      //   } catch (err) {
      //     throw err
      //   }
      //   mockConfigs = Object.assign({}, mockConfigs, mockConfig)
      // })
    }
  }
  // if (mocks) {
  //   mockConfigs = Object.assign({}, mockConfigs, mocks)
  // }
  // return mockConfigs
}
