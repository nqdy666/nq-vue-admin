const prefix = 'table'

export default [
  {
    path: '',
    redirect: { name: `${prefix}-base` }
  },
  {
    path: `${prefix}/base`,
    name: `${prefix}-base`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/table/base.vue')
  },
  {
    path: `${prefix}/fetch`,
    name: `${prefix}-fetch`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/table/fetch.vue')
  },
  {
    path: `${prefix}/page`,
    name: `${prefix}-page`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/table/page.vue')
  },
  {
    path: `${prefix}/action`,
    name: `${prefix}-action`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/table/action.vue')
  },
  {
    path: `${prefix}/action-del`,
    name: `${prefix}-action-del`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/table/action-del.vue')
  },
  {
    path: `${prefix}/multiselect`,
    name: `${prefix}-multiselect`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/table/multiselect.vue')
  },
  {
    path: `${prefix}/batch-del`,
    name: `${prefix}-batch-del`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/table/batch-del.vue')
  },
  {
    path: `${prefix}/sort`,
    name: `${prefix}-sort`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/table/sort/index.vue')
  },
  {
    path: `${prefix}/td-text`,
    name: `${prefix}-td-text`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/table/td-text.vue')
  },
  {
    path: `${prefix}/td-progress`,
    name: `${prefix}-td-progress`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/table/td-progress.vue')
  },
  {
    path: `${prefix}/td-checkbox`,
    name: `${prefix}-td-checkbox`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/table/td-checkbox.vue')
  },
  {
    path: `${prefix}/td-jsx`,
    name: `${prefix}-td-jsx`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/table/td-jsx.vue')
  },
  {
    path: `${prefix}/td-custom`,
    name: `${prefix}-td-custom`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/table/td-custom.vue')
  },
  {
    path: `${prefix}/td-pfun`,
    name: `${prefix}-td-pfun`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/table/td-pfun.vue')
  },
  {
    path: `${prefix}/other`,
    name: `${prefix}-other`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/table/other.vue')
  }
]
