import cloneDeep from 'lodash/cloneDeep'

export default {
  created () {
    // 如果value没有值，就使用默认值
    this.value = this.initValue
    if (!this.value) {
      this.value = this.getDefaultVal()
    }
  },
  activated () {
    this.reset()
  },
  data () {
    return {
      value: undefined
    }
  },
  props: {
    className: {
      type: String,
      default: ''
    },
    field: {
      type: String,
      default () {
        return ''
      }
    },
    attrs: {
      type: Object,
      default () {
        return {}
      }
    },
    initValue: {
    },
    extra: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    initValue (val) {
      // 拷贝一份，保持prop的Value不变，用来还原表单数据
      this.value = val && cloneDeep(val)
    },
    value (val, oldValue) {
      // val发生改变触发校验，val有值得情况下一定触发校验
      if (!(typeof val === 'object' &&
        typeof oldValue === 'object' &&
        JSON.stringify(val) === JSON.stringify(oldValue))) {
        this.$emit('change')
      }
    }
  },
  methods: {
    mutate () {
      return this.value
    },
    // 获取默认值
    getDefaultVal () {},
    // 重置
    reset () {
      // 还原原始数据
      this.value = this.initValue
    }
  }
}
