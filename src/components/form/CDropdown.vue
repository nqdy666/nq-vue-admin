<template>
  <span class="select">
    <select
      :field="field"
      v-bind="attrs"
      v-model="value">
      <option v-for="option in mOptions" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </span>
</template>

<script>
import mField from './mField'
export default {
  mixins: [mField],
  computed: {
    mOptions () {
      return this.extra.options || []
    }
  },
  methods: {
    // 覆盖mixins中的获取默认值，下拉框第一个
    getDefaultVal () {
      if (this.extra && this.extra.options && this.extra.options.length > 0) {
        return this.extra.options[0].value
      }
    }
  },
  props: {
    // 覆盖mixins的初始化value，select比较特殊他需要一个默认值
    initValue: {
      default () {
        if (this.extra && this.extra.options && this.extra.options.length > 0) {
          return this.extra.options[0].value
        }
      }
    }
  }
}
</script>
