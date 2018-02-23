const prefix = 'overview'

export default [
  {
    path: prefix,
    name: prefix,
    meta: {
      auth: true
    },
    component: () => System.import('../children/overview/index.vue')
  }
]
