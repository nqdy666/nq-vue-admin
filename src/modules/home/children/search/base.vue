<template>
  <div class="wrapper">
    <demo title="基础用法" :vertical="true">
      <div slot="demo">
        <t-search
          :cells="cells"
          ref="form">
          <div class="control is-pulled-right" slot="footer">
            <p class="control">
              <button class="button is-primary search" :class="{ 'is-disabled': isSubmitBtnDisabled }" @click="submit">搜索</button>
              <button class="button is-dark" @click="cancel">清空条件</button>
            </p>
          </div>
        </t-search>
        <p>{{formRst}}</p>
      </div>
      <div slot="desc">
        <p>搜索表单的基础用法。搜索表单和表单很类似，相比表单只是少了校验的功能。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/search/base'
  import message from 'components/message'

  export default {
    data () {
      return {
        code,
        isSubmitBtnDisabled: false,
        formRst: ''
      }
    },
    mounted () {
      this.form = this.$refs.form
    },
    computed: {
      cells () {
        return {
          name: {
            label: '名称',
            type: 'textfield',
            attrs: {
              placeholder: '名称'
            }
          },
          enable: {
            label: '状态',
            type: 'dropdown',
            attrs: {
              placeholder: '请选择状态'
            },
            extra: {
              options: [
                { label: '全部', value: '' },
                { label: '启用', value: 1 },
                { label: '禁用', value: 2 }
              ]
            }
          },
          range_time: {
            label: '创建时间',
            type: 'rangedatepicker',
            attrs: {
              startPlaceholder: '有效开始时间',
              endPlaceholder: '有效结束时间'
            }
          }
        }
      }
    },
    methods: {
      submit () {
        this.isSubmitBtnDisabled = true
        this.form.defaultMutate().then(data => {
          this.formRst = JSON.stringify(data)
        }).catch(err => {
          message.info({ message: err.message })
        }).finally(() => {
          this.isSubmitBtnDisabled = false
        })
      },
      cancel () {
        this.form.reset()
      }
    },
    components: {
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
