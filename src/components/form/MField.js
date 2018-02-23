import cloneDeep from 'lodash/cloneDeep'

export default {
  created () {
    // 是否刚刚被挂载，用来消除刚刚加载时所带来的不必要校验
    this.isJustMounted = true
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
    },
    validate: null
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
        this._validate(val && val.length > 0)
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
      // 重置标志，用来消除重置导致的不必要校验
      this.isResetFlag = true
      // 还原原始数据
      this.value = this.initValue
    },
    _validate (force, fromEntry = true) {
      this.$emit('change')
      // （不处于刚刚加载且不处于重置状态）或者已经挂载一段时间都需要校验
      if (force || (!this.isJustMounted && !this.isResetFlag)) {
        if (this.validate && this.$parentValidation && this.$validate) {
          this.$validate(fromEntry)
        }
      }
      // value数据发生改变，就代表不是刚刚挂载了
      this.isJustMounted = false
      // value数据发生改变，重置状态失效
      this.isResetFlag = false
    }
  }
}
