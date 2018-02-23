<template>
  <div :class="className">
    <form @submit.prevent
      autocomplete="off">
      <slot name="header"></slot>
      <c-form-cell
        v-for="cell of cellList" :key="cell.field"
        :field="cell.field"
        :model="cell"
        :class="{'is-horizontal': horizontal}">
        <component
          :is="`${TYPE_PRE}${cell.type}`"
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
      </c-form-cell>
      <slot name="footer"></slot>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue'

  const TYPE_PRE = 'c-'
  const FORM_CELL_REF_PRE = 'form-cell-'

  export default {
    name: 'cform',
    data () {
      return {
        TYPE_PRE,
        FORM_CELL_REF_PRE
      }
    },
    props: {
      className: {
        default () {
          return ''
        }
      },
      horizontal: {
        default: false
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
    validator: {
      auto: false
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
      // 校验
      validateAll () {
        return this.$validate()
      },
      validateOne (key) {
        Vue.nextTick(() => {
          this.$validation.fields
            .filter(field => field === this)
            .forEach(field => field.$validate(true))
        })
      },
      reset () {
        this.$validation.errors = []
        const keys = Object.keys(this.$refs).filter(item => item.startsWith(FORM_CELL_REF_PRE))
        for (const key of keys) {
          this.$refs[key][0].reset()
        }
      },
      resetError () {
        this.$validation.errors = []
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
      // validate 参数用来控制是否区分校验台，默认为false，为false时：子表单存在图片时，校验子表单会触发获取图片会导致图片自动上传。
      defaultMutate ({ validate = false } = {}) {
        const promiseArr = []
        const keys = this.cellList.map(item => item.field)
        for (const key of keys) {
          const value = this.$refs[FORM_CELL_REF_PRE + key][0].mutate({ validate })
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
<style lang="less">
</style>
