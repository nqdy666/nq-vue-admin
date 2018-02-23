<template>
  <div>
    <div>
      <a class="button is-info" @click="handleRelate">{{buttonLabel}}</a>
    </div>
    <div v-show="value.length">
      <vue-table ref="table"
        :id-key="newTableParams.idKey"
        :columns="newTableParams.columns"
        :item-actions="newTableParams.itemActions"
        :show-page="false"
        :datum="value"
        @action="action">
      </vue-table>
    </div>
    <modal :visible="showModal" :shadow-close="false" @close="showModal = false">
      <section class="modal-body-wrapper" slot="modal-body">
        <remote-multi-select
          :tag-label-key="tagLabelKey"
          :table-params="modalTableParams"
          :selected.sync="modalSelected"
          @update="multiSelectChange"
          ref="rmselect"></remote-multi-select>
        <div class="footer-wrapper box">
          <button class="button is-primary" @click="submit">确定</button>
          <button class="button is-link" @click="cancel">取消</button>
        </div>
      </section>
    </modal>
  </div>
</template>

<script>
  import { Modal } from 'components/modal'
  import RemoteMultiSelect from './RemoteMultiSelect'
  import layer from 'components/layer-ext'

  export default {
    data () {
      return {
        showModal: false,
        modalSelected: []
      }
    },
    computed: {
      newTableParams () {
        const val = this.tableParams
        const newValue = Object.assign({
          columns: []
        }, val)
        newValue.columns.push({ title: '操作', width: '150' })
        newValue.itemActions = [
          { name: 'del-item', label: '删除', class: 'button is-danger' }
        ]
        return newValue
      }
    },
    methods: {
      'action' (actionName, data, index) {
        switch (actionName) {
          case 'del-item':
            layer.confirm('您确定要删除么？', layerIndex => {
              const dataIndex = this.value.indexOf(data)
              this.value.splice(dataIndex, 1)
              // this.$emit('input', [...this.value].splice(dataIndex, 1))
              layer.close(layerIndex)
            })
            break
          default:
            break
        }
      },
      handleRelate () {
        this.modalSelected = [...this.value]
        this.showModal = true
        this.$refs.rmselect.reloadTableData()
      },
      multiSelectChange (data) {
        this.modalSelected = data
      },
      submit () {
        this.$emit('input', [...this.modalSelected])
        this.showModal = false
      },
      cancel () {
        this.modalSelected = [...this.value]
        this.showModal = false
      }
    },
    components: {
      RemoteMultiSelect,
      Modal
    },
    props: {
      buttonLabel: {
        type: String,
        default () {
          return '关联'
        }
      },
      tableParams: {
        type: Object,
        default () {
          return {}
        }
      },
      value: {
        type: Array,
        default () {
          return []
        }
      },
      modalTableParams: {
        type: Object,
        default () {
          return {}
        }
      },
      tagLabelKey: {
        type: String,
        required: false,
        default () {
          return ''
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .modal-body-wrapper {
    border-radius: 5px;
    box-shadow: 0 2px 3px rgba(17,17,17,.1), 0 0 0 1px rgba(17,17,17,.1);
    background-color: #fff;
  }
  .footer-wrapper {
    margin-top: 10px;
    text-align: center;
  }
</style>