<template>
  <div class="wrapper">
    <demo title="分页多选" :vertical="true">
      <div slot="demo">
        <c-form
          :cells="cells"
          :init-data="initialData"
          ref="form">
          <p class="control" slot="footer">
            <button class="button is-primary" :class="{ 'is-disabled': isSubmitBtnDisabled }" @click.prevent="submit">提交</button>
          </p>
        </c-form>
        <p>{{formRst}}</p>
      </div>
      <div slot="desc">
        <p>分页多选。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/form/remotemultiselect'
  import message from 'components/message'
  import { sGetDataList } from 'apis/demo'

  export default {
    data () {
      return {
        code,
        isSubmitBtnDisabled: false,
        initialData: {},
        formRst: ''
      }
    },
    computed: {
      cells () {
        return {
          data_ids: {
            label: '相关数据',
            type: 'remotemultiselect',
            extra: {
              buttonLabel: '选择相关数据',
              tableParams: {
                idKey: 'id',
                columns: [
                  { title: 'ID', width: 90, dataKey: 'id' },
                  { title: '名称', width: 250, dataKey: 'value' }
                ]
              },
              modalTableParams: {
                idKey: 'id',
                pageSize: 10,
                columns: [
                  { title: 'ID', width: 90, dataKey: 'id' },
                  { title: '名称', width: 250, dataKey: 'value' }
                ],
                fetchApi: ({ $offset, $limit } = {}) => {
                  return sGetDataList({
                    $count: true,
                    $offset: $offset || 0,
                    $limit: $limit || 5
                  })
                },
                itemActions: []
              }
            },
            validate: {
              required: {
                message: '请选择'
              },
              maxlength: {
                rule: 6,
                message: '最多允许6项'
              }
            }
          }
        }
      }
    },
    methods: {
      submit () {
        this.isSubmitBtnDisabled = true
        let step = 'validate'
        this.$refs.form.validateAll().then(() => {
          step = 'getData'
          return this.$refs.form.defaultMutate()
        }).then(data => {
          this.formRst = JSON.stringify(data)
        }).catch(error => {
          if (step === 'validate') {
            message.info('校验不通过')
          } else if (step === 'getData') {
            message.info(error.message)
          }
        }).finally(() => {
          this.isSubmitBtnDisabled = false
        })
        return false
      }
    }
  }
</script>
<style>
</style>
