interface IBaseMap {
  [key: string]: any
  prod: string
  stage: string
  test: string
  dev: string
  local: string
}

interface IConfig {
  default?: boolean
  baseURL?: string
  baseMap?: IBaseMap
}

export interface IServerMap {
  [key: string]: IConfig
}

export interface IApiMap {
  [key: string]: {
    server?: string
    url: string
    method?: 'get' | 'post' | 'put' | 'delete'
  }
}