<template>
  <div :class="className">
    <form @submit.prevent
      autocomplete="off" class="is-clearfix">
      <t-search-cell
        v-for="cell of cellList" :key="cell.field"
        :field="cell.field"
        :model="cell">
        <component
          :is="getTypePre(cell.type)"
          :field="cell.field"
          :init-value="initData[cell.field]"
          :attrs="cell.attrs"
          :extra="cell.extra"
          :validate="cell.validate"
          :cells="cell.cells"
          :class-name="cell.className"
          @change="handleChange"
          :ref="`${FORM_CELL_REF_PRE}${cell.field}`">
        </component>
      </t-search-cell>
      <slot name="footer"></slot>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue'

  const FORM_TYPE_PRE = 'c-' // 格式一致，目前先与form表单的组件公用
  const SEARCH_TYPE_PRE = 't-search-' //
  const FORM_CELL_REF_PRE = 'form-cell-'

  export default {
    data () {
      return {
        FORM_CELL_REF_PRE
      }
    },
    props: {
      className: {
        default () {
          return ''
        }
      },
      initData: {
        type: Object,
        default () {
          return {}
        }
      },
      cells: {
        type: [Object, Array],
        deep: true,
        default () {
          return []
        }
      }
    },
    computed: {
      // 转换成数组
      cellList () {
        if (Array.isArray(this.cells)) {
          return this.cells
        }
        const cellList = []
        for (const field of Object.keys(this.cells)) {
          cellList.push({
            ...this.cells[field],
            field
          })
        }
        return cellList
      }
    },
    methods: {
      getTypePre (type) {
        return Vue.component(SEARCH_TYPE_PRE + type) ? SEARCH_TYPE_PRE + type : FORM_TYPE_PRE + type
      },
      reset () {
        const keys = Object.keys(this.$refs).filter(item => item.startsWith(FORM_CELL_REF_PRE))
        for (const key of keys) {
          this.$refs[key][0].reset()
        }
      },
      mutate () {
        return this.defaultMutate()
      },
      mutateOne (key) {
        const name = FORM_CELL_REF_PRE + key
        if (this.$refs[name] && this.$refs[name].length > 0) {
          return Promise.resolve(this.$refs[name][0].mutate())
        }
      },
      // 默认的计算value
      defaultMutate (calPromiseValue = true) {
        const promiseArr = []
        const keys = this.cellList.map(item => item.field)
        for (const key of keys) {
          const value = this.$refs[FORM_CELL_REF_PRE + key][0].mutate()
          promiseArr.push(value)
        }
        const promise = Promise.all(promiseArr).then(res => {
          const data = {}
          for (let i = 0; i < res.length; i++) {
            const value = res[i]
            data[keys[i]] = (typeof (res[i]) === 'string') ? value.trim() : value
          }
          return Promise.resolve(data)
        }).catch(error => {
          return Promise.reject(error)
        })
        return promise
      },
      handleChange () {
        this.$emit('change')
      }
    },
    components: {
    }
  }
</script>
