const prefix = 'search'

export default [
  {
    path: '',
    redirect: { name: `${prefix}-base` }
  },
  {
    path: `${prefix}/base`,
    name: `${prefix}-base`,
    component: () => System.import('../children/search/base.vue')
  },
  {
    path: `${prefix}/form`,
    name: `${prefix}-form`,
    component: () => System.import('../children/search/form.vue')
  },
  {
    path: `${prefix}/table`,
    name: `${prefix}-table`,
    component: () => System.import('../children/search/table.vue')
  },
  {
    path: `${prefix}/textfield`,
    name: `${prefix}-textfield`,
    component: () => System.import('../children/search/textfield.vue')
  },
  {
    path: `${prefix}/dropdown`,
    name: `${prefix}-dropdown`,
    component: () => System.import('../children/search/dropdown.vue')
  },
  {
    path: `${prefix}/range-datepicker`,
    name: `${prefix}-range-datepicker`,
    component: () => System.import('../children/search/range-datepicker.vue')
  },
  {
    path: `${prefix}/custom`,
    name: `${prefix}-custom`,
    component: () => System.import('../children/search/custom.vue')
  },
  {
    path: `${prefix}/other`,
    name: `${prefix}-other`,
    component: () => System.import('../children/search/other.vue')
  }
]
