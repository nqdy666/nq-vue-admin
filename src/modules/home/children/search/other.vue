<template>
  <div class="wrapper">
    <div class="box">
      <p class="title is-4">其他</p>
      <div>
        <p class="title is-5">属性</p>
        <vue-table
           id-key="id"
           :columns="propColumns"
           :datum="propDatum"
           :show-page="false">
        </vue-table>
      </div>
      <div>
        <p class="title is-5">方法</p>
        <vue-table ref="table"
           id-key="id"
           :columns="funColumns"
           :datum="funDatum"
           :show-page="false">
        </vue-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        propColumns: [
          { title: 'ID', width: '70', dataKey: 'id' },
          { title: '属性名称', width: '160', dataKey: 'name' },
          { title: '类型', width: '160', dataKey: 'type' },
          { title: '描述', width: '200', dataKey: 'desc' },
          { title: '默认值', width: '100', dataKey: 'defaultValue' }
        ],
        propDatum: [
          { id: '1', name: 'initData', desc: '初始化的值', type: 'Object', defaultValue: '{}' },
          { id: '2', name: 'cells', desc: '表单搜索组件列表', type: 'Array|Object', defaultValue: '[]' }
        ],
        funColumns: [
          { title: 'ID', width: '70', dataKey: 'id' },
          { title: '方法名称', width: '160', dataKey: 'name' },
          { title: '参数', width: '100', dataKey: 'params' },
          { title: '描述', width: '200', dataKey: 'desc' }
        ],
        funDatum: [
          { id: '1', name: 'reset', params: '无', desc: '重置初始状态' },
          { id: '2', name: 'defaultMutate', params: '无', desc: '默认的计算值方法' },
          { id: '3', name: 'mutate', params: '无', desc: '与defaultMutate效果一样' },
          { id: '4', name: 'mutateOne', params: '组件对应的key值，比如name', desc: '获取某个组件的值' }
        ]
      }
    }
  }
</script>
<style>
</style>
