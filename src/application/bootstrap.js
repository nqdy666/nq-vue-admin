import Vue from 'vue'
import { configure, use, run } from 'system'

import logger from 'modules/logger'
import user from 'modules/user'
import home from 'modules/home'
import Root from './views/root'

import mRouter from './router'

import DomPortal from 'vue-dom-portal'
import table from 'components/table'
import Validator from 'plugins/validate'
import form from 'components/form'
import searchForm from 'components/search-form'
import demo from 'components/demo'

Vue.use(DomPortal)
Vue.use(table)
Vue.use(Validator)
Vue.use(form)
Vue.use(searchForm)
Vue.use(demo)

/**
 * 全局配置
 */
configure({
  // 项目名称
  name: 'nq-vue-admin',
  // 项目版本号
  version: '1.0',
  // 系统自动将 component 挂载到 element
  element: '#app',
  component: Root
})

/**
 * 调试相关
 */
__DEV__ && use(logger)

use(home)
// user模块需要放在最后面
use(user)

/**
 * Run Modules
 */
run(({ router, store }, done) => {
  console.log('%c[nvadmin] %cLet\'s go!', 'font-weight: bold', 'color: green; font-weight: bold')
  mRouter(router, store)
  done()
})
