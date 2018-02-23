<template>
  <div class="remote-multi-select-wrapper">
    <div class="selected-wrapper box">
      <span>已选：</span>
      <tag v-for="(item, index) of selected" :key="index":show-key="tagKey" :init-data="item" @del="delTag"></tag>
    </div>
    <div class="search-wrapper" v-if="newTableParams.search.cells">
      <t-search-form :cells="newTableParams.search.cells" @filterchange="filterChange"></t-search-form>
    </div>
    <div class="box">
      <vue-table ref="table"
        :id-key="newTableParams.idKey"
        :columns="newTableParams.columns"
        :item-actions="newTableParams.itemActions"
        :fetch-api="fetchApi"
        :init-page-size="newTableParams.pageSize">
      </vue-table>
    </div>
  </div>
</template>

<script>
  import tag from './tag'

  export default {
    data () {
      return {
        searchData: {}
      }
    },
    computed: {
      tagKey () {
        return this.tagLabelKey || this.newTableParams.idKey
      },
      newTableParams () {
        const val = this.tableParams
        const newValue = Object.assign({
          columns: [],
          itemActions: [],
          search: {}
        }, val)
        newValue.columns.push({ title: '选中状态', dataKey: 'select_status', actionName: 'select', render: { type: 'checkbox', action: this.checkboxAction } })
        return newValue
      }
    },
    methods: {
      checkboxAction (actionName, data, index, checked) {
        if (checked) {
          this.selected.push(data)
        } else {
          this.removeSelectedData(data)
        }
      },
      fetchApi (data) {
        const outFilterSearchData = this.newTableParams.search.outFilter
        if (typeof (outFilterSearchData) === 'function') {
          Object.assign(data, outFilterSearchData(this.searchData))
        }
        return this.newTableParams.fetchApi(data).then(res => {
          const idKey = this.newTableParams.idKey
          const idArr = this.selected.map(item => item[idKey])
          for (const item of res.items) {
            if (idArr.includes(item[idKey])) {
              item.select_status = 1
            } else {
              item.select_status = 0
            }
          }
          return res
        })
      },
      delTag (data) {
        this.removeSelectedData(data)
        this.$refs.table.loadData()
      },
      removeSelectedData (data) {
        const idKey = this.newTableParams.idKey
        for (let i = 0; i < this.selected.length; i++) {
          if (data[idKey] === this.selected[i][idKey]) {
            this.selected.splice(i, 1)
            break
          }
        }
      },
      reloadTableData () {
        this.$refs.table.clearAndRefresh()
      },
      filterChange (data) {
        this.searchData = data
        this.reloadTableData()
      }
    },
    watch: {
      selected (val) {
        this.$emit('update', val)
      }
    },
    props: {
      tableParams: {
        type: Object,
        default () {
          return {}
        }
      },
      selected: {
        type: Array,
        default () {
          return []
        }
      },
      tagLabelKey: {
        type: String,
        required: false,
        default () {
          return ''
        }
      }
    },
    components: {
      tag
    }
  }
</script>
<style lang="less" scoped>
  .remote-multi-select-wrapper {
    .selected-wrapper {
      margin-bottom: 10px;
    }
    .search-wrapper {
      display: flex;
      .button {
        margin-left: 5px;
      }
    }
  }
</style>