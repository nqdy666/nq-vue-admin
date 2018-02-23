import Storage from 'nd-storage'
// 框架版本
const APP_CORE = '0.0.1'
// 本地模拟
const SIMULATION = 0
// 开发
const DEVELOPMENT = 1
// 测试
const DEBUG = 2
// 生产
const PRODUCTION = 4
// 预生产
const PREPRODUCTION = 8
// 压测
const PRESSURE = 16
// 集成环境
const INTEGRATION = 32
// 本地开发
const LOCDEVELOPMENT = 64

const LOC_PROTOCOL = location.protocol + '//'
const LOC_HOST = location.host
// host === hostname:port
const LOC_HOSTNAME = location.hostname

const ENV = (() => {
  switch (LOC_HOSTNAME) {
    case 'localhost':
    case '127.0.0.1':
    case '192.168.244.144':
    case '192.168.244.3':
    case '192.168.244.27':
    case '192.168.244.157':
      return DEVELOPMENT
    default:
      if (/\.dev\.web\.com/.test(LOC_HOSTNAME)) {
        return DEVELOPMENT
      }
      if (/\.debug\.web\.com/.test(LOC_HOSTNAME)) {
        return DEBUG
      }
      if (/\.pro\.com$/.test(LOC_HOSTNAME)) {
        return PREPRODUCTION
      }
      return PRODUCTION
  }
})()

const LOC_RES = {
  module: 'loc',
  protocol: LOC_PROTOCOL,
  host: LOC_HOST,
  ver: 'v0.1'
}

let ADMIN_RES = {
  module: 'uc',
  protocol: 'http://',
  ver: 'v0.93'
}

switch (ENV) {
  case LOCDEVELOPMENT:
  case DEVELOPMENT:
  case INTEGRATION:
  case DEBUG:
  case PREPRODUCTION:
    ADMIN_RES.host = 'example.dev.admin.com'
    break
  case PRODUCTION:
    ADMIN_RES.host = 'example.pro.admin.com'
    break
  default:
    ADMIN_RES = LOC_RES
}

const SessionStorage = new Storage('S-ADMIN-RES-', -1)
const LocalStorage = new Storage('L-ADMIN-RES-')

export default {
  APP_CORE,
  SIMULATION,
  LOCDEVELOPMENT,
  DEVELOPMENT,
  DEBUG,
  PRODUCTION,
  PREPRODUCTION,
  PRESSURE,
  ENV,
  LOC_RES,
  ADMIN_RES,
  SessionStorage,
  LocalStorage
}
