const prefix = 'demo'

export default [
  {
    path: prefix,
    name: `${prefix}-list`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/demo/list.vue')
  },
  {
    path: `${prefix}/add`,
    name: `${prefix}-add`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/demo/add.vue')
  },
  {
    path: `${prefix}/edit/:id`,
    name: `${prefix}-edit`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/demo/edit.vue')
  }
]
