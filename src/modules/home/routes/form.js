const prefix = 'form'

export default [
  {
    path: '',
    redirect: { name: `${prefix}-base` }
  },
  {
    path: `${prefix}/base`,
    name: `${prefix}-base`,
    component: () => System.import('../children/form/base.vue')
  },
  {
    path: `${prefix}/edit`,
    name: `${prefix}-edit`,
    component: () => System.import('../children/form/edit.vue')
  },
  {
    path: `${prefix}/textfield`,
    name: `${prefix}-textfield`,
    component: () => System.import('../children/form/textfield.vue')
  },
  {
    path: `${prefix}/richtext`,
    name: `${prefix}-richtext`,
    component: () => System.import('../children/form/richtext.vue')
  },
  {
    path: `${prefix}/textarea`,
    name: `${prefix}-textarea`,
    component: () => System.import('../children/form/textarea.vue')
  },
  {
    path: `${prefix}/dropdown`,
    name: `${prefix}-dropdown`,
    component: () => System.import('../children/form/dropdown.vue')
  },
  {
    path: `${prefix}/multiselect`,
    name: `${prefix}-multiselect`,
    component: () => System.import('../children/form/multiselect.vue')
  },
  {
    path: `${prefix}/checkbox`,
    name: `${prefix}-checkbox`,
    component: () => System.import('../children/form/checkbox.vue')
  },
  {
    path: `${prefix}/radio`,
    name: `${prefix}-radio`,
    component: () => System.import('../children/form/radio.vue')
  },
  {
    path: `${prefix}/simple-datepicker`,
    name: `${prefix}-simple-datepicker`,
    component: () => System.import('../children/form/simple-datepicker.vue')
  },
  {
    path: `${prefix}/range-datepicker`,
    name: `${prefix}-range-datepicker`,
    component: () => System.import('../children/form/range-datepicker.vue')
  },
  {
    path: `${prefix}/img-uploader`,
    name: `${prefix}-img-uploader`,
    component: () => System.import('../children/form/img-uploader.vue')
  },
  {
    path: `${prefix}/multi-img-uploader`,
    name: `${prefix}-multi-img-uploader`,
    component: () => System.import('../children/form/multi-img-uploader.vue')
  },
  {
    path: `${prefix}/thumbnail`,
    name: `${prefix}-thumbnail`,
    component: () => System.import('../children/form/thumbnail.vue')
  },
  {
    path: `${prefix}/modalformitem`,
    name: `${prefix}-modalformitem`,
    component: () => System.import('../children/form/modalformitem.vue')
  },
  {
    path: `${prefix}/remotemultiselect`,
    name: `${prefix}-remotemultiselect`,
    component: () => System.import('../children/form/remotemultiselect.vue')
  },
  {
    path: `${prefix}/subform`,
    name: `${prefix}-subform`,
    component: () => System.import('../children/form/subform.vue')
  },
  {
    path: `${prefix}/custom`,
    name: `${prefix}-custom`,
    component: () => System.import('../children/form/custom.vue')
  },
  {
    path: `${prefix}/rules`,
    name: `${prefix}-rules`,
    component: () => System.import('../children/form/rules.vue')
  }
]
