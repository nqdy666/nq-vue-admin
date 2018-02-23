<template>
  <div>
    <slot name="top"></slot>
    <a class="button is-danger" :disabled="isBatchDelButtonDisabled"
       v-if="multiselect && allowBatchDel" @click="handleBatchDel">批量删除</a>
    <table :class="'table ' + tableClass" >
      <thead>
      <tr>
        <th v-show="multiselect" width="20">
          <input :checked="allCheckedStatus" type="checkbox" name="all-select" @click="handleAllCheckboxClick($event)">
        </th>
        <th v-for="column in columns" :width="column.width"
            :style="{'min-width': column.minWidth ? column.minWidth + 'px': ''}">
          <span>{{ column.title }}</span>
          <span class="table-sort" v-if="column.sortable" >
              <i class="fa fa-sort-up" :class="{on: sortTypeMap[column.dataKey] === 'asc'}" @click="triggerSort(column, 'asc')"></i>
              <i class="fa fa-sort-down" :class="{on: sortTypeMap[column.dataKey] === 'desc'}" @click="triggerSort(column, 'desc')"></i>
          </span>
        </th>
      </tr>
      </thead>
      <tfoot>
      <tr>
      </tr>
      </tfoot>
      <tbody>
      <tr v-for="(item, index) in tableData.items">
        <td v-show="multiselect">
          <input type="checkbox" name="item-select" v-model="localSelectedList[index]">
        </td>
        <td v-for="column of columns">
          <template v-if="column.dataKey">
            <td-extend :row-index="index" :row-data="item" :idKey="idKey" :column="column" :async-data="column.pFun && async[item[idKey]]"></td-extend>
          </template>
          <template v-else>
            <template v-for="action in itemActions">
              <button type="button" :disabled="action.disableFun && actionDisableStatus[item[idKey]][action.name]" :class="['button', action.class, {'hidden': action.hideFun && actionHideStatus[item[idKey]][action.name]}]" @click="callAction(action.name, item, index)">
                {{ action.label }}
              </button>
            </template>
          </template>
        </td>
      </tr>
      </tbody>
    </table>
    <p v-show="tableData.items && !tableData.items.length" class="no-data-title">暂无数据</p>
    <div v-show="tableData.items && tableData.items.length" class="pagination-box" v-if="showPage">
      <pagination :pagination.sync="pagination" :callback="loadPaginationData"></pagination>
    </div>
  </div>
</template>
<script>
import pagination from './pagination'
import message from 'components/message'
import Vue from 'vue'
import layer from 'layer-dialog'
import TdExtend from './TdExtend'
import clonedeep from 'lodash/cloneDeep'

