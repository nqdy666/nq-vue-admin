import Vue from 'vue'
import demo from './demo.vue'
import code from './code.vue'

function install () {
  Vue.component('demo', demo)
  Vue.component('d-code', code)
}

export default {
  install
}
