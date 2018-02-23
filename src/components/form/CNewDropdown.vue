<template>
  <multiselect
    :value="mValue"
    @input="updateSelected"
    :show-labels="true"
    :allow-empty="extra.allowEmpty || false"
    select-label="回车可选择"
    selected-label="选择"
    deselect-label=""
    :searchable="true"
    :multiple="false"
    :options="extra.options || []"
    track-by="value"
    label="label"
    :placeholder="attrs.placeholder || '请选择'">
    <span slot="noResult">哎呀，没有找到对应数据，换一个查询关键字重试一下</span>
  </multiselect>
</template>

<script>
import mField from './mField'
import Multiselect from 'vue-multiselect'

export default {
  mixins: [mField],
  data () {
    return {
      mValue: undefined
    }
  },
  attached () {
    if (this.extra && this.extra.options && this.extra.options.length > 0) {
      this.mValue = this.extra.options.filter(item => (item.value === this.initValue))[0]
    }
  },
  methods: {
    // 覆盖mixins中的获取默认值，下拉框第一个
    getDefaultVal () {
      if (this.extra && !this.extra.allowEmpty && this.extra.options && this.extra.options.length > 0) {
        return this.extra.options[0].value
      }
    },
    updateSelected (newSelect) {
      this.mValue = newSelect
      this.value = newSelect && newSelect.value
    }
  },
  watch: {
    value (val) {
      if (this.extra && this.extra.options && this.extra.options.length > 0) {
        this.mValue = this.extra.options.filter(item => (item.value === val))[0]
      }
    }
  },
  props: {
    // 覆盖mixins的初始化value，select比较特殊他需要一个默认值
    initValue: {
      default () {
        if (this.extra && !this.extra.allowEmpty && this.extra.options && this.extra.options.length > 0) {
          return this.extra.options[0].value
        }
      }
    }
  },
  components: {
    Multiselect
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
