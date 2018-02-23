export default {
  props: {
    idKey: {
      type: String,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    },
    rowData: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    asyncData: {
      type: Object,
      default () {
        return {}
      }
    },
    render: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    // 控制是否延迟异步数据，
    // 返回true:默认情况下异步数据没有返回先显示原来的数据；
    // 返回false:即使没有异步数据还没有计算完成也使用异步数据显示，异步数据默认值为undefined
    delayShowAsyncData () {
      return true
    },
    // 默认的异步数据，自定义的组件可以自定义覆盖该方法
    defaultAsyncData () {
    }
  },
  computed: {
    dataKey () {
      return this.column.dataKey
    },
    value () {
      let data = this.rowData[this.dataKey]
      if (((typeof this.asyncData[this.dataKey]) !== 'undefined') || (this.column.pFun && this.delayShowAsyncData())) {
        data = this.asyncData[this.dataKey] || this.defaultAsyncData()
      }
      return data
    }
  }
}
