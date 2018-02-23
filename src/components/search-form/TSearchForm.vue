<template>
  <div class="t-search-form">
    <t-search
      :init-data="initData"
      :cells="cells"
      ref="form">
      <div class="control is-pulled-right" slot="footer">
        <p class="control">
          <button class="button is-primary search" :class="{ 'is-disabled': isSubmitBtnDisabled }" @click="submit">搜索</button>
          <button class="button is-dark" @click="cancel">清空条件</button>
        </p>
      </div>
    </t-search>
  </div>
</template>

<script>
  import TSearch from './TSearch'
  import message from 'components/message'

  export default {
    data () {
      return {
        isSubmitBtnDisabled: false
      }
    },
    props: {
      initData: {
        type: Object,
        default () {
          return {}
        }
      },
      cells: {
        type: [Object, Array],
        default () {
          return []
        }
      }
    },
    mounted () {
      this.form = this.$refs.form
    },
    methods: {
      filterChange (data) {
        this.$emit('filterchange', data)
      },
      submit () {
        this.isSubmitBtnDisabled = true

        this.form.defaultMutate().then(data => {
          this.filterChange(data)
          this.isSubmitBtnDisabled = false
        }, err => {
          message.info({ message: err.message })
          this.isSubmitBtnDisabled = false
        })
        return false
      },
      cancel () {
        this.form.reset()
      }
    },
    components: {
      TSearch
    }
  }
</script>

<style>
  .t-search-form .control .datepickbox input {
    min-height: 40px;
  }
  .t-search-form .button {
    min-height: 40px;
  }
  .t-search-form .search {
    margin-left: 5px;
  }
  .t-search-form .control>input {
    min-height: 40px;
  }
</style>
