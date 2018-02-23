import Vue from 'vue'
import vueTable from './vueTable'
import TText from './TText'
import TProgress from './TProgress'
import TCheckbox from './TCheckbox'

function install () {
  Vue.component('vue-table', vueTable)
  Vue.component('t-text', TText)
  Vue.component('t-progress', TProgress)
  Vue.component('t-checkbox', TCheckbox)
}

export default {
  install
}
