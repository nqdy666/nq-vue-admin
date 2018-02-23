const prefix = 'value'

export default [
  {
    path: '',
    redirect: { name: `${prefix}-list` }
  },
  {
    path: `${prefix}/list`,
    name: `${prefix}-list`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/value/list.vue')
  },
  {
    path: `${prefix}/add`,
    name: `${prefix}-add`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/value/add.vue')
  },
  {
    path: `${prefix}/edit/:id`,
    name: `${prefix}-edit`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/value/edit.vue')
  }
]
