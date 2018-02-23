import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import createVuexStore from './create-vuex-store'
import createVueRouter from './create-vue-router'

export default props => {
  // create context
  return Object.assign(new Vue({}), props, { Vue })
}

export function createStore (context) {
  const { modules, plugins } = context

  // create store and router
  const store = createVuexStore(modules, plugins)

  // make store readonly
  Object.defineProperty(context, 'store', {
    __proto__: null,
    // enumerable: true,
    get () {
      return store
    },
    set () {
      console.error('[PLATO] `context.store` is READONLY!')
    }
  })

  return store
}

export function createRouter (context) {
  const { store, routes } = context
  const router = createVueRouter(routes)

  // keep store and router in sync
  if (store) {
    sync(store, router)
  }

  // make router readonly
  Object.defineProperty(context, 'router', {
    __proto__: null,
    // enumerable: true,
    get () {
      return router
    },
    set () {
      console.error('[PLATO] `context.router` is READONLY!')
    }
  })

  return router
}
