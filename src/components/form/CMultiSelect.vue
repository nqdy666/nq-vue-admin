<!--
详细见：https://github.com/monterail/vue-multiselect
-->
<template>
  <multiselect
    :value="value"
    @input="updateSelected"
    :show-labels="true"
    :allow-empty="true"
    select-label="回车可选择"
    selected-label="选择"
    deselect-label="回车可删除"
    :searchable="true"
    :multiple="extra.multiple === undefined ? true : extra.multiple"
    :options="extra.options || []"
    :track-by="extra.key"
    :label="extra.label || ''"
    :custom-label="mCustomLabel"
    :max="extra.max || 0"
    :placeholder="attrs.placeholder || '请选择'">
    <span slot="noResult">哎呀，没有找到对应数据，换一个查询关键字重试一下</span>
    <span slot="maxElements">最多选择{{extra.max}}个选项，首先删除选定的选项以选择另一个选项。</span>
  </multiselect>
</template>

<script>
import mField from './mField'
import Multiselect from 'vue-multiselect'

export default {
  mixins: [mField],
  props: {
    // 覆盖mixins的初始化value，multiselect初始值需要是一个数组
    initValue: {
      default () {
        if (this.extra && this.extra.default) {
          return this.extra.default
        }
        return []
      }
    }
  },
  computed: {
    mCustomLabel () {
      return this.extra.customLabel || (data => data[this.extra.label])
    }
  },
  methods: {
    // 覆盖mixins中的获取默认值，multiselect初始值需要是一个数组
    getDefaultVal () {
      return []
    },
    updateSelected (newSelect) {
      this.value = newSelect
    }
  },
  components: {
    Multiselect
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