export default {
  data () {
    return {
      test: true,
      sortTypeMap: {},
      async: {},
      actionHideStatus: {},
      actionDisableStatus: {},
      tableData: { items: [] },
      pagination: {
        total: 0,
        size: this.initPageSize,
        page: 1
      },
      localSelectedList: [] // 当前页面checked状态
    }
  },
  computed: {
    // 当前页面选中的数据
    selectedList () {
      const arr = []
      for (let i = 0; i < this.localSelectedList.length; i++) {
        if (this.localSelectedList[i]) {
          arr.push(this.tableData.items[i])
        }
      }
      return arr
    },
    // 选择中状态
    allCheckedStatus () {
      if (this.localSelectedList.length === 0) {
        return false
      }
      for (const checked of this.localSelectedList) {
        if (!checked) {
          return false
        }
      }
      return true
    },
    // 批量删除按钮是否
    isBatchDelButtonDisabled () {
      return !this.selectedList.length
    },
    mDatum () {
      const val = this.datum || []
      if (Array.isArray(val)) {
        return {
          count: val.length,
          items: val
        }
      }
      return val
    }
  },
  created () {
    this.tableData = { items: [] }
    this.generateSortState() // 生成排序状态
    this.loadData()
  },
  activated () {
    this.loadData()
  },
  methods: {
    reloadData (selectedid) {
      this.loadData()
    },
    generateSortState () {
      // 生成排序状态
      this.columns.forEach((item, index) => {
        if (item.sortable) {
          Vue.set(this.sortTypeMap, item.dataKey, 'normal')
          if (item.initSort) {
            Vue.set(this.sortTypeMap, item.dataKey, item.initSort)
          }
        }
      })
    },
    asyncData (column, item, func, key, path) {
      const id = item[this.idKey]
      const _NP = column.pFun(item[column.dataKey], item)
      Vue.set(this.async, id, this.async[id] || {})
      if (_NP && _NP.then) {
        _NP.then(res => {
          Vue.set(this.async[id], column.dataKey, res)
        })
      } else {
        Vue.set(this.async[id], column.dataKey, _NP)
      }
    },
    hideAction (action, item) {
      const id = item[this.idKey]
      Vue.set(this.actionHideStatus, id, this.actionHideStatus[id] || {})
      Vue.set(this.actionHideStatus[id], action.name, true)
      const _NP = action.hideFun(item)
      if (_NP && _NP.then) {
        _NP.then(res => {
          Vue.set(this.actionHideStatus[id], action.name, res || false)
        })
      } else {
        Vue.set(this.actionHideStatus[id], action.name, _NP || false)
      }
    },
    disableAction (action, item) {
      const id = item[this.idKey]
      Vue.set(this.actionDisableStatus, id, this.actionDisableStatus[id] || {})
      Vue.set(this.actionDisableStatus[id], action.name, true)
      const _NP = action.disableFun(item)
      if (_NP && _NP.then) {
        _NP.then(res => {
          Vue.set(this.actionDisableStatus[id], action.name, res || false)
        })
      } else {
        Vue.set(this.actionDisableStatus[id], action.name, _NP || false)
      }
    },
    showPop (data) {
      layer.confirm(this.deleteLabel, index => {
        if (!this.isDeleling) {
          this.isDeleling = true
          this.deleteApi(data).then(() => {
            this.pagination.total--
            const { page, size, total } = this.pagination
            if ((page - 1) * size === total) {
              this.pagination.page--
            }
            this.loadData()
          }).catch(error => {
            message.info(error.message)
          }).finally(() => {
            layer.close(index)
            this.isDeleling = false
          })
        }
      })
    },
    triggerSort (column, type) {
      const isActive = this.sortTypeMap[column.dataKey] === type
      // 先重置
      for (const key of Object.keys(this.sortTypeMap)) {
        this.sortTypeMap[key] = 'normal'
      }
      if (isActive) {
        this.sortTypeMap[column.dataKey] = type === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortTypeMap[column.dataKey] = type
      }
      if (column.sortable !== 'remote') {
        const data = clonedeep(this.tableData)
        this.sortData(data.items, column, this.sortTypeMap[column.dataKey])
        this.initTableData(data)
      }
      this.$emit('sort-change', column, this.sortTypeMap[column.dataKey])
    },
    callAction (action, data, index) {
      if (action === 'del') {
        this.showPop(data)
      } else {
        this.$emit('action', action, data, index)
      }
    },
    loadData () {
      const { page, size } = this.pagination
      this.processData({
        $offset: 0 + size * (page - 1), // 偏移量, 选填，默认0
        $limit: size // 页大小， 选填，默认20
      })
    },
    // 初始化table数据
    initTableData (data) {
      this.tableData = data
      // ---处理回调函数，包含同步和异步
      this.tableData.items && this.tableData.items.forEach(item => {
        this.columns.forEach(column => {
          if (column.dataKey && column.pFun) {
            this.asyncData(column, item)
          }
        })
        this.itemActions.forEach(action => {
          if (typeof (action.hideFun) === 'function') {
            this.hideAction(action, item)
          }
          if (typeof (action.disableFun) === 'function') {
            this.disableAction(action, item)
          }
        })
      })
    },
    processData (_params) {
      // const np = this.fetchApi(_params)
      if (!this.datum) {
        const np = this.fetchApi(_params)
        np && np.then && np.then(data => {
          this.initTableData(data)

          this.pagination.total = data.count
          // 点击下一页，正确显示首页内容
          if (data.count <= _params.$limit && _params.$offset >= _params.$limit) {
            this.pagination.page = 1
            this.processData({
              $offset: 0, // 偏移量, 选填，默认0
              $limit: _params.$limit // 页大小， 选填，默认20
            })
          }
        }).catch(error => {
          message.info(error.message)
        })
      } else {
        this.initTableData(this.mDatum)
      }
    },
    clearAndRefresh () {
      // 重置排序
      for (const key of Object.keys(this.sortTypeMap)) {
        this.sortTypeMap[key] = 'normal'
      }
      this.pagination = {
        total: 0,
        size: this.initPageSize,
        page: 1
      }
      this.loadData()
    },
    loadPaginationData () {
      const { page, size } = this.pagination
      const _params = {
        $offset: 0 + size * (page - 1), // 偏移量, 选填，默认0
        $limit: size // 页大小， 选填，默认20
      }
      this.processData(_params)
    },
    handleAllCheckboxClick (event) {
      if (!event.target.checked) {
        this.localSelectedList = this.localSelectedList.map(() => false)
      } else {
        this.localSelectedList = this.localSelectedList.map(() => true)
      }
    },
    handleBatchDel () {
      if (this.isBatchDelButtonDisabled) {
        return
      }
      layer.confirm('确定要批量删除？', index => {
        if (!this.isDeleling) {
          this.isDeleling = true
          // 顺序执行删除promise
          const delPromiseArr = this.selectedList.map(data => this.deleteApi(data))
          var sequence = Promise.resolve(false)
          delPromiseArr.forEach(item => {
            sequence = sequence.then(data => {
              if (data) {
                this.pagination.total--
              }
              return item
            })
          })
          sequence.then(() => {
            this.pagination.total--
            const { page, size, total } = this.pagination
            if ((page - 1) * size === total) {
              this.pagination.page--
            }
          }).catch(error => {
            message.info(error.message)
          }).finally(() => {
            layer.close(index)
            this.isDeleling = false
            this.loadData()
          })
        } else {
          message.info('正在删除中，请耐心等候')
        }
      })
    },
    sortData (data, column, type) {
      const key = column.dataKey
      data.sort((a, b) => {
        if (column.sortMethod) {
          return column.sortMethod(a[key], b[key], type)
        } else {
          if (type === 'asc') {
            return a[key] > b[key] ? 1 : -1
          } else if (type === 'desc') {
            return a[key] < b[key] ? 1 : -1
          }
        }
      })
    }
  },
  watch: {
    mDatum (val) {
      this.initTableData(val)
    },
    'tableData.items' (val) {
      if (val) {
        this.localSelectedList = val.map(() => false)
      }
    },
    'selectedList' (val) {
      this.$emit('selectedupdate', val)
    }
  },
  props: {
    multiselect: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    allowBatchDel: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    idKey: {
      type: String,
      default () {
        return 'id'
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    datum: {
      type: [Object, Array]
    },
    itemActions: {
      type: Array,
      default () {
        return []
      }
    },
    fetchApi: {
      type: Function,
      required: false,
      default () {
        return Promise.resolve({})
      }
    },
    deleteApi: {
      type: Function
    },
    deleteLabel: {
      type: String,
      default () {
        return '确定要删除此条目吗'
      }
    },
    initPageSize: {
      type: [String, Number],
      default () {
        return 20
      }
    },
    showPage: {
      type: Boolean,
      default () {
        return true
      }
    },
    // searchApi: {
    //   type: Function
    // },
    tableClass: {
      type: String,
      default () {
        return ''
      }
    }
  },
  components: {
    TdExtend,
    pagination
  }
}
</script>

<style lang="less" scoped>
  .search-box {
    margin-bottom: 20px;
    // height: 32px;
    p {
      float: right;
    }
  }
  table {
    width: 100%;
  }
  table td {
    word-break: break-all;
    word-wrap: break-word;
  }
  table td button {
    margin-right: 5px;
  }
  table td button:last-child {
    margin-right: 0;
  }
  table .hidden {
    visibility: hidden;
  }
  .modal-background {
    background-color: rgba(255,255,255,.0)
  }
  .table-sort {
    display: inline-block;
    width: 22px;
    height: 13px;
    vertical-align: middle;
    position: relative;
    font-size: -45px;
    cursor: pointer;

    .fa-sort-up {
      display: block;
      height: 6px;
      line-height: 6px;
      overflow: hidden;
      position: absolute;
      color: #bbbec4;
      transition: color .2s ease-in-out;
      top: 0;
      font-size: 14px;
    }
    .fa-sort-down {
      display: block;
      height: 6px;
      line-height: 6px;
      overflow: hidden;
      position: absolute;
      color: #bbbec4;
      transition: color .2s ease-in-out;
      bottom: 0;
      font-size: 14px;
    }
    .fa-sort-up.on, .fa-sort-down.on {
     color: #2d8cf0;
    }
  }
  .no-data-title {
    color: #aeb1b5;
    text-align: center;
  }
</style>
