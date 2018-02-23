import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default routes => {
  return new Router({ routes, linkActiveClass: 'is-active' })
}
