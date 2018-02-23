// ??? SubMenu中的link必须填写全路径
// ??? 否则在三层路由时 替换路由错误

const menu = [{
  label: '概览',
  icon: 'fa-article',
  color: '#3273dc',
  expanded: false,
  link: '/h/overview'
}, {
  label: 'DEMO(示例)',
  icon: 'fa-demo',
  color: '#76EEC6',
  expanded: false,
  subMenu: [
    {
      label: 'DEMO数据',
      link: '/h/demo'
    }
  ]
}, {
  label: '表格(示例)',
  icon: 'fa-table',
  color: '#8470FF',
  expanded: false,
  subMenu: [
    {
      label: '基础用法',
      link: '/h/table/base'
    },
    {
      label: '数据来自云端',
      link: '/h/table/fetch'
    },
    {
      label: '分页',
      link: '/h/table/page'
    },
    {
      label: '操作',
      link: '/h/table/action'
    },
    {
      label: '操作-删除',
      link: '/h/table/action-del'
    },
    {
      label: '多选',
      link: '/h/table/multiselect'
    },
    {
      label: '批量刪除',
      link: '/h/table/batch-del'
    },
    {
      label: '排序',
      link: '/h/table/sort'
    },
    {
      label: '单元格-文本框',
      link: '/h/table/td-text'
    },
    {
      label: '单元格-进度条',
      link: '/h/table/td-progress'
    },
    {
      label: '单元格-开关',
      link: '/h/table/td-checkbox'
    },
    {
      label: '单元格-JSX',
      link: '/h/table/td-jsx'
    },
    {
      label: '单元格-自定义',
      link: '/h/table/td-custom'
    },
    {
      label: '单元格-数据转换',
      link: '/h/table/td-pfun'
    },
    {
      label: '单元格-其他',
      link: '/h/table/other'
    }
  ]
}, {
  label: '表单(示例)',
  icon: 'fa-form',
  color: '#EE7600',
  expanded: false,
  subMenu: [
    {
      label: '基础用法',
      link: '/h/form/base'
    },
    {
      label: '编辑态',
      link: '/h/form/edit'
    },
    {
      label: '输入框',
      link: '/h/form/textfield'
    },
    {
      label: '文本域',
      link: '/h/form/textarea'
    },
    {
      label: '富文本',
      link: '/h/form/richtext'
    },
    {
      label: '下拉选择',
      link: '/h/form/dropdown'
    },
    {
      label: '下拉多选',
      link: '/h/form/multiselect'
    },
    {
      label: '分页多选',
      link: '/h/form/remotemultiselect'
    },
    {
      label: '复选框',
      link: '/h/form/checkbox'
    },
    {
      label: '单选框',
      link: '/h/form/radio'
    },
    {
      label: '时间选择',
      link: '/h/form/simple-datepicker'
    },
    {
      label: '时间范围选择',
      link: '/h/form/range-datepicker'
    },
    {
      label: '图片上传',
      link: '/h/form/img-uploader'
    },
    {
      label: '多图片上传',
      link: '/h/form/multi-img-uploader'
    },
    {
      label: '缩略图',
      link: '/h/form/thumbnail'
    },
    {
      label: '添加数组数据',
      link: '/h/form/modalformitem'
    },
    {
      label: '表单嵌套',
      link: '/h/form/subform'
    },
    {
      label: '自定义表单组件',
      link: '/h/form/custom'
    },
    {
      label: '校验规则',
      link: '/h/form/rules'
    }
  ]
}, {
  label: '搜索表单(示例)',
  icon: 'fa-search',
  color: '#FF0000',
  expanded: false,
  subMenu: [
    {
      label: '基础用法',
      link: '/h/search/base'
    },
    {
      label: '搜索表单',
      link: '/h/search/form'
    },
    {
      label: '配合表格',
      link: '/h/search/table'
    },
    {
      label: '输入框',
      link: '/h/search/textfield'
    },
    {
      label: '下拉选择',
      link: '/h/search/dropdown'
    },
    {
      label: '时间范围选择',
      link: '/h/search/range-datepicker'
    },
    {
      label: '自定义组件',
      link: '/h/search/custom'
    },
    {
      label: '其他',
      link: '/h/search/other'
    }
  ]
}]

export default {
  menu
}
