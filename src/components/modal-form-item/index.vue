<template>
  <div class="modal-form-wrapper">
    <div>
      <a class="button is-primary" @click="addNewItem">新增一项</a>
    </div>
    <div v-show="tableInitData && tableInitData.length">
      <vue-table ref="table"
        :columns="newTableParams.columns"
        :item-actions="newTableParams.itemActions"
        :show-page="false"
        :datum="tableInitData"
         @action="action">
      </vue-table>
    </div>
    <modal :visible="showModal" @close="showModal=false" :shadow-close="false">
      <section slot="modal-body">
        <div class="box">
          <c-form
            :cells="newFormParams.cells"
            :init-data="formInitData"
            ref="form">
            <p class="control" slot="footer">
              <button class="button is-primary" @click="submit">确定</button>
              <button class="button is-link" @click="cancel">取消</button>
            </p>
          </c-form>
        </div>
      </section>
    </modal>
  </div>
</template>


<script>
  import { Modal } from 'components/modal'
  import layer from 'components/layer-ext'
  import message from 'components/message'
  
  export default {
    data () {
      return {
        showModal: false,
        formInitData: {},
        editingId: '' // 记录正在编辑的ID，如果为空，说明正在新增
      }
    },
    mounted () {
      this.form = this.$refs.form
    },
    computed: {
      newTableParams () {
        const val = this.tableParams
        const newValue = Object.assign({
          columns: []
        }, val)
        newValue.columns.push({ title: '操作', width: '150' })
        newValue.itemActions = [
          { name: 'edit-item', label: '编辑', class: 'button is-info mr5' },
          { name: 'del-item', label: '删除', class: 'button is-danger' }
        ]
        return newValue
      },
      newFormParams () {
        const val = this.formParams
        const newValue = Object.assign({
          cells: {},
          inFilter: data => {
            return data
          },
          outFilter: data => {
            return data
          }
        }, val)
        return newValue
      }
    },
    methods: {
      action (actionName, data, index) {
        switch (actionName) {
          case 'edit-item':
            this.editingId = index
            this.formInitData = this.newFormParams.inFilter(data)
            this.form.reset()
            this.showModal = true
            break
          case 'del-item':
            layer.confirm('您确定要删除么？', layerIndex => {
              this.tableInitData.splice(index, 1)
              layer.close(layerIndex)
            })
            break
          default:
            break
        }
      },
      addNewItem () {
        this.editingId = ''
        this.formInitData = {}
        this.form.reset()
        setTimeout(() => {
          this.form.resetError()
          this.showModal = true
        }, 100)
      },
      closeModal () {
        this.showModal = false
      },
      cancel () {
        this.showModal = false
      },
      submit () {
        let step = 'validate'
        this.form.validateAll().then(() => {
          step = 'getValue'
          return this.form.defaultMutate()
        }).then(data => {
          step = 'add-item'
          this.updateTableData(this.newFormParams.outFilter(data))
          this.showModal = false
        }).catch(error => {
          if (step === 'validate') {
            message.info({ message: '校验不通过' })
          } else if (step === 'getValue') {
            message.info({ message: error.message })
          } else {
            message.info({ message: '添加失败：' + error.message })
          }
        }).finally(() => {
          this.isSubmitBtnDisabled = false
        })
      },
      updateTableData (data) {
        if (this.editingId !== '' && this.editingId !== undefined) {
          for (let i = 0; i < this.tableInitData.length; i++) {
            if (this.editingId === i) {
              this.tableInitData.splice(i, 1, data)
              break
            }
          }
        } else {
          this.tableInitData.push(data)
        }
        this.$emit('tabledatachange', this.tableInitData)
      }
    },
    components: {
      Modal
    },
    props: {
      tableParams: {
        type: Object,
        default () {
          return {}
        }
      },
      tableInitData: {
        type: Array,
        default () {
          return []
        }
      },
      formParams: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>
<style lang="less">
  .modal-form-wrapper {
    margin-top: 10px;
  }
  @media screen and (min-width: 769px) {
    .modal-card, .modal-content {
      width: 1054px;
    }
  }
</style>