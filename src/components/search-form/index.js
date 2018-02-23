import TSearch from './TSearch'
import TSearchCell from './TSearchCell'
import TSearchForm from './TSearchForm'
import TSTextField from './TSTextField'

function install (Vue) {
  Vue.component('t-search', TSearch)
  Vue.component('t-search-cell', TSearchCell)
  Vue.component('t-search-form', TSearchForm)
  Vue.component('t-search-textfield', TSTextField)
}

export default {
  install
}
