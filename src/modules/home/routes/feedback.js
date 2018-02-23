const prefix = 'feedback'

export default [
  {
    path: '',
    redirect: { name: `${prefix}-uninstall-questionnaire` }
  },
  {
    path: 'uninstall-questionnaire',
    name: `${prefix}-uninstall-questionnaire`,
    meta: {
      auth: true
    },
    component: () => System.import('../children/feedback/uninstall-questionnaire/index.vue')
  }
]
