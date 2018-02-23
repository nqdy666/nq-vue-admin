import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export default (modules, plugins) => {
  return new Store({
    strict: process.env.NODE_ENV === 'development',
    plugins,
    modules
  })
}
